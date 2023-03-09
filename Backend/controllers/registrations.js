const Registration = require('../models/Registration');
const uploadToCloudinary = require('../utils/cloudinary');
const adminCloudinary = require('cloudinary').v2.api;
const cloudinary = require('cloudinary').v2;

// get all registrations in the DB (works)
const getRegistrations = async (req, res) => {
	// console.log('get query =>', req.query);
	const {
		fullNamesOfDirector1,
		fullNamesOfDirector2,
		companyName,
		taxIdentificationNumber,
		bvnOfDirector1,
		bvnOfDirector2,
		isIndividualCompany,
		isProprietorshipCompany,
		isPartnershipCompany,
		isLimitedCompany,
		isDrivingLicense,
		isVotersId,
		isInternationalPassport,
		sort,
		fields,
		numericFilters,
	} = req.query;
	const queryObject = {};

	if (fullNamesOfDirector1) {
		queryObject.name = { $regex: fullNamesOfDirector, $options: 'i' };
	}
	if (fullNamesOfDirector2) {
		queryObject.surname = { $regex: surname, $options: 'i' };
	}
	if (companyName) {
		queryObject.companyName = companyName;
	}
	if (taxIdentificationNumber) {
		queryObject.taxIdentificationNumber = taxIdentificationNumber;
	}
	if (bvnOfDirector1) {
		queryObject.bvnOfDirector1 = bvnOfDirector1;
	}
	if (bvnOfDirector2) {
		queryObject.bvnOfDirector2 = bvnOfDirector2;
	}
	if (isIndividualCompany) {
		queryObject.isIndividualCompany =
			isIndividualCompany === 'true' ? true : false;
	}
	if (isProprietorshipCompany) {
		queryObject.isProprietorshipCompany =
			isProprietorshipCompany === 'true' ? true : false;
	}
	if (isPartnershipCompany) {
		queryObject.isPartnershipCompany =
			isPartnershipCompany === 'true' ? true : false;
	}
	if (isLimitedCompany) {
		queryObject.isLimitedCompany =
			isLimitedCompany === 'true' ? true : false;
	}
	if (isDrivingLicense) {
		queryObject.isDrivingLicense =
			isDrivingLicense === 'true' ? true : false;
	}
	if (isVotersId) {
		queryObject.isVotersId = isVotersId === 'true' ? true : false;
	}
	if (isInternationalPassport) {
		queryObject.isInternationalPassport =
			isInternationalPassport === 'true' ? true : false;
	}

	// no await here, find queryobject and assign to result
	let result = Registration.find(queryObject);
	// sort: alphabetical order
	if (sort) {
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}

	//fields: group parameters together
	if (fields) {
		const fieldsList = fields.split(',').join(' ');
		result = result.select(fieldsList);
	}
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	// this is the only place we add await
	const registrations = await result;
	res.status(200).json({ registrations, nbHits: registrations.length });
};

// create registration plus images (works)
// const createRegistration = async (req, res) => {
// 	try {
// 		const newImage = new Image({
// 			imageUrl: [req.body.imageUrl],
// 		});
// 		// await newImage.save();
// 		// res.json(newImage.imageUrl);
// 		const registrations = await Registration.create({
// 			...req.body,
// 			avatar: newImage.imageUrl,
// 			cloudinary_id: newImage.cloudinary_id,
// 		});

// 		res.status(201).json({ registrations });
// 	} catch (error) {
// 		// console.log(error);
// 		// we send our errors to the Frontend
// 		res.status(404).send({ error });
// 	}
// };
const createRegistration = async (req, res) => {
	try {
		const files = req.files;
		console.log('get files => ', files);

		const urls = [];
		for (const file of files) {
			const { path } = file;
			const localFilePath = path;
			const newPath = await uploadToCloudinary(localFilePath);
			urls.push(newPath);
		}

		const imageUrl = urls.map((url) => url?.result.secure_url);
		const cloudinary_id = urls.map((url) => url?.result.public_id);
		console.log("get id's =>", imageUrl, cloudinary_id);

		const registrations = await Registration.create({
			...req.body,
			avatar: imageUrl,
			cloudinary_id,
		});
		res.status(201).json({ registrations });
	} catch (error) {
		// console.log(error);
		// we send our errors to the Frontend
		res.status(404).send({ error });
	}
};

