const fs = require("fs");
const execa = require("execa");
const Listr = require("listr");
const inquirer = require("inquirer");

const { configs, questions } = require("./questions");
const { exit } = require("process");

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
        `🚨 folder with same name (${folderName || projectName}) already exists`
      );

      exit(1);
    }

    // define task list
    let taskList = new Listr([
      {
        title: "Git (Cloning repo)",
        skip: () => !useGit || !(gitRepo && gitRepo.trim()),
        task: () =>
          execa("git", [
            "clone",
            gitRepo,
            (folderName && folderName.toLowerCase()) ||
              (projectName && projectName.toLowerCase()),
          ])
            .then((result) => {
              console.log({ stdout: result.stdout });
            })
            .catch((err) => {
              throw new Error("Invalid link/Permission or Network error");
            }),
      },
      {
        title: "Initialize node project",
        task: () => {
          if (useGit && gitRepo && gitRepo.trim()) {
            // run npm init in create folder from previous task (git clone)
          } else {
            // create a folder and run npm init
          }
        },
      },
    ]);

    // run tasks
    taskList.run().catch((err) => {
      console.error(err.message);
    });
  } catch (err) {
    console.error(err);
  }
};
