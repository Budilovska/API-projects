const https = require("https");
const { consumerKey, consumerSecret } = require("./secrets");

exports.getToken = () =>
    new Promise(function(resolve, reject) {
        const req = https.request(
            {
                method: "POST",
                host: "api.twitter.com",
                path: "/oauth2/token",
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${consumerKey}:${consumerSecret}`
                    ).toString("base64")}`,
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8"
                } //end headers
            }, //end object
            res => {
                if (res.statusCode != 200) {
                    console.log(res.statusCode);
                    reject(res.statusCode);
                } else {
                    let body = "";
                    res.on("data", chunk => (body += chunk));
                    res.on("end", () => {
                        console.log(body);
                        body = JSON.parse(body);
                        resolve(body.access_token);
                    }); //end of 'end' event
                    res.on("error", err => {
                        console.log(err);
                        reject(err);
                    });
                    req.on("error", err => {
                        console.log(err);
                        reject(err);
                    });
                } //end of else
            } //end callback function
        ); //end https request
        req.write("grant_type=client_credentials");
        req.end();
    }); //exports.getToken end

exports.getTweets = (token, name) =>
    new Promise(function(resolve, reject) {
        const req = https.request(
            {
                method: "GET",
                host: "api.twitter.com",
                path: `/1.1/statuses/user_timeline.json?tweet_mode=extended&screen_name=${name}`,
                headers: {
                    Authorization: `bearer ${token}`
                } //end headers
            }, //end object
            res => {
                if (res.statusCode != 200) {
                    console.log(res.statusCode);
                    reject(res.statusCode);
                } else {
                    let body = "";
                    res.on("data", chunk => (body += chunk));
                    res.on("end", () => {
                        console.log(body);
                        body = JSON.parse(body);
                        resolve(body);
                    }); //end of 'end' event
                    res.on("error", err => {
                        console.log(err);
                        reject(err);
                    });
                    req.on("error", err => {
                        console.log(err);
                        reject(err);
                    });
                } //end of else 2
            } //end callback function gettweets
        );
        // req.write();
        req.end();
    });
