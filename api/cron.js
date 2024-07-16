const  {getdata} = require('./com/getdata.js');
const axios = require('axios');
require("dotenv").config();


async function sendMessageToFeishu(accessToken, message, chatId) {  
  try {  
      const response = await axios.post(  
          `https://open.feishu.cn/open-apis/message/v4/send/`,  
          {  
              chat_id: chatId,  
              msg_type: "text",  
              content: {  
                  text: message  
              }  
          },  
          {  
              headers: {  
                  'Authorization': `Bearer ${accessToken}`,  
                  'Content-Type': 'application/json'  
              }  
          }  
      );  
      console.log('Message sent successfully:', response.data);  
  } catch (error) {  
      console.error('Failed to send message:', error);  
  }  
}


async function getAccessToken(appId, appSecret) {  
  try {  
      // 注意：这里我们假设API实际上接受POST请求来获取access token  
      // 这在飞书开放平台的实际API中可能不是真的，但为了示例我们这样做  
      const response = await axios.post(  
          'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', // 注意：这个URL可能是虚构的，你需要替换为实际的URL  
          {  
              app_id: appId,  
              app_secret: appSecret  
              // 这里可能还需要其他字段，具体取决于API的要求  
          },  
          {  
              headers: {  
                  // 通常POST请求不需要特殊的Authorization头来获取access token  
                  // 但如果API要求某种形式的认证（比如Bearer token，尽管这在这里不适用），你需要在这里添加它  
                  'Content-Type': 'application/json; charset=utf-8' // 确保请求体是JSON格式  
              }  
          }  
      );  
        
      // 假设响应的数据结构中有一个tenant_access_token字段  
      console.log(response.data)
      console.log(appId+'__'+ appSecret)
      return response.data.tenant_access_token;  
  } catch (error) {  
     console.error('Failed to get access token:', error);  
      throw error; // 重新抛出错误以便上层处理  
  }  
}  

export default  async function handler(req, res) {
  const APP_ID=process.env.FEISHU_APP_ID
  const SECRET=process.env.FEISHU_SECRET
  const price=await getdata()
  const accessToken = await getAccessToken(APP_ID, SECRET);
  await sendMessageToFeishu(accessToken, price, 'oc_e9d0033ec6244ee7a42a8c833300741f');
    res.status(200).end('Hello Cron!');
  }
