const {Pool} = require('pg');

const database = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'Twitter',
	password: 'Utvikling2022',
	port: 5432,
});

async function getTweets() {
	const result = await database.query(`
    SELECT
     tweets.id,
     tweets.message,
     tweets.created_at,
     users.username,
     users.name
    FROM
     Tweets
    JOIN users ON
     tweets.user_id = users.id
    ORDER BY created_at DESC;
    `);

	console.log(result);

	return result.rows;
}

async function getTweetsByUserName(username) {
	const result = await database.query(
		`
    SELECT
    tweets.id,
    tweets.message,
    tweets.created_at,
    users.username,
    users.name
   FROM
    Tweets
   JOIN users ON
    tweets.user_id = users.id
    WHERE
        users.username = $1
   ORDER BY created_at DESC;
   `,
		[username]
	);

	return result.rows;
}

module.exports = {
	getTweets,
	getTweetsByUserName,
};
