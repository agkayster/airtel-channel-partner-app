const cloudinary = require('cloudinary').v2;
//for multiple uploads we require dotenv
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

cloudinary.config({
	cloud_name: 'ejikedinary',
	api_key: '861751884351421',
	api_secret: 'BIX7B97pUfgZuXGbaL6VGeOZAOA',
});

const uploadToCloudinary = async (localFilePath) => {
	// const mainFolderName = 'main';

	// const filePathOnCloudinary = mainFolderName + '/' + localFilePath;

	return cloudinary.uploader
		.upload(localFilePath)
		.then((result) => {
			fs.unlinkSync(localFilePath);
			return {
				message: 'Images uploaded successfully',
				result,
			};
		})
		.catch((error) => {
			fs.unlinkSync(localFilePath);
			return { message: 'Failed to upload' };
		});
};
module.exports = uploadToCloudinary;
