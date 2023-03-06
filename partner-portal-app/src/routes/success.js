import React from 'react';
import { VscCheckAll } from 'react-icons/vsc';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
	return (
		<div className='bg-gray-200 h-screen relative'>
			<div className='border-2 text-center text-white rounded-t-xl h-52 mx-4 bg-red-400 absolute top-24 inset-x-px z-10'>
				<IconContext.Provider value={{ size: '50px' }}>
					<VscCheckAll
						style={{
							marginLeft: 'auto',
							marginRight: 'auto',
							marginTop: '20px',
						}}
					/>
				</IconContext.Provider>
				<p className='mt-6 font-bold text-lg'>Awesome.</p>
				<p className='mt-2 text-sm'>Your form has been submitted</p>
				<p className='mt-2 text-sm'>
					Click on the button below to go back to the Airtel portal
				</p>
			</div>
			<div className='border-2 rounded-b h-52 mx-4 bg-white absolute top-60 inset-x-px z-0'>
				<Link to='/'>
					<p className='border-none rounded-full text-center text-white bg-red-400 mt-20 pt-1 h-8 w-32 ml-auto mr-auto'>
						Airtel Portal
					</p>
				</Link>
			</div>
		</div>
	);
};

export default SuccessPage;
