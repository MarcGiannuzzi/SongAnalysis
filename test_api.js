var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;






const xhr = new XMLHttpRequest();
xhr.responseType = 'text';

xhr.open("GET", "https://api.musixmatch.com/ws/1.1/artist.related.get?apikey=6b38808ba0b4b88553e624ef4a285812&format=jsonp&callback=callback&artist_id=12")


xhr.send();

xhr.onload = function(){
    // var x = JSON.parse(xhr.responseText)
    // console.log(x)
    var json_result = JSON.parse(xhr.responseText.substring(9, this.responseText.length -2))
    console.log(json_result.message.body.artist_list)
}

console.log(xhr.status)
console.log(xhr.readyState)
// xhr.onreadystatechange = (e) => {
//     console.log(xhr.responseText)
// }


