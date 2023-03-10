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
		<div className='relative px-3'>
			<input
				type={typeProps}
				name={nameProps}
				value={formDataProps || ''}
				onChange={(e) => handleProps(e, nameProps)}
				id={formTemplateProps}
				className='block px-3 pb-2.5 pt-4 w-full text-sm text-gray-600 bg-transparent rounded-lg border-1 border-red-400 appearance-none dark:text-white dark:border-red-400 dark:focus:border-red-400 focus:outline-none focus:ring-0 focus:border-red-400 peer'
				placeholder=' '
			/>
			<label
				htmlFor={formTemplateProps}
				className='absolute text-sm text-red-400 dark:text-red-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-3 peer-focus:px-2 peer-focus:text-red-400 peer-focus:dark:text-red-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-5'>
				<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
					{formTemplateProps}
				</span>
			</label>
			{errorProps && (
				<small className='text-red-500 pl-4 font-bold'>
					{errorProps.message}
				</small>
			)}
		</div>
	);
};

export default FormTemplate;
