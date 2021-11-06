const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGO_DB_URL } = process.env;
const client = new MongoClient(MONGO_DB_URL, { useUnifiedTopology: true });

const clear = async () => {
	const db = client.db('covid_datas');
	const collection = db.collection('backup');

	throw new Error('ARE YOU SURE?');
	await collection.deleteMany({ lastUpdateInHungary: new Date('1970-01-01T00:00:00.000+00:00') });
	await collection.deleteMany({ lastUpdateInApi: new Date('1970-01-01T00:00:00.000+00:00') });
};

const main = async () => {
	try {
		console.log('Try to connect to database...');
		await client.connect();
		console.log('Connected correctly to server...');
		// it removes everything from the collection...
		await clear();
		console.log('Removed everything from collection...');
	} catch (err) {
		console.log(err.stack);
	} finally {
		await client.close();
		console.log('Database closed.');
	}
}
main().catch(console.dir);
