const { App } = require('@slack/bolt');


const { getdata } = require('./com/getdata.js');

const newtest = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

async function testsend(newtext) {
  try {
    await newtest.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: "C05SNES7S93",
      text: newtext,
    });
   // console.log('send:' + newtext);
  } catch (error) {
    throw error;
  }
}

export default  async function handler(req, res) {
    const price=await getdata();
    const newcron=testsend(price)
    res.status(200).end('Hello Cron!');
  }