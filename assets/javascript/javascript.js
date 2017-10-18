$( document ).ready(function(){


//creating an array of topics and making buttons for each 
var theme = ["Tesla","Solar Storm", "Panda","Gold","yellowstone"];

var displayButtons= function(){
    $("#themeDisplay").empty(); //clearing out div

    for (var i=0; i<theme.length; i++){

    	var gifButton=$("<button>");
    	gifButton.addClass("theme");
    	gifButton.addClass("btn btn-primary ");
    	gifButton.attr("themeName", theme[i]);
    	gifButton.text(theme[i]);

    $("#themeDisplay").append(gifButton); //attaching buttons to div

    }
}
displayButtons();

//-----------------------------------------------------------------------------------------------------------------


//function to create new theme button 
	
    $("#themeSearch").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newTheme = $("#themeInput").val().trim();

        if(newTheme == ""){
        	return false; // added so user cannot add a blank button
        };
       
        // Adding theme from the textbox to our array
        theme.push(newTheme);
        
        // then Calling renderButtons which handles the processing(creating) of our theme array
        displayButtons();

        //this will clear the input field 
        $("#themeInput").val("");
	 	
    });

//------------------------------------------------------------------------------------------------------------------

//creating a function to display images when theme button is clicked
function displayGifInfo(){

	var newTheme = $(this).attr("themeName");
	var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + newTheme + "&api_key=e2e59352785546c39ea3cbf9076d6201"
	console.log(queryURL);
	// creating an AJAX call for the specific theme being clicked
	$.ajax({
		url: queryURL,
		method: "GET"

	}).done(function(response){
	console.log(response);

	$("#images").empty(); // this will clear everything(including previous images) in images div
	

	var results = response.data
	console.log(results);

	for(var i=0; i<10; i++){

		var gifDiv = $("<div>"); 
		gifDiv.addClass("gifDiv");

		//rating
		var gifRating= $("<p id='ratingsText'>").text("Rating: " + results[i].rating);
		gifDiv.append(gifRating);

		//getting image attributes
		
		var gifImage = $("<img style='display:inline-block'>");
		gifImage.attr("data-state", "still"); // setting a default data state
		gifImage.attr("src",results[i].images.fixed_height_small_still.url); //the image in this url holds the default image when the theme button is clicked
		gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); //setting attribute: data-still. this url leads to a still image (happens to be the same image above)
		gifImage.attr("data-animate",results[i].images.fixed_height_small.url); //setting attribute: data-animate. this url leads to an animated imaged image of the above image
		gifImage.addClass("image");

		gifDiv.append(gifImage);

		$("#images").prepend(gifDiv);
	}
		
	})
};

$(document).on("click",".theme", displayGifInfo); //calling displayGifInfo function when theme button is clicked
//------------------------------------------------------------------------------------------------------------------------------------

// Animation - Animation Pause
$(document).on("click",".image", function(){
	var state =$(this).attr("data-state");
	if(state == "still"){
		$(this).attr("src",$(this).data("animate"));
		$(this).attr("data-state", "animate");
	}else{
		$(this).attr("src", $(this).data("still"));
		$(this).attr("data-state", "still");
	}
})


    
});