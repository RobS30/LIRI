// local environmental variables
require("dotenv").config();

// varable declaration
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");
// var env = process.env;

// input options from command line
var searchOption = process.argv[2];
var searchParameter = process.argv[3];

UserInputs(searchOption, searchParameter);

// function to look up concerts in the area
// The URL given in the instructions always returned an unauthorized error message.

// function concertThis(searchParameter) {
//   var queryURL =
//     "https://rest.bandsintown.com/artists/" +
//     searchParameter +
//     "/events?app_id=codingbootcamp";
//   axios
//     .get(queryURL)
//     .then(function(bands) {
//       console.log(bands);
// console.log(bands);

// function to look up songs information

function spotifyThisSong(searchParameter) {
  if (searchParameter === undefined) {
    searchParameter = "The Sign";
  }
  spotify.search(
    {
      type: "track",
      query: searchParameter
    },
    function(errorMessage, songData) {
      if (errorMessage) {
        console.log("An error occurred: " + errorMessage);
        return;
      }
      var songsResults = songData.tracks.items;

      for (var i = 0; i < songsResults.length; i++) {
        console.log("***SONG INFO***");
        console.log(i);
        console.log("Song name: " + songsResults[i].name);
        console.log("Preview song: " + songsResults[i].preview_url);
        console.log("Album: " + songsResults[i].album.name);
        console.log("Artist(s): " + songsResults[i].artists[0].name);
        console.log("**********");
      }
    }
  );
}

// function to look up movie details
function movieThis(searchParameter) {
  if (searchParameter === undefined) {
    searchParameter = "Mr. Nobody";
    console.log("**********");
    console.log(
      "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
    );
    console.log("It's on Netflix!");
    
  }
  var queryURL =
    "http://www.omdbapi.com/?t=" +
    searchParameter +
    "&y=&plot=short&apikey=trilogy";
  request(queryURL, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      var movies = JSON.parse(body);
      console.log("***MOVIE INFO***");
      console.log("Title: " + movies.Title);
      console.log("Year: " + movies.Year);
      console.log("IMDB Rating: " + movies.imdbRating);
      console.log("Country of Production: " + movies.Country);
      console.log("Language: " + movies.Language);
      console.log("Plot: " + movies.Plot);
      console.log("Actors: " + movies.Actors);
      console.log("**********");
    } else {
      console.log("An error occurred: " + error ".  Please try again");
    }
  });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(errer, data) {
    if (error) {
      return console.log(error);
    }
    var dataArray = data.split(",");
    UserInputs(dataArray[0], dataArray[1]);
  });
}

// Switch statement to determine what is being done
function UserInputs(searchOption, searchParameter) {
  switch (searchOption) {
    case "concert-this":
      concertThis(searchParameter);
      break;

    case "spotify-this-song":
      spotifyThisSong(searchParameter);
      break;

    case "movie-this":
      movieThis(searchParameter);
      break;

    case "do-what-it-says":
      doWhatItSays(searchParameter);
      break;

    default:
      outputNum =
        "Please use one of the following commands: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says";
  }
}
