const extractAllEntities = (entities) => {
    var result = [] 
    var keys_entities = Object.keys(entities)
    console.log(keys_entities)
    for(let i = 0; i < keys_entities.length; i++){
        entity = keys_entities[i]
        // console.log("Entity : ", entity)
        // console.log(entities[entity])
        if(entities[entity][0].confidence > 0.2){
            result.push({"entity_name": entity, "entity_value": entities[entity][0].value});
        }
    }
    return result
    
}



const displayAllEntities = function(entities){
    for(entity in all_entities_and_intent){
        console.log(all_entities_and_intent[entity])
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


const getEntityValue = function(entity_name, entities){
    var entity_value = null
    for(let i = 0; i < entities.length; i++){
        if(entities[i]['entity_name'] === entity_name){
            entity_value = entities[i]['entity_value']
        }
    }
    return entity_value
}


const getEntitiesNames = function(all_entities){
    var entities_names = []
    for(let i = 0; i < all_entities.length; i++){
        entities_names.push(all_entities[i]['entity_name'])
    }
    return entities_names
}


module.exports = {
    extractAllEntities:extractAllEntities, 
    extractEntity:extractEntity, 
    displayAllEntities:displayAllEntities,
    getEntityValue:getEntityValue, 
    getEntitiesNames:getEntitiesNames
}