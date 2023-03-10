const formTemplate = {
	fullNamesOfDirector1: 'Name Of Director (1)',
	fullNamesOfDirector2: 'Name Of Director (2)',
	taxIdentificationNumber: 'Tax Identification Number (TIN)',
	bvnOfDirector1: 'BVN Of Director (1)',
	bvnOfDirector2: 'BVN Of Director (2)',
	companyName: 'Company Name',
	documents: 'Documents and Passport Photograph (e.g .pdf, .jpg, .jpeg)',
	isIndividualCompany: 'Individual Company',
	isProprietorshipCompany: 'Proprietorship Company',
	isPartnershipCompany: 'Partnership Company',
	isLimitedCompany: 'Limited Company',
	officeAddress: 'Office Address',
	email: 'Email',
	website: 'Website',
	officePhone: 'Office Phone',
	mobilePhone: 'Mobile Phone',
	isDrivingLicense: 'Driving License',
	isVotersId: 'Voters ID',
	isInternationalPassport: 'International Passport',
	completed: 'Completed',
};
export { formTemplate };

const companyRequirements = [
	{
		id: 'accountOpeningForm',
		requirement: 'Account opening form duly completed',
	},
	{
		id: 'cacCertificate',
		requirement: 'Copy of CAC Certificate',
	},
	{
		id: 'formSeven',
		requirement: 'Form 07 (Particulars of Directors)',
	},
	{
		id: 'formTwo',
		requirement: 'Form 02 (Allotment of Shares)',
	},
	{
		id: 'formApplication',
		requirement: 'Form of Application of Registration Name for Enterprise',
	},
	{
		id: 'memat',
		requirement: 'Copy of Memorandum and Article of Association',
	},
	{
		id: 'boardResolution',
		requirement:
			'Board Resolution to open account with smartcash(signed by 2 directors)',
	},
	{
		id: 'proofAddress',
		requirement:
			'Proof of Address: Utility Bills etc. (any of the last 3 months utility bills can be provided)',
	},
	{
		id: 'references',
		requirement: 'Two (2) satisfactory references',
	},
	{
		id: 'accountOpening',
		requirement: 'Account opening form',
	},
];
export { companyRequirements };

const signatoryRequirements = [
	{
		id: 'passportPhotographs',
		requirement: 'Two (2) passport sized photographs of each signatories',
	},
	{
		id: 'validID',
		requirement: 'Valid ID Cards of Signatories',
	},
	{
		id: 'validIDDir',
		requirement:
			'Valid ID Cards of Directors (if different from signatories)',
	},
	{
		id: 'validIDShareHolders',
		requirement:
			'Valid ID Cards of Shareholders with 5% share and above (if different from signatories)',
	},
	{
		id: 'scuml',
		requirement: 'SCUML certificate (if applicable)',
	},
];
export { signatoryRequirements };
