$(document).ready(function () {
    console.log("ready!");


    function displaytopicInfo() {

        var topic = $("#search-bar").val().trim();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=vqrHAjf6lQWX7tH5y6TbrT30Q6qkO7un&limit=144";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            // Creating a div to hold the topic
            var topicDiv = $("<div class='topic'>");
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r") {


                    var image = $('<img height="100" width="100">');
                    image.attr("src", results[i].images.fixed_height_still.url);
                    image.attr("data-still", results[i].images.fixed_height_still.url);
                    image.attr("data-animate", results[i].images.fixed_height.url);
                    image.attr("data-state", "still");
                    image.addClass("gif");
                    topicDiv.append(image);
                    $("#topics-view").prepend(topicDiv);
                }
            }
        });
    }



    $("#search").on("click", function (event) {
        event.preventDefault();
        $(document).on("click", "#search", displaytopicInfo);
    });




    // Adding play/ pause and other coolness
    $("#topics-view").on("click", ".gif", function (event) {
        event.preventDefault();
        console.log("been clicked")
        console.log($(this))
        // console.log("me", this.outerHTML)
        // console.log(this.attributes[4].nodeValue)

        var animatePic = this.attributes[4].nodeValue

        // $(message).val('<img src="' + animatePic + '">')
 
        //addes embeded url to message
        $(message).val(`
        <img class="sent-gif" src = "${animatePic}">
        `)

        //adds border to selected gif
        $('.gif').removeClass('active');
        $(this).addClass('active');



        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    })

});