import React from 'react';

const CheckBoxTemplate = ({
	formTeplateProps,
	formDataProps,
	handleProps,
	htmlForProps,
	idProps,
	nameProps,
	typeProps,
}) => {
	return (
		<>
			<label className='px-3 flex mt-4' htmlFor={htmlForProps}>
				<span>{formTeplateProps}</span>
				<input
					id={idProps}
					type={typeProps}
					name={nameProps}
					value={formDataProps}
					onChange={(e) => handleProps(e, nameProps)}
					className='w-4 h-4 mt-0.5 ml-4 text-blue-600 bg-gray-100 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
				/>
			</label>
		</>
	);
};

export default CheckBoxTemplate;
