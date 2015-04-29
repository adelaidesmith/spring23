var https = require('https');
var fs = require('fs');
var quotes = [];
quotes.push("Love all, trust a few, do wrong to none.");
quotes.push("Better a witty fool than a foolish wit");
quotes.push("Doubt thou the stars are fire, Doubt that the sun doth move. Doubt truth to be a liar, But never doubt I love");
quotes.push("What's in a name? That which we call a rose by any other name would smell as sweet");
quotes.push("Love looks not with the eyes, but with the mind, And therefore is winged Cupid painted blind.");
quotes.push("When a father gives to his son, both laugh; when a son gives to his father, both cry");
quotes.push("Talking isn't doing. It is a kind of good deed to say well; and yet words are not deeds");


function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt')
};

function respond(theText) {

    theResponse = {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: theText
            },
            card: {
                type: 'Simple',
                title: 'Shakespeare',
                subtitle: 'from brainyquote.com',
                content: theText
            },
            shouldEndSession: 'true'
        }
    }
    return (theResponse);
}


https.createServer(options, function(req, res) {
    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function(data) {
            jsonString += data;
        });
        req.on('end', function() {
            console.log(JSON.parse(jsonString));
        });
    }
    myResponse = JSON.stringify(respond(getRandomQuote()));
    res.setHeader('Content-Length', myResponse.length);
    res.writeHead(200);
    res.end(myResponse);
    console.log(myResponse);
}).listen(443); //Put number in the 3000 range for testing and 443 for production
