const readline = require('readline')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./database.db")

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log("This is a movie application! (SQLite)")
menu();

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
	
				let sql = 'SELECT * FROM movie'
	
				db.all(sql, function(err, rows) {
					console.log(rows)
					menu();
				})
				break;
			case "2":
				console.log("Add a movie")
				
				rl.question("Name of the movie?\n", name => {
					rl.question("Year of the movie?\n", year => {
						rl.question("Director of the movie?\n", director => {
							rl.question("Description of the movie?\n", description => {
								db.run("INSERT INTO movie VALUES (?, ?, ?, ?)", [name, year, director, description], (error) => {
									if (error) {
										console.log("Error: " + error)
									}
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
					db.run("DELETE FROM movie WHERE name = ?", [nameOfMovieToDelete], function(error) {
						if (error) {
							console.log(error.message)
						} else {
							console.log(`Row(s) deleted ${this.changes}`)
						}
						menu();

					})
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