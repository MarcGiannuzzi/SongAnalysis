'use strict'
const crypto = require('crypto');
const axios = require('axios').default;

class FBeamer {
  constructor({ pageAccessToken, verifyToken, appSecret }) {
    try {
      if (pageAccessToken && verifyToken && appSecret) {
        this.pageAccessToken = pageAccessToken;
        this.verifyToken = verifyToken;
        this.appSecret = appSecret;
      }
      else {
        throw "One or more tokens/credentials are missing!";
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  registerHook(request, response) {
    const params = request.query;
    const mode = params['hub.mode'], token = params['hub.verify_token'], challenge = params['hub.challenge'];
    try {
      //console.log(request)
      if ((mode && this.verifyToken) && mode === 'subscribe' && token === this.verifyToken) {
        console.log("Webhook registered!");
        return response.send(challenge);
      }
      else {
        console.log("Could not register webhook!");
        return response.sendStatus(400);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  verifySignature(request, response, buffer) {
    return (request, response, buffer) => {
      if (request.method === 'POST') {
        try {
        //   console.log('Headers of request for verifying signature :')
        //   console.log("\n")
          //console.log(request.headers)
          const signature = request.headers['x-hub-signature'].substr(5);
          const hash = crypto.createHmac('sha1', this.appSecret).update(buffer, 'utf-8').digest('hex');
          if (signature !== hash)
            throw 'Error verifying x hub signature';
        }
        catch (error) {
          console.log(error);
        }
      }
    }
  }

  incoming(request, response, callback) {
    response.sendStatus(200);

    // Extract the body of the POST request
    if (request.body.object === 'page' && request.body.entry) {

      const body = request.body;
      const messageObj = body.entry[0];
      if (!messageObj.messaging){
        console.log("Error message\n\n\n\n");
      }
      else{
        return callback(messageObj.messaging[0]);
      } 
    }
  }

  messageHandler(messaging) {
    const sender = messaging.sender.id;
    var mess = ".";

    if(messaging.message){
       var message_text = messaging.message.text;
       console.log("MESSAGE RECEIVED : " + message_text)

    }
    else{
      console("MESSAGE NOT RECEIVED.")
    }
 
    const userData = {
      sender:sender,
      type: 'text',
      content: message_text
    }
    return userData;
  }

  sendMessage(msgType, id, text) {
    const payload = {
      "messaging_type": msgType,
      "recipient": {
        "id": id
      },
      "message": {
        "text": text
      }
    };
    console.log("Payload  : ", payload)
  
    return axios({
      method:'post',
      url:`https://graph.facebook.com/v6.0/me/messages?access_token=${this.pageAccessToken}`,
      data:payload,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  
}

module.exports = FBeamer;


// axios.post(`https://graph.facebook.com/v6.0/me/messages?access_token=${this.pageAccessToken}`,{
//           headers: { 'Content-Type': 'application/json' },
//           data: payload
//         }, (error, response, body) => {

//           if (!error && response.statusCode === 200) {
//             console.log("SENDING MESSAGE")
//             resolve({
//               messageId: body.message_id
//             });
//           } 
//           else {
//             console.log("ERROR WHEN SENDING MESSAGE")
//             reject(error);
//           }
//       });
//     }
  
// }











// }, (error, response, body) => {
//   if (!error && response.statusCode === 200) {
//     resolve({
//       messageId: body.message_id
//     });
//   } else {
//     reject(error);
//   }
// });
// });
// }
// }

// module.exports = FBeamer;

