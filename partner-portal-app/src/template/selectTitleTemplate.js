import React from 'react';
import { titleRequirements } from './template';

const SelectTemplate = ({
	htmlForProps,
	labelProps,
	idProps,
	nameProps,
	formDataProps,
	handleProps,
}) => {
	return (
		<>
			<label
				htmlFor={htmlForProps}
				className='after:content-["*"] after:ml-0.5 after:text-red-500 block mb-2 px-3 mt-3 text-sm font-medium text-gray-900 dark:text-white'>
				{labelProps}
			</label>
			<select
				id={idProps}
				name={nameProps}
				value={formDataProps}
				onChange={(e) => handleProps(e, idProps)}
				className='bg-gray-50 border border-red-400 text-gray-900 text-sm rounded-lg focus:ring-red-400 focus:border-red-400 block w-72 ml-3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-400 dark:focus:border-red-400'>
				{titleRequirements.map(({ id, title }) => (
					<option key={id} value={title}>
						{title}
					</option>
				))}
			</select>
		</>
	);
};

export default SelectTemplate;
