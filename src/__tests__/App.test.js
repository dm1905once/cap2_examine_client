import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../components/App';

// Smoke test
test('App renders without crashing', ()=>{
    render(<App />);
});


// Snapshot test
test('App matches snapshot', ()=>{
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
});

// Specialized tests
test('Main elements in landing page are displayed', ()=>{
    const landingPage = render(<App />);
    expect(landingPage.getByText('Welcome to Examine').toBeInTheDocument);
    expect(landingPage.getByText('Access as an Applicant').toBeInTheDocument);
    expect(landingPage.getByText('Access as Educational Organization').toBeInTheDocument);
});

test('Access to Applicant subportal is enabled', async ()=>{
    const landingPage = render(<App />);
    const applicantAccess = landingPage.getByText('Access as an Applicant');
    fireEvent.click(applicantAccess);
    expect(landingPage.getByText('Applicant Login').toBeInTheDocument);
    expect(landingPage.getAllByText('Register').toBeInTheDocument);
    expect(landingPage.getByText('Browse exams').toBeInTheDocument);

    // Wait and see if examList was populated from database
    // await waitFor(()=> landingPage.getByText('No exams are available')); // Not available in version 9.5

    fireEvent.click(landingPage.getByText('Home'));
    expect(landingPage.getByText('Access as an Applicant').toBeInTheDocument);
});

test('Access to Organization subportal is enabled', ()=>{
    const landingPage = render(<App />);
    const organizationAccess = landingPage.getByText('Access as Educational Organization');
    fireEvent.click(organizationAccess);
    expect(landingPage.getByText('Examine for Organizations').toBeInTheDocument);
    expect(landingPage.getAllByText('Register').toBeInTheDocument);
    expect(landingPage.getAllByText('Login').toBeInTheDocument);
    fireEvent.click(landingPage.getByText('Home'));
    expect(landingPage.getByText('Access as Educational Organization').toBeInTheDocument);
});

