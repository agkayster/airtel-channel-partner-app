import React, { useState } from 'react';
import axios from 'axios';
// import { axiosInstance } from '../utils/API';
import { formTemplate } from '../template/template';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	companyRequirements,
	signatoryRequirements,
} from '../template/template';
// import { signatoryRequirements } from '../template/template';
import SelectTemplate from '../template/selectTitleTemplate';
import SelectGenderTemplate from '../template/selectGenderTemplate';
import FormTemplate from '../template/formTemplate';
import CheckBoxTemplate from '../template/checkboxTemplate';
import Button from '../components/Button';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faIndustry } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { faRegistered } from '@fortawesome/free-solid-svg-icons';

function PartnerForm() {
	const url = process.env.REACT_APP_VERCEL_FRONTEND_URL;
	const [error, setError] = useState({});
	const [message, setMessage] = useState('');
	const [businessCheckBox, setBusinessCheckbox] = useState([]);
	const [idCheckBox, setIDCheckBox] = useState([]);
	const [businessCheckBoxState, setBusinessCheckBoxState] = useState(false);
	const [idCheckBoxState, setIDCheckBoxState] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState({
		fullNamesOfDirector1: '',
		fullNamesOfDirector2: '',
		taxIdentificationNumber: '',
		bvnOfDirector1: '',
		bvnOfDirector2: '',
		title1: 'Mr.',
		title2: 'Mr.',
		gender1: 'Male',
		gender2: 'Male',
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

	// Upload files input //
	const handleFormFiles = (e, field) => {
		const { files } = e.target;
		setFormData({ ...formData, [field]: files });
	};

	// Handle Form submit //
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
		form.append('fullNamesOfDirector1', formData.fullNamesOfDirector1);
		form.append('fullNamesOfDirector2', formData.fullNamesOfDirector2);
		form.append('title1', formData.title1);
		form.append('title2', formData.title2);
		form.append('gender1', formData.gender1);
		form.append('gender2', formData.gender2);
		form.append(
			'taxIdentificationNumber',
			formData.taxIdentificationNumber
		);
		form.append('bvnOfDirector1', formData.bvnOfDirector1);
		form.append('bvnOfDirector2', formData.bvnOfDirector2);
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

	// Inputs //
	const handleFormChange = (e, field) => {
		const { value } = e.target;
		setFormData({ ...formData, [field]: value });
	};

	// Type of business checkbox //
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

	// Form of Identification checkbox //
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

	// Complete checkbox //
	const handleFormCheckbox = (e, field) => {
		const { checked } = e.target;
		setFormData({ ...formData, [field]: checked });
	};

	// Select dropdown //
	const handleSelect = (e, field) => {
		const { value } = e.target;
		setFormData({ ...formData, [field]: value });
	};

	console.log('get form data =>', formData);
	console.log('get message =>', message);
	console.log('get errors =>', error);
	// console.log('get checkbox =>', businessCheckBox);
	console.log('get id checkbox =>', idCheckBox);

	return (
		<>
			<div className='bg-["#FFFAFA"]'>
				<h1 className='text-3xl pt-3 text-center font-["Source_Serif_Pro"] text-red-500 font-bold underline'>
					AIRTEL SMART CASH CHANNEL PARTNER ONLINE FORM
				</h1>
				<form className='mt-4 pb-4' onSubmit={handleFormSubmit}>
					{/* do not go below this */}
					<div className='relative'>
						<div className='absolute inset-y-0 right-10 flex items-center pl-3 pointer-events-none'>
							<FontAwesomeIcon
								icon={faRegistered}
								style={{ color: 'red' }}
							/>
						</div>
						<FormTemplate
							formTemplateProps={formTemplate.companyName}
							formDataProps={formData.companyName}
							handleProps={handleFormChange}
							nameProps='companyName'
							typeProps='text'
							errorProps={error?.error?.companyName}
						/>
					</div>
					<div className='relative mt-3'>
						<div className='absolute inset-y-0 right-10 flex items-center pl-3 pointer-events-none'>
							<FontAwesomeIcon
								icon={faFileLines}
								style={{ color: 'red' }}
							/>
						</div>
						<FormTemplate
							formTemplateProps={
								formTemplate.taxIdentificationNumber
							}
							formDataProps={formData.taxIdentificationNumber}
							handleProps={handleFormChange}
							nameProps='taxIdentificationNumber'
							typeProps='text'
							errorProps={error?.error?.taxIdentificationNumber}
						/>
					</div>
					<SelectTemplate
						htmlForProps='title1'
						labelProps='Title:'
						idProps='title1'
						nameProps='selectedTitle1'
						formDataProps={formData.title1}
						handleProps={handleSelect}
					/>
					<div className='relative mt-3'>
						<div className='absolute inset-y-0 right-10 flex items-center pl-3 pointer-events-none'>
							<FontAwesomeIcon
								icon={faCircleUser}
								style={{ color: 'red' }}
							/>
						</div>
						<FormTemplate
							formTemplateProps={
								formTemplate.fullNamesOfDirector1
							}
							formDataProps={formData.fullNamesOfDirector1}
							handleProps={handleFormChange}
							nameProps='fullNamesOfDirector1'
							typeProps='text'
							errorProps={error?.error?.fullNamesOfDirector1}
						/>
					</div>
					<SelectGenderTemplate
						htmlForProps='gender1'
						labelProps='Gender:'
						idProps='gender1'
						nameProps='selectedGender1'
						formDataProps={formData.gender1}
						handleProps={handleSelect}
					/>
					<SelectTemplate
						htmlForProps='title2'
						labelProps='Title:'
						idProps='title2'
						nameProps='selectedTitle2'
						formDataProps={formData.title2}
						handleProps={handleSelect}
					/>
					<div className='mt-3 relative'>
						<div className='absolute inset-y-0 right-10 flex items-center pl-3 pointer-events-none'>
							<FontAwesomeIcon
								icon={faCircleUser}
								style={{ color: 'red' }}
							/>
						</div>
						<FormTemplate
							formTemplateProps={
								formTemplate.fullNamesOfDirector2
							}
							formDataProps={formData.fullNamesOfDirector2}
							handleProps={handleFormChange}
							nameProps='fullNamesOfDirector2'
							typeProps='text'
							errorProps={error?.error?.fullNamesOfDirector2}
						/>
					</div>
					<SelectGenderTemplate
						htmlForProps='gender2'
						labelProps='Gender:'
						idProps='gender2'
						nameProps='selectedGender2'
						formDataProps={formData.gender2}
						handleProps={handleSelect}
					/>
					<div className='mt-5 relative'>
						<div className='absolute inset-y-0 right-10 flex items-center pl-3 pointer-events-none'>
							<FontAwesomeIcon
								icon={faThumbsUp}
								style={{ color: 'red' }}
							/>
						</div>
						<FormTemplate
							formTemplateProps={formTemplate.bvnOfDirector1}
							formDataProps={formData.bvnOfDirector1}
							handleProps={handleFormChange}
							nameProps='bvnOfDirector1'
							typeProps='text'
							errorProps={error?.error?.bvnOfDirector1}
						/>
					</div>
					<div className='mt-3 relative'>
						<div className='absolute inset-y-0 right-10 flex items-center pl-3 pointer-events-none'>
							<FontAwesomeIcon
								icon={faThumbsUp}
								style={{ color: 'red' }}
							/>
						</div>
						<FormTemplate
							formTemplateProps={formTemplate.bvnOfDirector2}
							formDataProps={formData.bvnOfDirector2}
							handleProps={handleFormChange}
							nameProps='bvnOfDirector2'
							typeProps='text'
							errorProps={error?.error?.bvnOfDirector2}
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
					<CheckBoxTemplate
						formTeplateProps={formTemplate.isIndividualCompany}
						formDataProps={formData.isIndividualCompany}
						handleProps={handleBusinessTypeCheckbox}
						htmlForProps='default-checkbox'
						idProps='default-checkbox'
						nameProps='isIndividualCompany'
						typeProps='checkbox'
					/>

					<CheckBoxTemplate
						formTeplateProps={formTemplate.isProprietorshipCompany}
						formDataProps={formData.isProprietorshipCompany}
						handleProps={handleBusinessTypeCheckbox}
						htmlForProps='default-checkbox'
						idProps='default-checkbox'
						nameProps='isProprietorshipCompany'
						typeProps='checkbox'
					/>

					<CheckBoxTemplate
						formTeplateProps={formTemplate.isPartnershipCompany}
						formDataProps={formData.isPartnershipCompany}
						handleProps={handleBusinessTypeCheckbox}
						htmlForProps='default-checkbox'
						idProps='default-checkbox'
						nameProps='isPartnershipCompany'
						typeProps='checkbox'
					/>

					<CheckBoxTemplate
						formTeplateProps={formTemplate.isLimitedCompany}
						formDataProps={formData.isLimitedCompany}
						handleProps={handleBusinessTypeCheckbox}
						htmlForProps='default-checkbox'
						idProps='default-checkbox'
						nameProps='isLimitedCompany'
						typeProps='checkbox'
					/>

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
					<CheckBoxTemplate
						formTeplateProps={formTemplate.isDrivingLicense}
						formDataProps={formData.isDrivingLicense}
						handleProps={handleIdentificationCheckbox}
						htmlForProps='default-checkbox'
						idProps='default-checkbox'
						nameProps='isDrivingLicense'
						typeProps='checkbox'
					/>

					<CheckBoxTemplate
						formTeplateProps={formTemplate.isVotersId}
						formDataProps={formData.isVotersId}
						handleProps={handleIdentificationCheckbox}
						htmlForProps='default-checkbox'
						idProps='default-checkbox'
						nameProps='isVotersId'
						typeProps='checkbox'
					/>

					<CheckBoxTemplate
						formTeplateProps={formTemplate.isInternationalPassport}
						formDataProps={formData.isInternationalPassport}
						handleProps={handleIdentificationCheckbox}
						htmlForProps='default-checkbox'
						idProps='default-checkbox'
						nameProps='isInternationalPassport'
						typeProps='checkbox'
					/>

					<div className='px-3 mt-4'>
						<p className='font-semibold'>
							Please upload a scanned copy of the following
							documents below. Documents must be in PDF or image
							(e.g .pdf, .jpg,.jpeg):
						</p>
						<h1 className='font-bold mt-4'>COMPANY REQUIREMENTS</h1>
						<ul className='list-disc list-inside'>
							{companyRequirements.map(({ id, requirement }) => (
								<li key={id}>{requirement}</li>
							))}
						</ul>
						<h1 className='font-bold mt-4'>
							SIGNATORY REQUIREMENTS
						</h1>
						<ul className='list-disc list-inside'>
							{signatoryRequirements.map(
								({ id, requirement }) => (
									<li key={id}>{requirement}</li>
								)
							)}
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
							className='mt-1 px-3 py-2 bg-white border shadow-sm border-red-400 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
						/>
					</label>
					{error?.error?.files && (
						<small className='text-red-500 pl-4 font-bold'>
							{error.error.files.message}
						</small>
					)}
					<div className='mt-3 relative'>
						<div className='absolute inset-y-0 right-10 flex items-center pl-3 pointer-events-none'>
							<FontAwesomeIcon
								icon={faIndustry}
								style={{ color: 'red' }}
							/>
						</div>
						<FormTemplate
							formTemplateProps={formTemplate.officeAddress}
							formDataProps={formData.officeAddress}
							handleProps={handleFormChange}
							nameProps='officeAddress'
							typeProps='text'
							errorProps={error?.error?.officeAddress}
						/>
					</div>
					<div className='mt-3 relative'>
						<div className='absolute inset-y-0 right-10 flex items-center pl-3 pointer-events-none'>
							<FontAwesomeIcon
								icon={faAt}
								style={{ color: 'red' }}
							/>
						</div>
						<FormTemplate
							formTemplateProps={formTemplate.email}
							formDataProps={formData.email}
							handleProps={handleFormChange}
							nameProps='email'
							typeProps='text'
							errorProps={error?.error?.email}
						/>
					</div>
					<div className='mt-3 relative'>
						<div className='absolute inset-y-0 right-10 flex items-center pl-3 pointer-events-none'>
							<FontAwesomeIcon
								icon={faGlobe}
								style={{ color: 'red' }}
							/>
						</div>
						<FormTemplate
							formTemplateProps={formTemplate.website}
							formDataProps={formData.website}
							handleProps={handleFormChange}
							nameProps='website'
							typeProps='text'
							errorProps={error?.error?.website}
						/>
					</div>
					<div className='relative px-3 mt-4'>
						<div className='absolute inset-y-0 right-10 flex items-center pl-3 pointer-events-none'>
							<FontAwesomeIcon
								icon={faPhone}
								style={{ color: 'red' }}
							/>
						</div>
						<input
							type='text'
							name='officePhone'
							value={formData.officePhone || ''}
							onChange={(e) => handleFormChange(e, 'officePhone')}
							id='floating_officePhone'
							className='block px-3 pb-2.5 pt-4 w-full text-sm text-gray-600 bg-transparent rounded-lg border-1 border-red-400 appearance-none dark:text-white dark:border-red-400 dark:focus:border-red-400 focus:outline-none focus:ring-0 focus:border-red-400 peer'
							placeholder=' '
						/>
						<label
							htmlFor='floating_officePhone'
							className='absolute text-sm text-red-400 dark:text-red-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-3 peer-focus:px-2 peer-focus:text-red-400 peer-focus:dark:text-red-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-5'>
							<span className='block text-sm font-medium text-slate-700'>
								{formTemplate.officePhone}
							</span>
						</label>
						{error?.error?.companyName && (
							<small className='text-red-500 pl-4 font-bold'>
								{error?.error?.officePhone.message}
							</small>
						)}
					</div>
					<div className='mt-3 relative'>
						<div className='absolute inset-y-0 right-10 flex items-center pl-3 pointer-events-none'>
							<FontAwesomeIcon
								icon={faPhone}
								style={{ color: 'red' }}
							/>
						</div>
						<FormTemplate
							formTemplateProps={formTemplate.mobilePhone}
							formDataProps={formData.mobilePhone}
							handleProps={handleFormChange}
							nameProps='mobilePhone'
							typeProps='text'
							errorProps={error?.error?.mobilePhone}
						/>
					</div>
					<div>
						<p className='px-3 py-3'>
							I hereby certify that information provided in this
							form is complete, true and to the best of my
							knowledge
						</p>
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
