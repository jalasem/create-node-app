const defaults = require("./defaults");
const { useDefault, useYarn, useNpm, babel, eslint } = require("./parseArgs");

// edit defaults based on answers from yargs
if (useNpm) defaults.packageManager = "npm";
if (eslint) defaults.configSet.push("eslint");
if (babel) defaults.configSet.push("babel");

// set questions
let questions = [
  /* Pass your questions in here */
  {
    name: "projectName",
    type: "input",
    message: "Project name?",
    default: defaults.projectName,
  },
  {
    name: "packageManager",
    message: "Preferred package manager",
    type: "list",
    choices: ["yarn", "npm"],
    default: defaults.packageManager,
  },
  {
    name: "configSet",
    message: "Choose desired configuration sets",
    type: "checkbox",
    choices: ["eslint", "nodemon", "babel", "env"],
    default: defaults.configSet,
  },
];

if (useDefault) {
  questions = [];
} else {
  questions = questions.filter((question) => {
    if (question.name === "packageManager") {
      if (useYarn || useNpm) return false;
    }

    return true;
  });
}

module.exports = { questions, configs: defaults };
