function postMessage(data) {
	if (data.origin == "http://80.210.70.4:3333" && data.data.message) {
		let token = data.data.message;

		axios({
			url: 'http://localhost:5001/taxes',
			method: 'GET',
			headers: {'Authorization': `Bearer ${token}`},
			contentType: 'application/json',
		}).then(response => {
			document.getElementById("email").innerHTML = response.data.email
			document.getElementById("taxes").innerHTML = response.data.taxes

			console.log('Success')
			$("#myModal").modal("hide")
		})
		.catch(error => { console.log(error) })
	}
}

window.addEventListener("message", postMessage, false)