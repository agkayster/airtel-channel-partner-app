const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'please fill in your name'],
		trim: true,
		maxLength: [20, 'name must not be more than 20 chanracters'],
	},
	surname: {
		type: String,
		required: [true, 'please fill in your surname'],
		trim: true,
		maxLength: [20, 'name must not be more than 20 chanracters'],
	},
	companyName: {
		type: String,
		required: [true, 'please fill in the company name'],
	},
	avatar: {
		type: [String],
		required: [true, 'please upload all neccessary files'],
	},
	cloudinary_id: {
		type: [String],
	},
	isIndividualCompany: {
		type: Boolean,
		default: false,
	},
	isProprietorshipCompany: {
		type: Boolean,
		default: false,
	},
	isPartnershipCompany: {
		type: Boolean,
		default: false,
	},
	isLimitedCompany: {
		type: Boolean,
		default: false,
	},
	officeAddress: {
		type: String,
		required: [true, 'please fill in the office address'],
	},
	email: {
		type: String,
		required: [true, 'please fill in the email'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide a valid email',
		],
		unique: true,
	},
	website: {
		type: String,
		required: [true, 'please fill in the website address'],
	},
	officePhone: {
		type: Number,
	},
	mobilePhone: {
		type: Number,
		required: [true, 'please fill in the mobile phone number'],
	},
	isDrivingLicense: {
		type: Boolean,
		default: false,
	},
	isVotersId: {
		type: Boolean,
		default: false,
	},
	isInternationalPassport: {
		type: Boolean,
		default: false,
	},
	createdAt: { type: Date, default: Date.now() },
	completed: {
		type: Boolean,
		default: false,
		required: [true, 'please tick checkbox to show completion'],
	},
});

module.exports = mongoose.model('Registration', RegistrationSchema);
