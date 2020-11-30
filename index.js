#!/usr/bin/env node
const inquirer = require("inquirer");
const questions = require("./lib/questions");

(async () => {
  try {
    const responses = await inquirer.prompt(questions);
    console.log(JSON.stringify(responses, null, 2));
  } catch (err) {
    console.log(err);
  }
})();
