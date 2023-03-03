require('dotenv').config();

const connectDB = require('./db/connect');

const Registration = require('./models/Registration');

const jsonRegistrations = require('./registrations.json');

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		await Registration.deleteMany();
		await Registration.create(jsonRegistrations);
		console.log('Success!!!');
		// if data has been added to mongoDB we exit with 0
		process.exit(0);
	} catch (error) {
		console.log(error);
		// if we have an error we exit with 1
		process.exit(1);
	}
};
start();
