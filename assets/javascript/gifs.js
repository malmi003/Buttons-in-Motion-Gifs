/*

 * those need to be clickable and pull the top 10 results plus a still image....
 * create input form where user can input what they want to see & a submit button
 * when they click that submit, creates new button that can be clicked up. 
*/


let motionArray = ["swim", "run", "jump", "kick", "pat", "skip", "dance", "catch", "chase", "fall", "trip"];
//for each of my array.length create button with class of motionButton


$(document).ready(function () {

    //put default btns on page
    motionArray.forEach(function (item) {
        let newButton = $("<button>");
        newButton.addClass("motionButton btn btn-primary m-1");
        newButton.html(item);
        $("#whereTheButtonsGo").append(newButton);

    });

    //adds new button onclick submit btn
    $("#searchBtn").on("click", function () {
        let searchText = $("#searchText").val().trim();
        let newButton = $("<button>");
        newButton.addClass("motionButton btn btn-primary m-1");
        newButton.html(searchText);
        $("#whereTheButtonsGo").append(newButton);
    })

    $(document).on("click", ".motionButton", function () {
        let searchTerm = $(this).html();
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=PZhhehJAvEFYvravJsugGkyEsNLpBElg&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            let results = response.data;
            for (let i = 0; i < results.length; i++) {
                let newDiv = $("<div>");
                let newP = $("<p>");
                newP.html("Rating: " + results[i].rating);

                let newImg = $("<img>");
                newImg.attr("animate-src", results[i].images.fixed_height.url);
                newImg.attr("still-src", results[i].images.fixed_height_still.url);
                newImg.attr("data-state", "still");
                newImg.addClass("gif");
                newImg.attr("src", results[i].images.fixed_height_still.url);

                newDiv.append(newP);
                newDiv.append(newImg);
                $("#whereTheImagesGo").prepend(newDiv);
            }
        })
    }) 
    
        $(document).on("click", ".gif", function () {
        let state = $(this).attr("data-state");

        if (state === "still") {
            let animateSrc = $(this).attr("animate-src");
            $(this).attr("src", animateSrc);
            $(this).attr("data-state", "animate");

        } else if (state === "animate") {
            let stillSrc = $(this).attr("still-src");
            $(this).attr("src", stillSrc);
            $(this).attr("data-state", "still");
        }
    })
});