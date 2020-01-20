'use strict'

const fs = require('fs')
const jwt = require('jsonwebtoken')

module.exports.generateToken = function(payload) {

    let secret = fs.readFileSync('./auth/secret.key', 'utf8')

    let signOptions = {
        issuer: 'SKAT',
        audience: 'http://skat.dk',
        algorithm: "RS256"
    }

    let token = jwt.sign(payload, secret, null)
    return token;

}

module.exports.verifyToken = function(token) {

    let secret = fs.readFileSync('./auth/secret.key', 'utf8')
    

    let verifyOptions = {
        issuer: 'SKAT',
        audience: 'http://skat.dk',
        algorithm: "RS256"
    }

    let legit = jwt.verify(token, secret, null)
    return legit;

}

module.exports.decode = jwt.decode;