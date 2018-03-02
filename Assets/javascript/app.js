//array of button values
var animalArray = ["Puppy", "Bird", "Cat", "Lion"];

//when an animal button is clicked, The Gifs will be displayed
$(document).on("click", ".animals", displayGifs);

//When A Gif is clicked, it will be paused or played.
$(document).on("click", ".animalGif", stillAnimate);

//function to display buttons to screen
function renderButtons() {
  $("#button-div").empty();
  //for loop to display all animals in array
  for (var i = 0; i < animalArray.length; i++) {
    var a = $("<button class = 'btn btn-success btn-lg animals'>");
    // Adding a data-attribute
    a.attr("data-name", animalArray[i]);
    // Providing the initial button text
    a.text(animalArray[i]);
    // Adding the button to the HTML
    $("#button-div").append(a);
  }
}
//call RenderButtons so initial array will be displayed.
renderButtons();

//Function to add the Animal user has input
$("#add-button").on("click", function(event) {
  event.preventDefault();
  //grabbing value of users input
  var animal = $("#animal-input")
    .val()
    .trim();
  animalArray.push(animal); //add it to the array
  console.log(animalArray);
  //re-render the buttons so they mirror array's current status
  renderButtons();
});

//displays Gifs, called on line 5
function displayGifs() {
  var animalName = $(this).attr("data-name");
  console.log(animalName);
  //giphyAPI
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    animalName +
    "&api_key=UwwRSEspPbnBOBcASyCYXUeX9Yngj3KO&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    $("#gif-div").empty();
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        // Creating a div with the class "item"
        var gifDiv = $("<div class='float-left gifDiv'>");

        // Storing the result item's rating
        var rating = results[i].rating;

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + rating);

        // Creating an image tag
        var AnimalsGif = $("<img class = animalGif>");

        // Giving the image tag an src attribute of a proprty pulled off the
        // result item
        AnimalsGif.attr("src", results[i].images.fixed_height_still.url);
        AnimalsGif.attr("data-state", "still");
        AnimalsGif.attr("data-still", results[i].images.fixed_height_still.url);
        AnimalsGif.attr("data-animate", results[i].images.fixed_height.url);

        // Appending the paragraph and Animal gif we created to the "gifDiv"
        gifDiv.append(p);
        gifDiv.append(AnimalsGif);

        $("#gif-div").append(gifDiv);
      }
    }
  });
}

//function to pause and animate gifs.
function stillAnimate() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    console.log(state);
    console.log(this);
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    console.log(state);
    console.log(this);
  }
}
