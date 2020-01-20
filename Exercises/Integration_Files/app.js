const fs = require('fs')
const readlineSync = require('readline-sync')

let databasePath = "./database.json"

menu();

function menu() {
	console.log("This is a movie application!")
	
	const sentinel = "-1"
	let answer = "";
	while (answer != sentinel) {
		answer = "";
		console.log("1: View all movies")
		console.log("2: Add a new movie")
		console.log("3: Delete a movie")
		console.log("-1: Exit program")

		answer = inputSwitch();
	}

	
}

function inputSwitch() {
	let answer = readlineSync.questionInt("Option?\n");
	let database = fs.readFileSync(databasePath)
	let databaseOutput = JSON.parse(database.toString())
	console.log(answer);

	switch (answer) {
		case 1:
			console.log("View all movies\n")
			console.log(JSON.parse(database.toString()))
			break;
		case 2:
			console.log("Add a movie")
			
			const name = readlineSync.question("Name of the movie?\n")
			const year = readlineSync.questionInt("Year of the movie?\n")
			const director = readlineSync.question("Director of the movie?\n")
			const description = readlineSync.question("Description of the movie?\n")

			const movie = {
				name: name,
				year: year,
				director: director,
				description: description
			}

			databaseOutput.movies.push(movie)
			fs.writeFileSync("./database.json", JSON.stringify(databaseOutput))

			break;
		case 3:
			console.log("Delete a movie")
			let nameOfMovieToDelete = readlineSync.question("Name of movie to delete?\n")

			let movieToDelete = databaseOutput.movies.find(movie => movie.name == nameOfMovieToDelete)

			if (movieToDelete) {
				databaseOutput.movies = databaseOutput.movies.filter(movie => movie.name != nameOfMovieToDelete)
				fs.writeFileSync(databasePath, JSON.stringify(databaseOutput))
			} else {
				console.log(`No movie found called: ${nameOfMovieToDelete}`)
			}
			break;
		case -1:
			console.log("Closing program, bye!")
			break;
		default:
			console.log("Input not valid, try again.")
			break;
	}

	return answer;
	

}