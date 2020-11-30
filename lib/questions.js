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
    name: "name",
    message: "Who are you?",
    type: "input",
  },
];
