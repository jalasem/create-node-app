const { Command } = require("commander");
const program = new Command();

program
  .option("-y, --yes", "Use default configuration (recommended)")
  .option("-yarn, --use-yarn", "Use yarn as default package manager")
  .option("-npm, --use-npm", "Use npm as default package manager")
  .option("-eslint, --eslint", "Setup eslint")
  .option("-babel, --babel", "Setup babel");

const { yes: useDefault, useYarn, useNpm, eslint, babel } = program.parse(
  process.argv
);

module.exports = { useDefault, useYarn, useNpm, eslint, babel };
