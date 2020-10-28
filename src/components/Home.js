import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import image_app_access from '../images/tim-gouw-ScWvHUtQca4-unsplash_190x190.jpg';
import image_org_access from '../images/element5-digital-EzYCojqgbgM-unsplash_190x190.jpg';

const Home = ()=> {
    return (
        <div>
            <section id="banner">
				<div className="inner">
					<header>
						<h1>Welcome to Examine</h1>
					</header>

					<div className="flex">

						<div>
							<i className="edit outline icon"></i>
							<h3>The convenient online evaluation platform</h3>
							<p>Educational organizations take advantage of the Examine platform to securely apply exams to thousands of candidates</p>
						</div>

					</div>

				</div>
			</section>


			<section id="three" className="wrapper align-center">
				<div className="inner">
					<div className="flex flex-2">
						<article>
							<div className="image round">
								<img src={image_app_access} alt="Applicant access" />
							</div>
							<header>
                                <Link className="access-link" to='/applicants'>Access as an Applicant</Link>
							</header>
							<p>Applicants are exam takers. Once they register for free they can browse, select and purchase the right to take an exam.</p>
							<footer></footer>
						</article>
						<article>
							<div className="image round">
								<img src={image_org_access} alt="Org access" />
							</div>
							<header>
                                <Link className="access-link" to='orgs'>Access as Educational Organization</Link>
							</header>
							<p>Educational Organizations are schools, colleges, universities or businesses that require applicants to take an exam to be admitted.</p>
							<footer></footer>
						</article>
					</div>
				</div>
			</section>

            <footer id="footer">
				<div className="inner">Photos by:
                <p><a href="https://unsplash.com/@nate_dumlao?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Nathan Dumlao</a> on Unsplash</p>
                <p><a href="https://unsplash.com/@punttim?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Tim Gouw</a> on Unsplash</p>
                <p><a href="https://unsplash.com/@element5digital?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Element5 Digital</a> on Unsplash</p>
                </div>
            </footer>


        </div>
    )
}

export default Home;