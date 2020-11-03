import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import uniqid from 'uniqid';
import HomeOrgs from '../components/HomeOrgs';
import { AuthContext } from "../context";

function renderHomeOrgs(examinerContext){
    return render(
        <AuthContext.Provider value={examinerContext}>
            <HomeOrgs />
        </AuthContext.Provider>
    )
}

// Smoke test
test('HomeOrgs renders without crashing - no examiner logged in', ()=>{
    renderHomeOrgs({isExaminerAuth: false, examinerInfo: undefined});
});

test('HomeOrgs renders without crashing - examiner logged in', ()=>{
    const examinerContext = {
        isExaminerAuth: true, 
        examinerInfo: {
            username: 'test123',
            org_handle: 'org1',
            org_name: 'Some University',
            role: 'examiner'
        }};
    <BrowserRouter>renderHomeOrgs(examinerContext)</BrowserRouter>;
});


// Snapshot test
test('HomeOrgs matches snapshot', ()=>{
    const examinerContext = {isExaminerAuth: false, examinerInfo: undefined};
    const { asFragment } = renderHomeOrgs(examinerContext);
    expect(asFragment()).toMatchSnapshot();
});

// Specialized tests
test('Examiner registration', async ()=>{
    // Select Registration fields
    const examinerHome = renderHomeOrgs({isExaminerAuth: false, examinerInfo: undefined});
    const userNameIn = examinerHome.getAllByPlaceholderText('Username')[1];
    const firstNameIn = examinerHome.getByPlaceholderText('First Name');
    const lastNameIn = examinerHome.getByPlaceholderText('Last Name');
    const emailIn = examinerHome.getByPlaceholderText('Email');
    const pwdIn1 = examinerHome.getByTestId('registerpwd1') 
    const pwdIn2 = examinerHome.getByTestId('registerpwd2') 
    const registerButton = examinerHome.getAllByRole('button')[1];
    expect(userNameIn.toBeInTheDocument);
    expect(pwdIn1.toBeInTheDocument);
    expect(registerButton.toBeInTheDocument);

    // Populate Registration fields
    const userSuffix = uniqid.time();
    await wait(()=>{
        fireEvent.change(userNameIn, { target: { value: `mockname_${userSuffix}` } });
        fireEvent.change(firstNameIn, { target: { value: "TestFirstName" } });
        fireEvent.change(lastNameIn, { target: { value: "TestLastName" } });
        fireEvent.change(emailIn, { target: { value: "TestEmail" } });
        fireEvent.change(pwdIn1, { target: { value: "qwer" } });
        fireEvent.change(pwdIn2, { target: { value: "qwer" } });
    }).then(fireEvent.click(registerButton));
    expect(examinerHome.getByText("Invalid email address")).toBeInTheDocument;

    await wait(()=>{
        fireEvent.change(emailIn, { target: { value: "TestEmail@test.com" } });
    }).then(fireEvent.click(registerButton));
    expect(examinerHome.queryByText("Invalid email address")).not.toBeInTheDocument;

});