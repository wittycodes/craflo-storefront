// import chalk from 'chalk';

/* eslint-disable no-console */

const loggers = {
  info(msg) {
    console.log((`${msg}`));
  },
  success(msg) {
    console.log((`${msg}`));
  },
  warn(msg) {
    console.log((`${msg}`));
  },
  error(msg) {
    console.log((`${msg}`));
  },
  debug(msg) {
    if (process.env.REACTION_CLI_DEBUG === 'true') {
      console.log('[DEBUG]:', msg);
    }
  },
  args(args) {
    if (process.env.REACTION_CLI_DEBUG === 'true') {
      console.log('\n[Reaction CLI Debug]\n\n', args, '\n');
    }
  },
  default(msg) {
    console.log(msg);
  }
};

// extend chalk with custom log methods
export default loggers
