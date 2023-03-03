import React, { useState } from 'react';
import { axiosInstance } from './utils/API';
import { formTemplate } from './template/template';
import { useLocalStorage } from './utils/useLocalStorage';

function App() {
	const url = process.env.REACT_APP_API_STRING;
	const [error, setError] = useState({});
	const [message, setMessage] = useState('');
	const [businessCheckBox, setBusinessCheckbox] = useState([]);
	const [formCheckBox, setFormCheckBox] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useLocalStorage('formData', {
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

	const handleFormFiles = (e, field) => {
		const { files } = e.target;
		setFormData({ ...formData, [field]: files });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		if (businessCheckBox.length > 1) {
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
			const { data } = await axiosInstance.post(`${url}`, form, {
				headers: {
					'content-type': 'multipart/form-data',
					// 'Access-Control-Allow-Origin': 'http://localhost:5000',
					// 'Access-Control-Allow-Methods':
					// 	'GET, POST, OPTIONS, PUT, PATCH, DELETE',
				},
			});
			console.log('get updated data =>', data);
			if (data) {
				setMessage('update successfull...');
				setFormData(data);
				setIsLoading(false);
			}
		} catch (error) {
			setError({ error: error.response.data.error.errors });
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
			checkedBox.push(field);
		} else {
			console.log('get field =>', businessCheckBox.indexOf(field));
			setBusinessCheckbox(
				businessCheckBox.splice(businessCheckBox.indexOf(field), 1)
			);
		}
		setBusinessCheckbox([...businessCheckBox, ...checkedBox]);
	};

	const handleIdentificationCheckbox = (e, field) => {
		const { checked } = e.target;
		setFormData({ ...formData, [field]: checked });
	};

	const handleFormCheckbox = (e, field) => {
		const { checked } = e.target;
		setFormData({ ...formData, [field]: checked });
	};

	// useEffect(() => {
	// 	(async () => {
	// 		let res = await axiosInstance.get(`/api/v1/registrations`);
	// 		setData(res.data);
	// 	})();
	// }, []);

	console.log('get form data =>', formData);
	console.log('get message =>', message);
	console.log('get errors =>', error);
	console.log('get checkbox =>', businessCheckBox);

	if (isLoading) {
		<h1>Loading...</h1>;
	}
	return (
		<div className='bg-gray-200'>
			<h1 className='text-3xl pt-3 text-center font-["Source_Serif_Pro"] text-red-500 font-bold underline'>
				AIRTEL CHANNEL PARTNER SMART CASH ONLINE FORM
			</h1>
			<form className='mt-4 pb-4' onSubmit={handleFormSubmit}>
				<label className='block px-3'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.name}
					</span>
					<input
						type='text'
						name='name'
						value={formData.name || ''}
						onChange={(e) => handleFormChange(e, 'name')}
						className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
						placeholder={`Enter your ${formTemplate.name}`}
					/>
				</label>
				{error?.error?.name && (
					<small className='text-red-500 pl-4 font-bold'>
						{error.error.name.message}
					</small>
				)}
				<label className='block px-3 mt-4'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.surname}
					</span>
					<input
						type='text'
						name='surname'
						value={formData.surname || ''}
						onChange={(e) => handleFormChange(e, 'surname')}
						className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
						placeholder={`Enter your ${formTemplate.surname}`}
					/>
				</label>
				{error?.error?.surname && (
					<small className='text-red-500 pl-4 font-bold'>
						{error.error.surname.message}
					</small>
				)}
				<label className='block px-3 mt-4'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.companyName}
					</span>
					<input
						type='text'
						name='companyName'
						value={formData.companyName || ''}
						onChange={(e) => handleFormChange(e, 'companyName')}
						className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
						placeholder={`Enter your ${formTemplate.companyName}`}
					/>
				</label>
				{error?.error?.companyName && (
					<small className='text-red-500 pl-4 font-bold'>
						{error.error.companyName.message}
					</small>
				)}
				<p className='mt-4 px-3'>What type of business do you own</p>
				{businessCheckBox && businessCheckBox.length > 1 && (
					<h1 className='px-3 text-red-600'>
						Please pick tick only one business type
					</h1>
				)}
				<label className='px-3 flex mt-4' htmlFor='default-checkbox'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.isIndividualCompany}
					</span>
					<input
						id='default-checkbox'
						type='checkbox'
						name='isIndividualCompany'
						value={formData.isIndividualCompany}
						onChange={(e) =>
							handleBusinessTypeCheckbox(e, 'isIndividualCompany')
						}
						className='w-4 h-4 mt-0.5 ml-4 text-blue-600 bg-gray-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
					/>
				</label>
				<label className='px-3 flex mt-4' htmlFor='default-checkbox'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.isProprietorshipCompany}
					</span>
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
				<label className='px-3 flex mt-4' htmlFor='default-checkbox'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.isPartnershipCompany}
					</span>
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
				<label className='px-3 flex mt-4' htmlFor='default-checkbox'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.isLimitedCompany}
					</span>
					<input
						id='default-checkbox'
						type='checkbox'
						name='isLimitedCompany'
						value={formData.isLimitedCompany}
						onChange={(e) =>
							handleBusinessTypeCheckbox(e, 'isLimitedCompany')
						}
						className='w-4 h-4 mt-0.5 ml-4 text-blue-600 bg-gray-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
					/>
				</label>
				<p className='mt-4 px-3'>Form of Identification</p>
				<label className='px-3 flex mt-4' htmlFor='default-checkbox'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.isDrivingLicense}
					</span>
					<input
						id='default-checkbox'
						type='checkbox'
						name='isDrivingLicense'
						value={formData.isDrivingLicense}
						onChange={(e) =>
							handleIdentificationCheckbox(e, 'isDrivingLicense')
						}
						className='w-4 h-4 mt-0.5 ml-4 text-blue-600 bg-gray-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
					/>
				</label>
				<label className='px-3 flex mt-4' htmlFor='default-checkbox'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.isVotersId}
					</span>
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
				<label className='px-3 flex mt-4' htmlFor='default-checkbox'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.isInternationalPassport}
					</span>
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
					<p>
						Please upload a scanned copy of the following documents
						below
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

				<label className='block px-3 mt-4'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.officeAddress}
					</span>
					<input
						type='text'
						name='officeAddress'
						value={formData.officeAddress || ''}
						onChange={(e) => handleFormChange(e, 'officeAddress')}
						className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
						placeholder={`Enter your ${formTemplate.officeAddress}`}
					/>
				</label>
				{error?.error?.officeAddress && (
					<small className='text-red-500 pl-4 font-bold'>
						{error.error.officeAddress.message}
					</small>
				)}
				<label className='block px-3 mt-4'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.email}
					</span>
					<input
						type='text'
						name='email'
						value={formData.email || ''}
						onChange={(e) => handleFormChange(e, 'email')}
						className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
						placeholder={`Enter your ${formTemplate.email}`}
					/>
				</label>
				{error?.error?.email && (
					<small className='text-red-500 pl-4 font-bold'>
						{error.error.email.message}
					</small>
				)}
				<label className='block px-3 mt-4'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.website}
					</span>
					<input
						type='text'
						name='website'
						value={formData.website || ''}
						onChange={(e) => handleFormChange(e, 'website')}
						className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
						placeholder={`Enter your ${formTemplate.website}`}
					/>
				</label>
				{error?.error?.website && (
					<small className='text-red-500 pl-4 font-bold'>
						{error.error.website.message}
					</small>
				)}
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
				<label className='block px-3 mt-4'>
					<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
						{formTemplate.mobilePhone}
					</span>
					<input
						type='text'
						name='mobilePhone'
						value={formData.mobilePhone || ''}
						onChange={(e) => handleFormChange(e, 'mobilePhone')}
						className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
						placeholder={`Enter your ${formTemplate.mobilePhone}`}
					/>
				</label>
				{error?.error?.mobilePhone && (
					<small className='text-red-500 pl-4 font-bold'>
						{error.error.mobilePhone.message}
					</small>
				)}
				<p className='mt-4 px-3'>
					Kindly tick the checkbox once form is completed
				</p>
				<label className='px-3 flex mt-4' htmlFor='default-checkbox'>
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
				<div className='flex flex-col items-center justify-center mt-4'>
					<button
						type='submit'
						className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default App;
