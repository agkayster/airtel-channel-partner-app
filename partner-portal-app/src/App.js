import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PartnerForm from './routes/partnerForm';
import ErrorPage from './error-page';
import SuccessPage from './routes/success';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <PartnerForm />,
			errorElement: <ErrorPage />,
		},
		{
			path: '/success',
			element: <SuccessPage />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
