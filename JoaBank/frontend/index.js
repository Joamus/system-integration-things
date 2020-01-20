function postMessage(data) {
	if (data.origin == "http://80.210.70.4:3333" && data.data.message) {
		let token = data.data.message;

		header = token.substring(0, token.indexOf('.'))
		payload = token.substring(header.length+1, token.lastIndexOf('.')),
		signature = token.substring(token.lastIndexOf('.')+1, token.length-1)

		header = JSON.parse(atob(header))
		payload = JSON.parse(atob(payload))


		let tokenDecoded = { header, payload, signature }
		console.log(token)
		console.log(tokenDecoded)


		$.ajax({
			url: "http://localhost:5000/balance",
			headers: {'Authorization': `Basic ${token}`},
			contentType: 'application/xml',
			success: function(data, status) {

				let parsedXml = JSON.parse(xml2json(data)).root
				document.getElementById("email").innerHTML = parsedXml.email;
				document.getElementById("balance").innerHTML = parsedXml.balance;

			},
			error: function(error) {},

		})

	
			


	}
}



window.addEventListener("message", postMessage, false)