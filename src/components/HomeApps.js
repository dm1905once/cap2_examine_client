import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "../context";
import appApi from '../apis/appApi';
import ExamList from './applicants/ExamList';
import AppAccess from './applicants/AppAccess';
import AppRecords from './applicants/AppRecords';
import TopMessage from './TopMessage';
const stripePromise = loadStripe("pk_test_51HcDauJMaHZnra3gtM9N5ZNXiYqFIkSYKKWs5GxoG3sAtyxIUJFKaXWpbLvl37OcSa2bd03rYBlP2J0Yc8a5ZkvV00clsLscYO");

const HomeApps = () => {
    const history = useHistory();
    const { isApplicantAuth, applicantInfo } = useContext(AuthContext);
    const [ examList, setExamList ] = useState([]);
    // const [ applicationDetails, setApplicationDetails ] = useState({status: 'reloaded'});
    const [ stripeSession, setStripeSession ] = useState(null);
    const [ topMessage, setTopMessage ] = useState();

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        async function registerPurchasedExam(appDetails){
            const newApplication = await appApi.acquireExam(appDetails);
            
            if (newApplication === null ) {
                history.push("/applicants");
                setTopMessage({type: 'Error', message: "A problem occurred while attempting to acquire the exam"});
            } else {
                setTopMessage({type: 'Success', message: "Thank you! The exam has been added to your list of Purchased Exams. Good Luck!"});
            }
        };
    
        if (query.get("success")) {
          const application_id=query.get("application_id");
          const exam_id=query.get("exam_id");
          const applicant_email=query.get("applicant_email");
          registerPurchasedExam({application_id, exam_id, applicant_email});
        }
    
        if (query.get("canceled")) {
            setTopMessage({type: 'Info', message: "Order canceled -- continue to look around and take exam when you're ready."});
        }
      }, [history]);


    useEffect(()=>{
        async function loadStripeSession(){
            const stripe = await stripePromise;
            const result = await stripe.redirectToCheckout({
                sessionId: stripeSession.id,
            });

            if (result.error) {
                setTopMessage({type: 'Error', message: "A problem occurred while attempting to acquire the exam"});
                window.scrollTo(0,0);
            } 
        };
        if (stripeSession) loadStripeSession();
    }, [stripeSession]);


    useEffect(()=>{
        async function retrieveExamList(){
            try {
                const applicableExams = await appApi.getApplicableExams();
                setExamList(applicableExams);
            } catch (e){
                setTopMessage({type: 'Warning', message: "Sorry! We are unable to retrieve list of active exams."});
            }
        };
        retrieveExamList();
    },[]);





    const handleBuyExam = async (e, exam_id, application_id, exam_name, org_logo) =>{
        if (!isApplicantAuth) {
            setTopMessage({type: 'Warning', message: "Please login or register first"});
            window.scrollTo(0,0);
        } else {
            const buyExamButton = e.currentTarget;
            buyExamButton.classList.toggle("loading");

            const appDetails = {
                application_id,
                applicant_email: applicantInfo.email,
                exam_id,
                exam_name,
                org_logo
            };

            // setApplicationDetails(appDetails);

            async function createStripeSession(){
                try {
                    setStripeSession(await appApi.createStripeSession(appDetails));
                } catch(e){
                    buyExamButton.classList.toggle("loading");
                    setTopMessage({type: 'Error', message: "We're sorry! An error occurred while trying to acquire the exam."});
                    window.scrollTo(0,0);
                }
            };
            createStripeSession();
        }
    };

    return (
        <div className="ui container">
            {topMessage?<TopMessage content={topMessage}/>:''}

            {isApplicantAuth? <AppRecords /> : <AppAccess />}

            <h2 className="ui block header">
                <i className="tasks icon"></i>
                <div className="content">Browse exams</div>
            </h2>
            {
                examList.length === 0
                ?   <div>
                        <h3>No exams are available</h3>
                        {/* 
                        <h2 className="ui blue header">Loading exam list</h2>
                        {[1,2,3,4,5,6,7,8,9,0].map(x=>
                            <div className="ui placeholder" key={x}>
                                <div className="image header">
                                    <div className="line"></div>
                                    <div className="line"></div>
                                    <div className="line"></div>
                                </div>
                            </div>
                        )} 
                        */}
 
                    </div>
                :   
                    <div className="ui cards">
                        {examList.map(exam=>
                            <ExamList exam={exam} 
                                    key={exam.exam_id}
                                    handleBuyExam={handleBuyExam} />)}
                    </div>
            }
        </div>
    );

}

export default HomeApps;