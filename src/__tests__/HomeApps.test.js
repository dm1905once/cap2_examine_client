import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import uniqid from 'uniqid';
import HomeApps from '../components/HomeApps';
import { AuthContext } from "../context";

function renderHomeApps(applicantContext){
    return render(
        <AuthContext.Provider value={applicantContext}>
            <HomeApps />
        </AuthContext.Provider>
    )
}

// Smoke test
test('HomeApps renders without crashing - no applicant logged in', ()=>{
    renderHomeApps({isApplicantAuth: false, applicantInfo: undefined});
});

test('HomeApps renders without crashing - applicant logged in', ()=>{
    const applicantContext = {
        isApplicantAuth: true, 
        applicantInfo: {
            email: "some@email.com",
            role: 'applicant'
        }};
    <BrowserRouter>renderHomeApps(applicantContext)</BrowserRouter>;
});


// Snapshot test
test('HomeApps matches snapshot', ()=>{
    const applicantContext = {isApplicantAuth: false, applicantInfo: undefined};
    const { asFragment } = renderHomeApps(applicantContext);
    expect(asFragment()).toMatchSnapshot();
});

// Specialized tests
test('Applicant registration', async ()=>{
    // Select Registration fields
    const applicantHome = renderHomeApps({isApplicantAuth: false, applicantInfo: undefined});
    const fullNameIn = applicantHome.getByPlaceholderText('First and Last Name');
    const emailIn = applicantHome.getByPlaceholderText('Email Address');
    const pwdIn1 = applicantHome.getByTestId('loginpwd1') 
    const pwdIn2 = applicantHome.getByTestId('loginpwd2') 
    const registerButton = applicantHome.getAllByRole('button')[1];
    expect(fullNameIn.toBeInTheDocument);
    expect(pwdIn1.toBeInTheDocument);
    expect(registerButton.toBeInTheDocument);

    // Populate Registration fields
    const userSuffix = uniqid.time();
    await wait(()=>{
        fireEvent.change(fullNameIn, { target: { value: `Mock_${userSuffix} Name` } });
        fireEvent.change(emailIn, { target: { value: "TestEmail" } });
        fireEvent.change(pwdIn1, { target: { value: "qwer" } });
        fireEvent.change(pwdIn2, { target: { value: "qwer" } });
    }).then(fireEvent.click(registerButton));
    expect(applicantHome.getByText("Invalid email address")).toBeInTheDocument;

    await wait(()=>{
        fireEvent.change(emailIn, { target: { value: "TestEmail@test.com" } });
    }).then(fireEvent.click(registerButton));
    expect(applicantHome.queryByText("Invalid email address")).not.toBeInTheDocument;

});