// get a single registration
const getRegistration = async (req, res, next) => {
	console.log('get params id =>', req.params);
	const { id: regID } = req.params;
	// always use _id here and :id in routes
	const singleRegistration = await Registration.findById({ _id: regID });
	res.status(200).json({ singleRegistration });
};

// updating and editing registration and images (works)
const updateRegistration = async (req, res) => {
	try {
		const { id: regID, imgID } = req.params;
		//find user by id
		let registration = await Registration.findById(regID);

		if (!registration) {
			return res.status(404).json({
				success: failure,
				msg: `No registration with this ${registration}`,
			});
		}
		//if registration exist
		let cloudinaryID = registration?.cloudinary_id.find(
			(id) => id === imgID
		);

		for (const img of registration?.images) {
			// console.log('get images =>', img.includes(cloudinaryID));
			registration?.images.splice(registration?.images.indexOf(img), 1);
			registration?.cloudinary_id.splice(
				registration?.cloudinary_id.indexOf(cloudinaryID),
				1
			);

			//delete image from cloudinary array
			await cloudinary.uploader.destroy(cloudinaryID);

			// upload new image
			console.log('get files =>', req.files);
			const files = req.files;

			const urls = [];
			for (const file of files) {
				const { path } = file;
				const localFilePath = path;
				const newPath = await uploadToCloudinary(localFilePath);
				urls.push(newPath);
			}
			const imageUrl = urls.map((url) => url?.result.secure_url);
			const cloudinary_id = urls.map((url) => url?.result.public_id);

			//create model data
			const data = {
				...req.body,
				avatar: [...registration.images, ...imageUrl],
				cloudinary_id: [
					...registration.cloudinary_id,
					...cloudinary_id,
				],
			};
			const updatedRegistration = await Registration.findByIdAndUpdate(
				{ _id: regID },
				data,
				{
					new: true,
				}
			);
			res.status(201).json({ updatedRegistration });
		}
	} catch (error) {
		console.log(error);
	}
};

// Delete registration plus images (works)
const deleteRegistration = async (req, res) => {
	const { id: regID } = req.params;
	try {
		//find user by id
		let registration = await Registration.findById(req.params.id);
		// console.log('get public id =>', ...registration.cloudinary_id);

		// delete with multiple images
		await adminCloudinary.delete_resources(registration.cloudinary_id);

		const deletedRegistration = await Registration.findByIdAndDelete({
			_id: regID,
		});

		res.status(200).json({
			msg: `Registion with name: ${deletedRegistration.name} deleted`,
		});
	} catch (error) {
		console.log(error);
	}
};

// delete single image from images array in cloudinary and mongoDB (works)
const deleteSingleImageCloudinary = async (req, res) => {
	// console.log('get params =>', req.params);
	const { id: regID, imgID } = req.params;
	try {
		//find user by id
		let registration = await Registration.findById(regID);
		// console.log('get registration =>', registration);
		//check if user exist
		if (!registration) {
			return res.status(404).json({
				success: false,
				msg: `No registration with this ${registration}`,
			});
		}
		//if registration exist
		let cloudinaryID = registration?.cloudinary_id.find(
			(id) => id === imgID
		);
		for (const img of registration?.images) {
			// console.log('get images =>', img.includes(cloudinaryID));
			registration?.images.splice(registration?.images.indexOf(img), 1);
			registration?.cloudinary_id.splice(
				registration?.cloudinary_id.indexOf(cloudinaryID),
				1
			);
			//delete image from cloudinary array
			await cloudinary.uploader.destroy(cloudinaryID);
			//create model data
			const data = {
				...req.body,
				avatar: [...registration.images],
				cloudinary_id: [...registration.cloudinary_id],
			};
			//remove registration from DB
			const deletedImgregistration = await Registration.findByIdAndUpdate(
				{ _id: regID },
				data,
				{
					new: true,
				}
			);

			res.status(204).send({
				msg: `${deletedImgregistration.name}'s image has been deleted successfully`,
			});
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getRegistrations,
	createRegistration,
	getRegistration,
	updateRegistration,
	deleteRegistration,
	deleteSingleImageCloudinary,
};
