import React, { useState } from 'react';
import axios from 'axios';
// import { axiosInstance } from '../utils/API';
import { formTemplate } from '../template/template';
import { useNavigate } from 'react-router-dom';
import FormTemplate from '../template/formTemplate';
import Button from '../components/Button';

function PartnerForm() {
	// const url = process.env.REACT_APP_API_STRING;
	const url = process.env.REACT_APP_VERCEL_FRONTEND_URL;
	const [error, setError] = useState({});
	const [message, setMessage] = useState('');
	const [businessCheckBox, setBusinessCheckbox] = useState([]);
	const [idCheckBox, setIDCheckBox] = useState([]);
	const [businessCheckBoxState, setBusinessCheckBoxState] = useState(false);
	const [idCheckBoxState, setIDCheckBoxState] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		companyName: '',
		image: '',
		isIndividualCompany: false,
		isProprietorshipCompany: false,
		isPartnershipCompany: false,
		isLimitedCompany: false,
		officeAddress: '',
		email: '',
		website: '',
		officePhone: '',
		mobilePhone: '',
		isDrivingLicense: false,
		isVotersId: false,
		isInternationalPassport: false,
		completed: false,
	});

	const navigate = useNavigate();

	const handleFormFiles = (e, field) => {
		const { files } = e.target;
		setFormData({ ...formData, [field]: files });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		/* if no checkbox is checked */
		if (businessCheckBox.length < 1) {
			setBusinessCheckBoxState(true);
			return;
		}

		/* if multiple checkboxes are checked */
		if (businessCheckBox.length > 1) {
			return;
		}

		/* if no checkbox is checked */
		if (idCheckBox.length < 1) {
			setIDCheckBoxState(true);
			return;
		}

		/*FormData appends all our data we want to send to the backend
		this combines both images and regular data
		*/
		const form = new FormData();
		Object.values(formData.image).forEach((file, index) => {
			form.append('image', file);
		});
		form.append('name', formData.name);
		form.append('surname', formData.surname);
		form.append('companyName', formData.companyName);
		form.append('email', formData.email);
		form.append('isIndividualCompany', formData.isIndividualCompany);
		form.append(
			'isProprietorshipCompany',
			formData.isProprietorshipCompany
		);
		form.append('isPartnershipCompany', formData.isPartnershipCompany);
		form.append('isLimitedCompany', formData.isLimitedCompany);
		form.append('officeAddress', formData.officeAddress);
		form.append('website', formData.website);
		form.append('officePhone', formData.officePhone);
		form.append('mobilePhone', formData.mobilePhone);
		form.append('isDrivingLicense', formData.isDrivingLicense);
		form.append('isVotersId', formData.isVotersId);
		form.append(
			'isInternationalPassport',
			formData.isInternationalPassport
		);
		form.append('completed', formData.completed);

		try {
			setIsLoading(true);
			/* using the url variable above */
			const { data } = await axios.post(`${url}`, form, {
				headers: {
					'content-type': 'multipart/form-data',
				},
			});
			// console.log('get updated data =>', data);
			if (data) {
				setMessage('update successfull...');
				setFormData(data);
				setIsLoading(false);
				navigate('/success');
			}
		} catch (error) {
			// console.log('check error=>', error);
			setError({ error: error.response.data.error.errors });
			setIsLoading(false);
		}
	};

	const handleFormChange = (e, field) => {
		const { value } = e.target;
		setFormData({ ...formData, [field]: value });
	};

	const handleBusinessTypeCheckbox = (e, field) => {
		const { checked } = e.target;
		const checkedBox = [];
		setFormData({ ...formData, [field]: checked });
		if (checked === true) {
			/* allows know checkboxes that have been checked by pushing them into an array */
			checkedBox.push(field);
		} else {
			// console.log('get field =>', businessCheckBox.indexOf(field));
			/* when checkboxes are unchecked */
			setBusinessCheckbox(
				businessCheckBox.splice(businessCheckBox.indexOf(field), 1)
			);
		}
		setBusinessCheckbox([...businessCheckBox, ...checkedBox]);
	};

	const handleIdentificationCheckbox = (e, field) => {
		const { checked } = e.target;
		const checkedIdBox = [];
		setFormData({ ...formData, [field]: checked });
		if (checked) {
			/* allows know checkboxes that have been checked by pushing them into an array */
			checkedIdBox.push(field);
		} else {
			/* when checkboxes are unchecked */
			setIDCheckBox(idCheckBox.splice(idCheckBox.indexOf(field), 1));
		}
		setIDCheckBox([...idCheckBox, ...checkedIdBox]);
	};

	const handleFormCheckbox = (e, field) => {
		const { checked } = e.target;
		setFormData({ ...formData, [field]: checked });
	};

	console.log('get form data =>', formData);
	console.log('get message =>', message);
	console.log('get errors =>', error);
	// console.log('get checkbox =>', businessCheckBox);
	console.log('get id checkbox =>', idCheckBox);

	return (
		<>
			<div className='bg-gray-200'>
				<h1 className='text-3xl pt-3 text-center font-["Source_Serif_Pro"] text-red-500 font-bold underline'>
					AIRTEL SMART CASH CHANNEL PARTNER ONLINE FORM
				</h1>
				<form className='mt-4 pb-4' onSubmit={handleFormSubmit}>
					<FormTemplate
						formTemplateProps={formTemplate.name}
						formDataProps={formData.name}
						handleProps={handleFormChange}
						nameProps='name'
						typeProps='text'
						errorProps={error?.error?.name}
					/>

					<div className='mt-3'>
						<FormTemplate
							formTemplateProps={formTemplate.surname}
							formDataProps={formData.surname}
							handleProps={handleFormChange}
							nameProps='surname'
							typeProps='text'
							errorProps={error?.error?.surname}
						/>
					</div>

					<div className='mt-3'>
						<FormTemplate
							formTemplateProps={formTemplate.companyName}
							formDataProps={formData.companyName}
							handleProps={handleFormChange}
							nameProps='companyName'
							typeProps='text'
							errorProps={error?.error?.companyName}
						/>
					</div>

					<div>
						<p className="mt-4 font-bold px-3 after:content-['*'] after:ml-0.5 after:text-red-500">
							What type of business do you own
						</p>
						{businessCheckBoxState && (
							<h1 className='px-3 text-red-600'>
								Please pick tick a business type
							</h1>
						)}
					</div>
					{businessCheckBox && businessCheckBox.length > 1 && (
						<h1 className='px-3 text-red-600'>
							Please pick tick only one business type
						</h1>
					)}
					<label
						className='px-3 flex mt-4'
						htmlFor='default-checkbox'>
						<span>{formTemplate.isIndividualCompany}</span>
						<input
							id='default-checkbox'
							type='checkbox'
							name='isIndividualCompany'
							value={formData.isIndividualCompany}
							onChange={(e) =>
								handleBusinessTypeCheckbox(
									e,
									'isIndividualCompany'
								)
							}
							className='w-4 h-4 mt-0.5 ml-4 text-blue-600 bg-gray-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
					</label>
					<label
						className='px-3 flex mt-4'
						htmlFor='default-checkbox'>
						<span>{formTemplate.isProprietorshipCompany}</span>
						<input
							id='default-checkbox'
							type='checkbox'
							name='isProprietorshipCompany'
							value={formData.isProprietorshipCompany}
							onChange={(e) =>
								handleBusinessTypeCheckbox(
									e,
									'isProprietorshipCompany'
								)
							}
							className='w-4 h-4 mt-0.5 ml-4 text-blue-600 bg-gray-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
					</label>
					<label
						className='px-3 flex mt-4'
						htmlFor='default-checkbox'>
						<span>{formTemplate.isPartnershipCompany}</span>
						<input
							id='default-checkbox'
							type='checkbox'
							name='isPartnershipCompany'
							value={formData.isPartnershipCompany}
							onChange={(e) =>
								handleBusinessTypeCheckbox(
									e,
									'isPartnershipCompany'
								)
							}
							className='w-4 h-4 mt-0.5 ml-4 text-blue-600 bg-gray-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
					</label>
					<label
						className='px-3 flex mt-4'
						htmlFor='default-checkbox'>
						<span>{formTemplate.isLimitedCompany}</span>
						<input
							id='default-checkbox'
							type='checkbox'
							name='isLimitedCompany'
							value={formData.isLimitedCompany}
							onChange={(e) =>
								handleBusinessTypeCheckbox(
									e,
									'isLimitedCompany'
								)
							}
							className='w-4 h-4 mt-0.5 ml-4 text-blue-600 bg-gray-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
					</label>
					<div>
						<p className="mt-4 font-bold px-3 after:content-['*'] after:ml-0.5 after:text-red-500">
							Form of Identification
						</p>
						{idCheckBoxState && (
							<h1 className='px-3 text-red-600'>
								Please tick a form of id
							</h1>
						)}
					</div>
					<label
						className='px-3 flex mt-4'
						htmlFor='default-checkbox'>
						<span>{formTemplate.isDrivingLicense}</span>
						<input
							id='default-checkbox'
							type='checkbox'
							name='isDrivingLicense'
							value={formData.isDrivingLicense}
							onChange={(e) =>
								handleIdentificationCheckbox(
									e,
									'isDrivingLicense'
								)
							}
							className='w-4 h-4 mt-0.5 ml-4 text-blue-600 bg-gray-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
					</label>
					<label
						className='px-3 flex mt-4'
						htmlFor='default-checkbox'>
						<span>{formTemplate.isVotersId}</span>
						<input
							id='default-checkbox'
							type='checkbox'
							name='isVotersId'
							value={formData.isVotersId}
							onChange={(e) =>
								handleIdentificationCheckbox(e, 'isVotersId')
							}
							className='w-4 h-4 mt-0.5 ml-4 text-blue-600 bg-gray-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
					</label>
					<label
						className='px-3 flex mt-4'
						htmlFor='default-checkbox'>
						<span>{formTemplate.isInternationalPassport}</span>
						<input
							id='default-checkbox'
							type='checkbox'
							name='isInternationalPassport'
							value={formData.isInternationalPassport}
							onChange={(e) =>
								handleIdentificationCheckbox(
									e,
									'isInternationalPassport'
								)
							}
							className='w-4 h-4 mt-0.5 ml-4 text-blue-600 bg-gray-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
					</label>
					<div className='px-3 mt-4'>
						<p className='font-semibold'>
							Please upload a scanned copy of the following
							documents below
						</p>
						<ul className='list-disc list-inside'>
							<li>CAC 7</li>
							<li>CAC 8</li>
							<li>Passport Picture</li>
							<li>Form of Identification ticked above</li>
						</ul>
					</div>
					<label className='block px-3 mt-4'>
						<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
							{formTemplate.documents}
						</span>
						<input
							type='file'
							name='image'
							multiple
							required
							onChange={(e) => handleFormFiles(e, 'image')}
							className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
						/>
					</label>
					{error?.error?.files && (
						<small className='text-red-500 pl-4 font-bold'>
							{error.error.files.message}
						</small>
					)}
					<div className='mt-3'>
						<FormTemplate
							formTemplateProps={formTemplate.officeAddress}
							formDataProps={formData.officeAddress}
							handleProps={handleFormChange}
							nameProps='officeAddress'
							typeProps='text'
							errorProps={error?.error?.officeAddress}
						/>
					</div>

					<div className='mt-3'>
						<FormTemplate
							formTemplateProps={formTemplate.email}
							formDataProps={formData.email}
							handleProps={handleFormChange}
							nameProps='email'
							typeProps='text'
							errorProps={error?.error?.email}
						/>
					</div>

					<div className='mt-3'>
						<FormTemplate
							formTemplateProps={formTemplate.website}
							formDataProps={formData.website}
							handleProps={handleFormChange}
							nameProps='website'
							typeProps='text'
							errorProps={error?.error?.website}
						/>
					</div>

					<label className='block px-3 mt-4'>
						<span className='after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700'>
							{formTemplate.officePhone}
						</span>
						<input
							type='text'
							name='officePhone'
							value={formData.officePhone || ''}
							onChange={(e) => handleFormChange(e, 'officePhone')}
							className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
							placeholder={`Enter your ${formTemplate.officePhone}`}
						/>
					</label>
					<div className='mt-3'>
						<FormTemplate
							formTemplateProps={formTemplate.mobilePhone}
							formDataProps={formData.mobilePhone}
							handleProps={handleFormChange}
							nameProps='mobilePhone'
							typeProps='text'
							errorProps={error?.error?.mobilePhone}
						/>
					</div>

					<p className='mt-4 px-2 font-semibold text-base'>
						Kindly tick the checkbox once form is completed
					</p>
					<label
						className='px-3 flex mt-4'
						htmlFor='default-checkbox'>
						<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
							{formTemplate.completed}
						</span>
						<input
							id='default-checkbox'
							type='checkbox'
							name='completed'
							value={formData.completed}
							required
							onChange={(e) => handleFormCheckbox(e, 'completed')}
							className='w-4 h-4 mt-0.5 ml-4 text-blue-600 bg-gray-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						/>
					</label>
					{error?.error?.completed && (
						<small className='text-red-500 pl-4 font-bold'>
							{error.error.completed.message}
						</small>
					)}
					<Button
						submit='Submit'
						submitting='Submitting...'
						isLoading={isLoading}
					/>
				</form>
			</div>
		</>
	);
}

export default PartnerForm;
