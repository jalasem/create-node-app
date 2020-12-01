const execa = require("execa");
const Listr = require("listr");
const inquirer = require("inquirer");

const { configs, questions } = require("./questions");

module.exports.runTasks = async () => {
  try {
    // prompt user to set configuration options
    const responses = await inquirer.prompt(questions);

    // merge defaultConfigurations with responses
    const configuration = {
      ...configs,
      ...responses,
    };
    console.log(JSON.stringify(configuration, null, 2));

    const { gitRepo, useGit } = configuration;

    // define task list
    let taskList = [
      {
        title: "Git (Cloning repo)",
        task: () =>
          execa("git", ["clone", gitRepo])
            .then((result) => {
              console.log({ stdout: result.stdout });
            })
            .catch((err) => {
              throw new Error(err.message);
            }),
      },
    ];

    // filter tasks
    taskList = taskList.filter((task) => {
      if (task.title === "Git (Cloning repo)" && (!useGit || !gitRepo.trim()))
        return false;

      return true;
    });

    // run tasks
    new Listr(taskList).run().catch((err) => {
      console.error(err);
    });
  } catch (err) {
    console.log(err);
  }
};
