import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PartnerForm from './routes/partnerForm';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <PartnerForm />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
