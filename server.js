'use strict';
const bodyparser = require('body-parser');

const express = require('express');
const config = require('./config');
const FBeamer = require('./fbeamer');

const musicxmatch = require('./musicxmatch')
const message_analyer = require('./message_analyzer')

const server = express();
const PORT = process.env.PORT || 3000;

const FB = new FBeamer(config.FB);











server.listen(PORT, () => console.log(`FBeamer Bot Service running on Port ${PORT}`));

server.get('/', (request, response) => FB.registerHook(request, response));
server.post('/', bodyparser.json({ verify: FB.verifySignature.call(FB) }));


server.post('/', (request, response) => {
  console.log('_________________________________________')
    console.log("POST request body entry messaging  : ")
    return FB.incoming(request, response, messaging => {
      if(messaging){
        //console.log("\nMessaging : \n", messaging)
        const userData = FB.messageHandler(messaging);
        


        if(messaging.message.nlp.entities){
          var all_entities_and_intent = message_analyer.extractAllEntities(messaging.message.nlp.entities);
          
          musicxmatch.mainGetter(all_entities_and_intent).then((result_data_musicxmatch) => FB.sendMessage("RESPONSE", userData.sender, result_data_musicxmatch)).catch((error) => console.log("Errrrrror man : ", error))
          

          
        }
        
      }
      
    });
  });