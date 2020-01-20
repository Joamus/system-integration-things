const readline = require('readline')
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb://localhost:27017/";
let dbo;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

MongoClient.connect(mongoUrl, { useUnifiedTopology: true },  function(err, db) {
	if (err) throw err;
	console.log("Database connected!");
	dbo = db.db("movieApp");
	console.log("This is a movie application! (SQLite)")

	menu();

  });

function menu() {
	console.log("1: View all movies")
	console.log("2: Add a new movie")
	console.log("3: Delete a movie")
	console.log("-1: Exit program")
	inputSwitch();
}

function inputSwitch() {
	rl.question("Option?\n", (answer) => {
		switch (answer) {
			case "1":
				console.log("View all movies\n")
	
				dbo.collection("movies").find({}).toArray()
					.then(result => {
						console.log(result)
					})
					.catch(error => {
						console.log("Error: " + error)
						
					})
					.finally(() => menu())
				break;
			case "2":
				console.log("Add a movie")
				
				rl.question("Name of the movie?\n", name => {
					rl.question("Year of the movie?\n", year => {
						rl.question("Director of the movie?\n", director => {
							rl.question("Description of the movie?\n", description => {
								dbo.collection("movies").insertOne({name: name, year: year, director: director, description: description})
									.then(() => console.log("Movie added"))
									.catch(error => {
										console.log("Error: " + error)

									}).finally(() => {
										menu();
									}) 
								})

							})
						})
					})
				
				break;
			case "3":
				console.log("Delete a movie")
				rl.question("Name of movie to delete?\n", nameOfMovieToDelete => {
					dbo.collection("movies").deleteOne({name: nameOfMovieToDelete})
						.then(result => {
							console.log(`Movie(s) deleted: ${result.deletedCount}`)
						})
						.catch(err => {
							console.log("Error: " + err)
						})
						.finally(() => menu())
					})
				
				break;
			case "-1":
				console.log("Closing program, bye!")
				process.exit()
				break;
			default:
				console.log("Input not valid, try again.")
				menu();
				break;
		}
	
		

	});
	
}