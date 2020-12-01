const defaults = require("./defaults");
const {
  useDefault,
  useYarn,
  useGit,
  useNpm,
  babel,
  eslint,
  folderName,
} = require("./parseArgs");

// edit defaults based on answers from yargs
if (folderName) {
  defaults.folderName = folderName;
  defaults.projectName = folderName;
}
if (useNpm) defaults.packageManager = "npm";
if (useGit) defaults.useGit = true;
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
    name: "useGit",
    message: "Use git version control (recommended)?",
    type: "confirm",
    default: true,
  },
  {
    name: "gitRepo",
    message: "Git repo ssh link",
    type: "input",
  },
  {
    name: "configSet",
    message: "Choose desired configuration sets",
    type: "checkbox",
    choices: ["eslint", "nodemon", "babel", "env"],
    default: defaults.configSet,
  },
];

// filter out answered questions from yargs
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
