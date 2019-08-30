console.log("sanity check", $);

(function() {
    var headlines = $("#headlines");
    var links = $("a");

    $.ajax({
        url: "ticker.json",
        success: function(links) {
            console.log(links);
            var html = "";
            for (i = 0; i < links.length; i++) {
                html +=
                    "<a href=" + links[i].href + ">" + links[i].text + "</a>";
            }
            $("#headlines").append(html);
        }
    });

    //offsetLeft; //returns the left position (in px) relative to the left side the offsetParent element.
    var left = headlines.offset().left;
    var animId;
    console.log(links);

    function moveHeadlines() {
        left--;
        if (
            left <=
            -$(".links")
                .eq(0)
                .width()
        ) {
            //returns the viewable width of an element in pixels, including padding, border and scrollbar, but not the margin
            left += $(".links")
                .eq(0)
                .width();
            headlines.append($(".links").eq(0));
        }
        $("#headlines").css({
            left: left + "px"
        });
        // headlines.style.left = left + "px";
        //  console.log(left);

        animId = requestAnimationFrame(moveHeadlines);
    }

    headlines.on("mouseover", function() {
        cancelAnimationFrame(animId); //stop the ticker
    });

    headlines.on("mouseout", function() {
        moveHeadlines();
    });
    moveHeadlines();
})();
