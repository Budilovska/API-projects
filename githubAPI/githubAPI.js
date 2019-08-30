(function() {
    // -------> DO NOT TOUCH THIS OR EVERYTHING BREAKS
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll(
        'script[type="text/x-handlebars-template"]'
    );

    Array.prototype.slice.call(templates).forEach(function(script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });
    // -------> DO NOT TOUCH THIS OR EVERYTHING BREAKS

    var username, password, userToSearch;

    $(".submit-button").on("click", function() {
        username = $('input[name="username"]').val();
        password = $('input[name="password"]').val();
        userToSearch = $('input[name="user-to-search"]').val();

        //base URL --> tells us what website we're trying to get data from. It's usually https://api.WEBSITE.com
        var baseUrl = "https://api.github.com";

        //Endpoint --> what specific piece of data u want to get from this website.
        //the specific piece we need now from github is specific user's repositories
        var endpoint = "/users/" + userToSearch + "/repos";
        // console.log("baseUrl + endpoint", baseUrl + endpoint);

        $.ajax({
            url: baseUrl + endpoint,
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password) //btoa function translates words into API accepted characters
            },
            success: function(response) {
                //the only info we need from the response is a full_name, avatar_url
                //step 3 - pass data to the template in your JS file, then hadlebards loop through the data and returns a bunch of divs
                var myReposTemplate = Handlebars.templates.reposTemplate({
                    repos: response
                }); //the response is coming from success function
                //step 4 append the template to the DOM so we could actually see it on the screen
                $(".repos-container").html(myReposTemplate);

                ///////////////////////////////////////////////

                $(".repos-name").on("click", function(e) {
                    var endPointCommits =
                        "/repos/" + $(e.target).text() + "/commits";
                    username = $('input[name="username"]').val();
                    password = $('input[name="password"]').val();

                    $.ajax({
                        url: baseUrl + endPointCommits,
                        headers: {
                            Authorization:
                                "Basic " + btoa(username + ":" + password) //btoa function translates words into API accepted characters
                        },
                        success: function(response) {
                            // console.log(response);
                            response = response.slice(0, 10);

                            var myCommitsTemplate = Handlebars.templates.commitsTemplate(
                                {
                                    commits: response
                                }
                            );

                            $(e.target).append(myCommitsTemplate);
                        } //end of second success
                    }); //end of second ajax
                }); //end of repos-element click
            } //success end
        }); //ajax end
    }); //end of submit button click
})(); //iife end

////STEPS FOR WORKING WITH Handlebars
// 1. html - write template (that's scritpt in html)
//make an array repos = []

// 2. create empty div where the template will eventually show up on screen

// 3. JS - pass handlebards the data it needs to render the templates -
// in this case an array

// 4. JS append the template which now had a data it needs from JS and pass it to the DOM.
// this step will actually render the template on screen so we can see it

// when we click on the repo we get 10 lates projects ---> create new ajax request, all the same, change only the endpoint of the commits
