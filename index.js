const newrelic = require('newrelic');
const express = require('express');
const https = require('https');

const app = express();
app.set('view engine', 'pug');
app.locals.newrelic = newrelic;

// Render home page
app.get('/', function (req, res) {
    res.render('index', { title: 'New Relic K8s Guestbook', message: 'Post a message on our guestbook.' });
});

// Get messages
app.get('/message', function (req, res) {
    if (Math.random() > 0.5) {
        https.get('https://www.google.com/', (resp) => {
            res.send("Fetched google");
        });
    } else {
        https.get('https://www.facebook.com/', (resp) => {
            res.send("Fetched facebook");
        });
    }
});

// Health check
app.get('/healthz', function (req, res) {
    res.status(200).send('OK');        
});

app.listen(process.env.PORT || 3000, function () {
    console.error('Frontend listening on port 3000!');
});
