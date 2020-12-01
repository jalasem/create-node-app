#!/usr/bin/env node
const inquirer = require("inquirer");

const { configs, questions } = require("./lib/questions");

(async () => {
  try {
    const responses = await inquirer.prompt(questions);

    const configuration = {
      ...configs,
      ...responses,
    };

    console.log(JSON.stringify(configuration, null, 2));
  } catch (err) {
    console.log(err);
  }
})();
