
 
var base_url = "https://api.musixmatch.com/ws/1.1/"
 
 //your api key
var api_key = "&apikey=YOUR_API_KEY"
 
var // api methods
var a1 = lyrics_matcher = "matcher.lyrics.get"
var a2 = lyrics_track_matcher = "track.lyrics.get"
var a3 = track_matcher = "matcher.track.get"
var a4 = subtitle_matcher = "matcher.subtitle.get"
var a5 = track_search = "track.search"
var a6 = artist_search = "artists.search"
var a7 = album_tracks = "album.tracks.get"
var a8 = track_charts = "chart.tracks.get"
var a9 = artist_charts = "chart.artists.get"
var a10 = related_artists = "artist.related.get"
var a11 = artist_album_getter = "artist.albums.get"
var a12 = track_getter = "track.get"
var a13 = artist_getter = "artist.get"
var a14 = album_getter = "album.get"
var a15 = subtitle_getter = "track.subtitle.get"
var a16 = snippet_getter = "track.snippet.get"
var api_methods = [a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16]
 
 // format url
var format_url = "?format=json&callback=callback"
 
 // parameters
var p1 = artist_search_parameter = "&q_artist="
var p2 = track_search_parameter = "&q_track="
var p3 = track_id_parameter = "&track_id="
var p4 = artist_id_parameter = "&artist_id="
var p5 = album_id_parameter = "&album_id="
var p6 = has_lyrics_parameter = "&f_has_lyrics="
var p7 = has_subtitle_parameter = "&f_has_subtitle="
var p8 = page_parameter = "&page="
var p9 = page_size_parameter = "&page_size="
var p10 = word_in_lyrics_parameter = "&q_lyrics="
var p11 = music_genre_parameter = "&f_music_genre_id="
var p12 = music_language_parameter = "&f_lyrics_language="
var p13 = artist_rating_parameter = "&s_artist_rating="
var p14 = track_rating_parameter= "&s_track_rating="
var p15 = quorum_factor_parameter = "&quorum_factor="
var p16 = artists_id_filter_parameter = "&f_artist_id="
var p17 = country_parameter = "&country="
var p18 = release_date_parameter = "&s_release_date="
var p19 = album_name_parameter = "&g_album_name="
var parameters = [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19]
 
 // arrays with paramaters for each method
var x1 = lyrics_matcher_parameters = [p1,p2]
var x2 = lyrics_track_matcher_parameters = [p3]
var x3 = track_matcher_parameters = [p1,p2,p6,p7]
var x4 = subtitle_matcher_parameters = [p1,p2]
var x5 = track_search_paramaters = [p1,p2,p10,p4,p11,p12,p12,p14,p15,p8,p9]
var x6 = artist_search_parameters = [p1,p16,p8,p9]
var x7 = album_tracks_parameters = [p5,p6,p8,p9]
var x8 = track_charts_paramaters = [p8,p9,p17,p6]
var x9 = artist_charts_parameters = [p8,p9,p17]
var x10 = related_artists_parameters = [p4,p8,p9]
var x11 = artists_album_getter_paramaters = [p4,p18,p19,p8,p9]
var x12 = track_getter_parameters = [p3]
var x13 = artist_getter_parameters = [p4]
var x14 = album_getter_parameters = [p5]
var x15 = subtitle_getter_parameters = [p3]
var x16 = snippet_getter_parameters = [p3]
var paramater_lists = [x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13,x14,x15,x16]
var 
