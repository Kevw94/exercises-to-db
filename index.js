import axios from 'axios';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const dbName = 'coacheta';

const http = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'X-RapidAPI-Key': process.env.API_KEY,
		'X-RapidAPI-Host': process.env.API_HOST
	}
})

console.log(process.env.API_KEY)


async function main() {
	const data = await http.get('/exercises?limit=20000').then((res) => res.data)

	await client.connect();
	console.log('Connected successfully to server');
	const db = client.db(dbName);
	const collection = db.collection('fitness-exercises');
	data.forEach(element => {
		collection.insertOne(element)
	});
}

main();