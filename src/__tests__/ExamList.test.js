import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
// import { createMemoryHistory } from 'history'
import { AuthContext } from "../context";
import ExamList from '../components/examiners/ExamList';

function renderExamList(examinerContext){
    return render(
        <AuthContext.Provider value={examinerContext}>
            <ExamList />
        </AuthContext.Provider>
    );
}
// Smoke test
test('ExamList renders without crashing', ()=>{
    const examinerContext = {
        isExaminerAuth: true, 
        examinerInfo: {
            username: 'test123',
            org_handle: 'org1',
            org_name: 'Some University',
            role: 'examiner'
        }
    };
    act(()=>{
        <BrowserRouter>renderExamList(examinerContext)</BrowserRouter>;
    });
});


// Snapshot test
test('Home matches snapshot', ()=>{
    const examinerContext = {
        isExaminerAuth: true, 
        examinerInfo: {
            username: 'test123',
            org_handle: 'org1',
            org_name: 'Some University',
            role: 'examiner'
        }
    };
    const { asFragment } = render(<BrowserRouter>renderExamList(examinerContext)</BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
});