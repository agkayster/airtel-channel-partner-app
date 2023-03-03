const express = require('express');
const upload = require('../utils/multer');
const router = express.Router();

const {
	getRegistrations,
	createRegistration,
	getRegistration,
	updateRegistration,
	deleteRegistration,
	deleteSingleImageCloudinary,
} = require('../controllers/registrations');

// get all registrations
router.get('/', getRegistrations);

// create registration
router.post('/', upload.array('image', 15), createRegistration);

// get particular registration
router.get('/:id', getRegistration);

//editing, updating or replacing items in a registration
router.put('/:id/:imgID', upload.array('image'), updateRegistration);

// delete registration and images
router.delete('/:id', deleteRegistration);

// deleting only image and url link from the arrays under a registration in MongoDB
router.delete('/:id/:imgID', deleteSingleImageCloudinary);

module.exports = router;
