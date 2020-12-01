const { Command } = require("commander");
const program = new Command();

program
  .option("-y, --yes", "Use default configuration (recommended)")
  .option("-yarn, --use-yarn", "Use yarn as default package manager")
  .option("-git, --use-git", "Use git (recommended)")
  .option("-npm, --use-npm", "Use npm as default package manager")
  .option("-eslint, --eslint", "Setup eslint")
  .option("-babel, --babel", "Setup babel");

const {
  yes: useDefault,
  useYarn,
  useGit,
  useNpm,
  eslint,
  babel,
  args,
} = program.parse(process.argv);

module.exports = {
  useDefault,
  useYarn,
  useGit,
  useNpm,
  eslint,
  babel,
  folderName: args[0],
};
