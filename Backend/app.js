const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const registrationsRouter = require('./routes/registrations');
const connectDB = require('./db/connect');

require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/errorHandler');
const port = require('./config/environment');

app.use(bodyParser.urlencoded({ extended: false }));

// middleware
app.use(express.json());
app.use(cors(app));
// default route must always be above app.use(notFound)
app.get('/', (req, res) => {
	res.send('Airtel Registration Portal');
});

//Routes
app.use('/api/v1/registrations', registrationsRouter);
// non-existent routes
app.use(notFound);
// catching errors after asyncwrapper
app.use(errorHandler);

const start = async () => {
	try {
		//connect to our mongo DB before app server kicks in
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () =>
			console.log(`Server up and running on port ${port}`)
		);
	} catch (error) {
		console.log(error);
	}
};
start();
