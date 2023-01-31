const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const {getTweets, getTweetsByUserName} = require('./services/database');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello from Twitter');
});

app.get('/tweets', async (req, res) => {
	//get tweets from database
	//respond with tweets from JSON
	const tweets = await getTweets();
	res.json(tweets);
});

app.get('/tweets/:username', async (req, res) => {
	const {username} = req.params;
	const tweets = await getTweetsByUserName(username);
	res.json(tweets);
});

app.listen(port, () => {
	console.log(`Twitter API listen to ${port}.`);
});
