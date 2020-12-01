const cwd = process.cwd().split("/");

module.exports = [
  /* Pass your questions in here */
  {
    name: "projectName",
    type: "input",
    message: "Project name?",
    default: cwd[cwd.length - 1],
  },
  {
    name: "packageManager",
    message: "Preferred package manager",
    type: "list",
    choices: ["yarn", "npm"],
    default: "yarn",
  },
  {
    name: "configSet",
    message: "Choose desired configuration sets",
    type: "checkbox",
    choices: ["eslint", "nodemon", "babel", "env"],
    default: ["nodemon", "eslint", "babel", "env"],
  },
];
