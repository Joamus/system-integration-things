const fs = require('fs')
const xml2csv = require('xml2csv')
const json2csv = require('json2csv')
const csv2xml = require('csv2xml')

const xmlPath = 'example.xml'
const jsonPath = 'example.json'
const csvPath = 'example.csv'

const xmlExample = fs.readFileSync(xmlPath)
const jsonExample = fs.readFileSync(jsonPath)
const csvExample = fs.readFileSync(csvPath)

// convertXmlToJson(xmlExample)
// 	.then(result => console.log(JSON.stringify(result)))
// 	.catch(err => console.log(err))

// const json = convertJsonToXml(jsonExample);
// console.log(json)

// convertXmlToCSV('./example.xml', './example_parsed.csv')
// 	.then(csvPath => {
// 		console.log(`XML parsed at file: ${csvPath}`)
// 	})

// console.log(convertJsonToCsv(jsonExample.toString()))	


// convertCsvToJson(csvPath)
// 	.then(result => console.log(result))
// 	.catch(err => console.log(err))

// convertCsvToXml(csvPath)
// 	.then(result => console.log(result))
// 	.catch(err => console.log(err))


function convertXmlToJson(xml) {
	return new Promise((resolve, reject) => {
		const xml2js = require('xml2js');
		const parser = new xml2js.Parser({explicitArray : true});

		parser.parseString(xml.toString(), function(err,result){
			console.dir(JSON.stringify(result));
		});
	})
}

function convertXmlToCSV(xmlPath, newCsvFilePath) {
	return new Promise((resolve, reject) => {
		xml2csv(
			{
			  xmlPath: xmlPath,
			  csvPath: newCsvFilePath,
			  rootXMLElement: 'item',
			  headerMap: [
				['name', 'name', 'string', 'item'],
				['year', 'year', 'integer', 'item'],
				['director', 'director', 'string', 'item'],
				['description', 'description', 'string', 'item'],
			  ]
			},
			function (err, info) {
			  if (err) { 
					reject(err) 
				} else {
					resolve(newCsvFilePath)
				}	
			  // Done!
			}
		  )
	})	
}

function convertJsonToXml(json) {
	const js2xml = require('js2xml').Js2Xml
	const json2xml = new js2xml("root", JSON.parse(json))
	return json2xml.toString()

}

function convertJsonToCsv(json) {
	const { parse } = require('json2csv');
 
	const fields = ['name', 'year', 'director', 'description'];
	const opts = { fields };

	json = JSON.parse(json)
	try {
		const csv = parse(json, opts);
		return csv
	} catch (err) {
		console.error(err);
	}

}

function convertCsvToJson(csvPath) {
	return new Promise((resolve, reject) => {
		const csv = require('csvtojson')
		csv()
		.fromFile(csvPath)
		.then(json => {
			resolve(json)
		})
		.catch(err => reject(err))
	})

}

function convertCsvToXml(csvFilePath) {
	return new Promise((resolve, reject) => {
		convertCsvToJson(csvFilePath)
		.then(result => {
			resolve(convertJsonToXml(JSON.stringify(result)))
		})
		.catch(err => reject(err))
	})
	
}