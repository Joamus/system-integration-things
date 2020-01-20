const express = require('express')
const app = express();
const cors = require('cors')
const jwt = require('./web-tokens')
app.use(cors())
app.disable('etag');

const serverPort = 5001;
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb://localhost:27017/skat";


MongoClient.connect(mongoUrl, { useUnifiedTopology: true },  function(err, db) {
	if (err) throw err;
	console.log("Database connected!");
	const dbo = db.db("skat");

	main(dbo);

  });

function tokenMiddleWare(req, res, next) {
	if (req.headers['authorization']) {
		header = req.headers['authorization']
		const token = header.substring(header.indexOf(' ')+1, header.length)
		const tokenData = jwt.verifyToken(token)
		if (tokenData) {
			res.locals.user = tokenData
			next()
		} else {
			res.status(400).json({ message: "Token not authorized" })
		}
	} else {
		res.status(400).json({ message: "No token provided" })
	}

}

app.use(tokenMiddleWare)
  

function main(db) {

	app.get('/taxes', (req, res) => {
		db.collection("users").findOne({ email: res.locals.user.email })
			.then(result => {
				res.send(result)
			})
			.catch(error => {
				res.status(404).json({ message: "User not found" })
			})
	})

	app.listen(serverPort, () => {
		console.log(`Server listening on ${serverPort}`)
	})
}