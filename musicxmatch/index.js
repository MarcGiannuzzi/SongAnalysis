const getEntityValue = require('./../message_analyzer').getEntityValue
const getEntitiesNames = require('./../message_analyzer').getEntitiesNames
const manipulate_data = require('./manipulate_data')


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const base_url = "https://api.musixmatch.com/ws/1.1/"
const format = "?format=json&callback=JSON.parse"
const apikey="&apikey=6b38808ba0b4b88553e624ef4a285812"


const getLyrics = async function(artist_name, song_name, album_name=null){
    var result_lyrics = null
    var method = "matcher.lyrics.get"
    var song_query_part = "&q_track=" + song_name.replace(" ", "%20")
    var artist_query_part = "&q_artist=" + artist_name.replace(" ", "%20")
    var url = base_url + method + format + apikey + artist_query_part + song_query_part 
    console.log(url)
        

    result_lyrics = await new Promise((resolve, reject) => {
        var request = new XMLHttpRequest()
        request.open('GET', url)
        request.send()
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                var data = request.responseText;
                var json_data = JSON.parse(data)
                result_lyrics = resolve(json_data)
            } else { 
                reject("Error during getting lyrics request")
            }
        }
    })
    
    
    return  result_lyrics // same as return result_lyrics (because of await)
}



const getDescription =  async function(intent, artist_name=null, song_name=null, album_name=null){
    var data_description = null
    
    if(artist_name != null && song_name != null){
        var method = "track.search"
        var song_query_part = "&q_track=" + song_name.replace(" ", "%20")
        var artist_query_part = "&q_artist=" + artist_name.replace(" ", "%20")
        var url = base_url + method + format + apikey + artist_query_part + song_query_part
        
        var request = new XMLHttpRequest()
        var promise_description =  await new Promise((resolve, reject) => {
        

        
            request.open('GET', url)
            request.send()
            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    var data = request.responseText;
                    //var json_data = JSON.parse(JSON.stringify(data))
                    resolve(data)
                } 
                else {
                    reject("Error during getting description request with song and artist.")
                }
            }
        })

        data_description =  promise_description


    }

    else{
        if(artist_name != null || song_name != null){
            var request = new XMLHttpRequest()
            var url = ''
            var method = ''

            if(artist_name != null){
                var artist_query_part = "&q_artist=" + artist_name.replace(" ", "%20")
                if(intent === 'description'){
                    method = "artist.search"
                }
                else if(intent === 'song'){
                    method = "track.search"
                }
                
                url = base_url + method + format + apikey + artist_query_part 
            }
            else{
                var song_query_part = "&q_track=" + song_name.replace(" ", "%20")
                method = "track.search"
                url = base_url + method + format + apikey + song_query_part + "&page_size=100"
            }
            
            console.log("URL : ", url)
            var promise_description =  await new Promise((resolve, reject) => {
                request.open('GET', url)
                request.send()
                request.onload = () => {
                    if (request.status >= 200 && request.status < 400) {
                        // var data = request.responseText;
                        // var json_data = JSON.parse(JSON.stringify(data))
                        var data = request.responseText
                        var json_data = JSON.parse(data)
                        resolve(json_data)
                    } 
                    else {
                        reject("Error during getting description request")
                    }
                }
            })

            data_description = promise_description


        }
        
        else{
            console.log("Logical error in getDescription.")
        }
    }

    return data_description
    
    
}



const mainGetter = async function(all_entities_and_intent){
   var result_data = ''

   var number_entities = all_entities_and_intent.length - 1
   var all_entities = all_entities_and_intent.slice(0, number_entities)


   console.log("all_entities : ", all_entities)

   var entities_names = getEntitiesNames(all_entities)
   


   var artist_name = getEntityValue('artist', all_entities)
   var song_name = getEntityValue('song', all_entities)
   var album_name = getEntityValue('album', all_entities)
   var lyrics = getEntityValue('lyrics', all_entities)

   console.log("Artist name : ", artist_name)
   console.log("Song name : ", song_name)
   console.log("Album name : ", album_name)
   console.log("Lyrics : ", lyrics)
    
    if(all_entities.length > 0){

        var intent = all_entities_and_intent[number_entities]['entity_value']
        console.log("intent : ", intent)


        if(intent === 'artist'){
            //possible api methods : a9, a11, a13
            var json_data = await getDescription(intent, artist_name, song_name)
            result_data = manipulate_data.track_search(json_data)
            

        }


        else if(intent ==='description'){
            //possible api methods : a6
            var json_data = await getDescription(intent, artist_name, song_name)
            if(artist_name != null){
                result_data =  manipulate_data.artist_search(json_data)
            }
            if(song_name != null){
                result_data =  manipulate_data.track_search(json_data)
            }
            
            
        }
    
        else if(intent === 'song'){
            //possible api methods : a3, a5, a7, a8, a12
            var x = 0
            var json_data = await getDescription(intent, artist_name, song_name)
            result_data =  manipulate_data.track_search(json_data)
        }
    
        else if(intent === 'lyrics'){
            //possible api methods : a1
            var json_data = await getLyrics(artist_name, song_name)
            result_data = manipulate_data.matcher_lyrics_get(json_data)
            
        }
    
        else if(intent === 'related_artists'){
            //possible api methods : a10
            var x = 0
        }
        else if(intent === 'tutorial'){
            result_data = 'With this chatbot, you can : \nGet the lyrics of a song,\nHave a description about some artist,\nHave a description about a track.'
        }
        else if(intent === 'hello'){
            result_data = 'Hi, please to meet you ! :) '
        }
        else if(intent === 'goodbye'){
            result_data = 'Goodbye, see you soon ! :)'
        }
        else if(intent === 'thanks'){
            result_data = 'That is my job to serve you ! :)'
        }
   }
   else{
        result_data = 'I can not help with what you wrote, please try an other request :)'  
   }

   console.log("\n\n\Result data : \n\n\n", result_data)
   return result_data
   
}







module.exports = {
    getLyrics: getLyrics, 
    mainGetter:mainGetter
}