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
        console.log("\nMessaging : \n", messaging)
        const userData = FB.messageHandler(messaging);
        var axios_result = FB.sendMessage("RESPONSE", userData.sender, "Avoue c'est lourd :)");
        axios_result.then(res => console.log("Result axios : ", "Axios OK")).catch(error => console.log("Error axios:", error))


        if(messaging.message.nlp.entities){
          var all_entities_from_message = message_analyer.extractAllEntities(messaging.message.nlp.entities);
          console.log(all_entities_from_message)
          //message_analyer.displayAllEntities(all_entities_from_message)
          
  
  
          var artist = all_entities_from_message[0]['entity_value']
          var song = all_entities_from_message[1]['entity_value']
          musicxmatch.getLyrics(artist, song).then((data) => FB.sendMessage("RESPONSE", userData.sender, data)).then((d) => console.log("NEW AXIOS OK")).catch((err) => console.log(err.response))  
        }
        
      }
      //data.message.body.lyrics.lyrics_body)

      //console.log(typeof(data))).catch((error) => console.log(error))
    });
  });