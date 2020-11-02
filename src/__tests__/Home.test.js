import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../components/Home';

// Smoke test
test('Home renders without crashing', ()=>{
    render(<BrowserRouter><Home /></BrowserRouter>);
});


// Snapshot test
test('Home matches snapshot', ()=>{
    const { asFragment } = render(<BrowserRouter><Home /></BrowserRouter>);
    expect(asFragment()).toMatchSnapshot();
})