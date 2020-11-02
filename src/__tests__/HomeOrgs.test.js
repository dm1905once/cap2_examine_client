import React, { useContext } from 'react';
import { render, fireEvent } from '@testing-library/react';
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
test('HomeOrgs renders without crashing', ()=>{
    const examinerContext = {isExaminerAuth: false, examinerInfo: undefined};
    renderHomeOrgs(examinerContext);
});


// Snapshot test
test('HomeOrgs matches snapshot', ()=>{
    const examinerContext = {isExaminerAuth: false, examinerInfo: undefined};
    const { asFragment } = renderHomeOrgs(examinerContext);
    expect(asFragment()).toMatchSnapshot();
});


/*
it("submits correct values", async () => { 
    const { container } = render(<App />) 
    const name = container.querySelector('input[name="name"]') 
    const email = container.querySelector('input[name="email"]') 
    const color = container.querySelector('select[name="color"]') 
    const submit = container.querySelector('button[type="submit"]') 
    const results = container.querySelector("textarea"); 
    
    await wait(() => { 
        fireEvent.change(name, { target: { value: "mockname" } }) });

    await wait(() => { 
        fireEvent.change(email, { target: { value: "mock@email.com" } }) }) 
    
    await wait(() => { 
        fireEvent.change(color, { target: { value: "green" } }) }) 
        
    await wait(() => { fireEvent.click(submit) }) 
    
    expect(results.innerHTML).toBe( '{"email":"mock@email.com","name":"mockname","color":"green"}' ) })

    */