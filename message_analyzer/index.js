const extractAllEntities = (entities) => {
    var result = [] 
    var keys_entities = Object.keys(entities)
    console.log(keys_entities)
    for(let i = 0; i < keys_entities.length; i++){
        entity = keys_entities[i]
        // console.log("Entity : ", entity)
        // console.log(entities[entity])
        if(entities[entity][0].confidence > 0.5){
            result.push({"entity_name": entity, "entity_value": entities[entity][0].value});
        }
    }
    return result
    
}



const displayAllEntities = function(entities){
    for(entity in all_entities_from_message){
        console.log(all_entities_from_message[entity])
      }
}

const extractEntity = (nlp, entity) => {
    var entities = nlp.entities;
    console.log("\nEntities of the message :\n")
    console.log(entities)
    if(entities[entity][0].confidence > 0.8){
        return entities[entity][0];
    }
    else{

        return  "Entity confidence not greather than 0.8.";
    }
}


const f = function(nlpData) {
    return new Promise((resolve, reject) => {
        let intent = extractEntity(nlpData, 'intent');
        if(intent){
            let singer = extractEntity(nlpData, 'singer')
            let releaseYear = extractEntity(nlpData, 'releaseYear')

            try{
                let singerData =  getsingerData(singer, releaseYear)
                resolve(response)
            }
            catch(error){
                reject(error)
            }
        }
        else{
            resolve("I am not sure I understand you...")
        }
        resolve(intent);
    });
}



module.exports = {
    extractAllEntities:extractAllEntities, 
    extractEntity:extractEntity, 
    displayAllEntities:displayAllEntities
}