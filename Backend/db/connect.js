const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = (url) => {
	return mongoose
		.connect(url)
		.then(() => console.log('connected to MONGODB'))
		.catch((err) => console.log(err));
};
module.exports = connectDB;
