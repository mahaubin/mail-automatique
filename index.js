const CronJob = require('cron').CronJob;
const mail = require('./mail');

const job = new CronJob({
  cronTime: '* * * * * *',
  onTick: mail.sent,
});

job.start();
