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
    validate: (name) =>
      (name && name.trim() && typeof name === "string") ||
      "enter a valid project name 👆",
    default: defaults.projectName,
  },
  {
    name: "packageManager",
    message: "Preferred package manager",
    type: "list",
    choices: ["yarn", "npm"],
    default: defaults.packageManager,
    when: () => typeof useYarn === "undefined" && typeof useNpm === "undefined",
  },
  {
    name: "useGit",
    message: "Use git version control (recommended)?",
    type: "confirm",
    default: defaults.useGit,
  },
  {
    name: "gitRepo",
    message: "Git repo ssh link:",
    type: "input",
    // TODO: need help with repo link validation
    validate: (link) =>
      (link && typeof link === "string") || "Enter a valid git repo link 👆",
    when: ({ useGit }) => useGit,
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
if (useDefault)
  questions = questions.filter(
    (question) => question.name === "gitRepo" && useGit
  );

module.exports = { questions, configs: defaults };
