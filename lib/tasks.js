const fs = require("fs");
const execa = require("execa");
const Listr = require("listr");
const inquirer = require("inquirer");
const chalk = require("chalk");
const { exec } = require("child_process");

const { configs, questions } = require("./questions");
const { createPackageJson } = require("./templates");

module.exports.runTasks = async () => {
  try {
    // prompt user to set configuration options
    const responses = await inquirer.prompt(questions);

    // merge defaultConfigurations with responses
    const configuration = {
      ...configs,
      ...responses,
    };
    // console.log(JSON.stringify(configuration, null, 2));

    // estract configurations needed to setup node app
    const { gitRepo, useGit, folderName, projectName } = configuration;

    const folderExists = fs.existsSync(folderName || projectName);

    if (folderExists) {
      console.error(
        chalk.yellowBright(
          `🚨 folder with same name (${
            folderName || projectName
          }) already exists`
        )
      );

      process.exit(1);
    }

    const projectDirectory =
      (folderName && folderName.toLowerCase()) ||
      (projectName && projectName.toLowerCase());

    // define task list
    let taskList = new Listr([
      {
        title: "Git (Cloning repo)",
        skip: () => !useGit || !(gitRepo && gitRepo.trim()),
        task: () =>
          execa("git", ["clone", gitRepo, projectDirectory])
            .then((result) => {
              console.log({ stdout: result.stdout });
            })
            .catch((err) => {
              throw new Error("Invalid link/Permission or Network error");
            }),
      },
      {
        title: "Initialize project",
        task: () => {
          if (useGit && gitRepo && gitRepo.trim()) {
            // enter created repo directory and run npm init
            return fs.writeFileSync(
              `${projectDirectory}/package.json`,
              createPackageJson({ projectName }),
              "utf-8"
            );
          } else {
            // create projectDirectory, cd and run npm init
            return new Listr([
              {
                title: "Create project directory",
                task: () => fs.mkdirSync(projectDirectory),
              },
              {
                title: "Create package.json",
                task: () =>
                  fs.writeFileSync(
                    `${projectDirectory}/package.json`,
                    createPackageJson({ projectName }),
                    "utf-8"
                  ),
              },
            ]);
          }
        },
      },
    ]);

    // run tasks
    taskList
      .run()
      .then(() => {
        console.info(chalk.cyanBright("✅  Done!"));
        console.info(chalk.cyanBright("Happy hacking 🚀🚀🚀"));
      })
      .catch((err) => {
        console.error(err.message);
      });
  } catch (err) {
    console.error(err);
  }
};
