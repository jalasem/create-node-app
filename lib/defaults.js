const cwd = process.cwd().split("/");

module.exports = {
  projectName: cwd[cwd.length - 1],
  packageManager: "yarn",
  configSet: ["nodemon", "env"],
};
