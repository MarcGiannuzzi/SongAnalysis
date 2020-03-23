
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const api_key = "6b38808ba0b4b88553e624ef4a285812"
 


const getLyrics = (artist_name, song_name, album_name=null) => {
    var song_query_part = "&q_track=" + song_name.replace(" ", "%20")
    var artist_query_part = "&q_artist=" + artist_name.replace(" ", "%20")
    var url = "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&apikey=" + api_key + artist_query_part + song_query_part
    console.log(url)
    return new Promise((resolve, reject) => {
        

        
        var request = new XMLHttpRequest()
        request.open('GET', url)
        request.send()
        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                var data = request.responseText;
                var json_data = JSON.parse(JSON.stringify(data))
                resolve(data.substring(9, 1900))
            } else {
                reject("Error during getting lyrics request")
            }
        }
    })
}


const getsingerData = (singer_name, releaseYear = null) => {
    var url = "https://api.musixmatch.com/ws/1.1/artist.related.get?format=jsonp&callback=callback&apikey=" + api_key + "&artist_id=12"
    return new Promise((resolve, reject) => {
        

        
        var request = new XMLHttpRequest()
       
        request.open('GET', url)

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                var data = request.responseText;
                var json_data = JSON.parse(data)
                resolve(json_data)
                console.log(json_data)
            } else {
                reject("Error......")
            }
        }
    })
}



module.exports = {
    getLyrics: getLyrics
}