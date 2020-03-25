const getEntityValue = require('./../message_analyzer').getEntityValue
const getEntitiesNames = require('./../message_analyzer').getEntitiesNames


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const base_url = "https://api.musixmatch.com/ws/1.1/"
const format = "?format=json&callback=JSON.parse"
const apikey="&apikey=6b38808ba0b4b88553e624ef4a285812"





const verification_length_message = function (message){
    var bool = false
    if(message.length < 1500){
        bool = true
    }
    return bool
}


const track_search = function(json_data){
    var result = 'Here is your result:\n\n '
    var track_list = json_data.message.body.track_list

    var track = ''
    var artist = ''
    var track_name = ''
    var album_name = ''
    var music_genres_list = ''

    for(let i = 0; i < track_list.length; i++){
        if(verification_length_message(result)){
            track = track_list[i].track
            artist = track.artist_name
            track_name = track.track_name 
            album_name = track.album_name
            music_genres_list = track.primary_genres.music_genre_list
    
            console.log('music_genres_list : ', music_genres_list)
            console.log('album_name : ', album_name)
    
            result += "\nTrack name : " + track_name
            result += "\nArtist name : " + artist
            result += "\nAlbum name : " + album_name
            for(let j = 0; j < music_genres_list.length; j++){
                result += "\nGenre name : " + music_genres_list[j].music_genre.music_genre_name_extended
            }
            
            
            result += '\n___________\n'
        }
        
    }
    return result

}



const artist_search = function(json_data){
    //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    // console.log("JSON_DATA: ", json_data)
    var result = 'Here is the description of the artists with this name : \n\n'
    var artist = json_data.message.body.artist_list[0].artist

    var artist_name = 'Artist name : ' +  artist.artist_name + '\n'
    var artist_country = 'Artist country : ' + artist.artist_country + '\n'
    var artist_twitter  = 'Twitter : ' + artist.artist_twitter_url + '\n'
    var artist_aliases = 'Artist aliases : ' + '|'

    for(let i = 0; i < artist.artist_alias_list.length; i++){
        artist_aliases += artist.artist_alias_list[i].artist_alias + '|'
    }

    result += artist_name + artist_country + artist_twitter + artist_aliases 

    return result

}


const matcher_lyrics_get = function(json_data){
    // console.log("LYRRRRRRRRRRRRRRRRRRRRRRRRRRRICS ", lyrics)
    // console.log("typeoflyriiiiiiiiics ", typeof(lyrics))
    //console.log("jsooooooooooooooon : ", json_data)

    if(typeof json_data.message.body.lyrics !== 'undefined'){
        var lyrics = json_data.message.body.lyrics.lyrics_body
        return lyrics.substring(0, 1000) + '\n...'
    }
    else{
        return "These lyrics are not in the database of musicxmatch, sorry :("
    }
    
}


module.exports = {
    track_search:track_search,
    artist_search:artist_search,
    matcher_lyrics_get:matcher_lyrics_get
}