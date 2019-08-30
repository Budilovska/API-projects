(function() {
    var nextUrl;
    var noImage = $(".no-image");
    var useInScroll = location.search.indexOf("scroll=infinite");


    $(".submit-btn").on("click", function() {
        var userInput = $(".input").val();
        var albumOrArtist = $(".artist-or-album").val();
        var url = "https://elegant-croissant.glitch.me/spotify";

        $.ajax({
            url: url,
            data: {
                query: userInput,
                type: albumOrArtist
            },
            success: function(response) {
                response = response.artists || response.albums;

                nextUrl = response.next && response.next.replace("https://api.spotify.com/v1/search", "https://elegant-croissant.glitch.me/spotify");

                $(".results-container").html(displayResults(response));
                checkScrollPosition();
            } //end of ajax success
        }); //end of ajax

    }); //end of $(".submit-btn").on "click"

    $(".more-btn").on("click", function() {

        $.ajax({
            url: nextUrl,
            success: function(response) {
                console.log(response);
                response = response.artists || response.albums;
                    nextUrl = response.next && response.next.replace("https://api.spotify.com/v1/search", "https://elegant-croissant.glitch.me/spotify");

                $(".results-container").append(displayResults(response));
                checkScrollPosition();
            }
        });//more $.ajax end
    }); //$(".more-button").on

    function displayResults(response) {
        var userInput = $(".input").val();
        $(".more-btn").addClass("visibility");  //make more button appear

        var resultsHtml = "";
        for (var i = 0; i < response.items.length; i++) {
            // console.log(response.items[i].external_urls.spotify);
            if (!response.items[i].images[0]) {
                resultsHtml +=
                    '<a href="' +
                    response.items[i].external_urls
                        .spotify +
                    '"><div class="item"><img src="noimage.png"><div class="names">' +
                    response.items[i].name +
                    "</div></div></a>";
            } else {
                resultsHtml +=
                    '<a href="' +
                    response.items[i].external_urls
                        .spotify +
                    '"><div class="item"><img src="' +
                    response.items[i].images[0].url +
                    '"><div class="names">' +
                    response.items[i].name +
                    "</div></div></a>";
            }
        } //end of for loop
            // $(".results-container").html(resultsHtml);  //BUGGGGGGGGG!!!!!!

            if (response.items.length == 0) {
            $(".Results-for").html("<h3>No results</h3>");
        } else {
            $(".Results-for").html("<h3>Results for '" + userInput + "'</h3>");
        }

            return resultsHtml;



    // $(".results-container").html(resultsHtml);

    }; //end of function displayResults



function checkScrollPosition() {
$(".more-btn").removeClass("visibility");
var hasReachedBottom = $(document).scrollTop() + $(window).height() > $(document).height() - 100;
console.log(hasReachedBottom);
if (hasReachedBottom) {
    $(".more-btn").triggerHandler("click");
} else {
    setTimeout(checkScrollPosition, 1500);
}
}


})(); //end of efi
