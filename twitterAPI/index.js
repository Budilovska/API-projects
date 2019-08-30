const express = require("express");
const app = express();
const tw = require("./twitter");

app.use(express.static("./public"));

app.get("/ticker.json", function(req, res) {
    tw.getToken()
        .then(token => {
            return Promise.all([
                tw.getTweets(token, "nytimes"),
                tw.getTweets(token, "bbcworld"),
                tw.getTweets(token, "theonion")
            ]);
        })
        .then(tweets => {
            console.log(tweets);
            let mergedTweets = [...tweets[0], ...tweets[1], ...tweets[2]];
            let sortedTweets = mergedTweets.sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });
            sortedTweets = sortedTweets
                .filter(tweet => {
                    return (
                        tweet.entities.urls && tweet.entities.urls.length == 1
                    );
                })
                .map(tweet => {
                    return {
                        text: "(" + tweet.user.name + ")" + tweet.full_text,
                        href: tweet.entities.urls[0].url
                    };
                });
            res.json(sortedTweets);
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
});
// });

app.listen(8080, () => console.log("I'm listening"));

// Promise.all([
//     getTweets(token, 'nytimes'),
//     getTweets(token, 'bbcworld'),
//     getTweets(token, 'theonion'),
// ]).then(responses => {
//     console.log(responses);
// })
//
// app.get("/ticker.json", function(req, res) => {
//     getToken().then(token => {
//         return Promise.all([
//             getTweets(token, 'nytimes'),
//             getTweets(token, 'bbcworld'),
//             getTweets(token, 'theonion'),
//         ]).then(responses => {
//             console.log(responses);
//
//             let nytimes = responses[0];
//             let bbcworld = responses[1];
//             let theonion = responses[2];
//
//             let mergedResults = nytimes.concat(bbcworld, theonion);
//
// or like this:
// let mergedResults = responses[0].concat(responses[1], responses[2])
// or this one is nice:
//    --->
//    let mergedResults = [...responses[0], ...responses[1], ...responses[2]]
//
// here you filter your results and send it via res.json
//
// sorting by the time tweets were created: reversed chronological order
//
// let sorted = mergedResults.sort((a, b) => {
//     return new Date(b.created_at) - new Date(a.created_at)
// })
//
//     }).catch(() => {
//         res.sendStatus(500);
//     })
// })
