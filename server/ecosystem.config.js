/**
 * @description pm2 configuration file.
 * @example
 *  production mode :: pm2 start ecosystem.config.js --only prod
 *  development mode :: pm2 start ecosystem.config.js --only dev
 */
module.exports = {
  apps: [
    {
      name: 'prod', // pm2 start App name
      script: 'dist/server.js',
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      output: './logs/access.log', // pm2 log file
      error: './logs/error.log', // pm2 error log file
      env: {
        // environment variable
        PORT: 8000,
        NODE_ENV: 'production',
      },
    },
    {
      name: 'dev', // pm2 start App name
      script: 'ts-node', // ts-node
      args: '-r tsconfig-paths/register --transpile-only src/server.ts', // ts-node args
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: './logs/access.log', // pm2 log file
      error: './logs/error.log', // pm2 error log file
      env: {
        // environment variable
        PORT: 8000,
        NODE_ENV: 'development',
      },
    },
  ],
};
