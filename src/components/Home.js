import React from 'react';
import { Link } from 'react-router-dom';

const Home = ()=> {
    return (
        <div>
            <h2>Access as <Link to='/applicants'>Applicant</Link></h2>
            <h2>Access as <Link to='orgs'>Organization</Link></h2>
        </div>
    )
}

export default Home;