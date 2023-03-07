import React from 'react';

const FormTemplate = ({
	formTemplateProps,
	formDataProps,
	handleProps,
	typeProps,
	nameProps,
	errorProps,
}) => {
	return (
		<>
			<label className='block px-3'>
				<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
					{formTemplateProps}
				</span>
				<input
					type={typeProps}
					name={nameProps}
					value={formDataProps || ''}
					onChange={(e) => handleProps(e, nameProps)}
					className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1'
					placeholder={`Enter your ${formTemplateProps}`}
				/>
			</label>
			{errorProps && (
				<small className='text-red-500 pl-4 font-bold'>
					{errorProps.message}
				</small>
			)}
		</>
	);
};

export default FormTemplate;
