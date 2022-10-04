require('dotenv').config()

import mysql from 'mysql'

!!process.env.DB_PORT && console.error("ERROR IDENTIFYING DB_PORT")

export const connection = mysql.createPool({
	connectionLimit: 10,
	password: process.env.DB_PASSWORD,
	user: process.env.DB_USERNAME,
	database: process.env.DB_DATABASE,
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || '5555')
})
