import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "../context";
import examineApi from '../apis/examineApi';
import ExamList from './applicants/ExamList';
import AppAccess from './applicants/AppAccess';
import AppRecords from './applicants/AppRecords';
const stripePromise = loadStripe("pk_test_51HcDauJMaHZnra3gtM9N5ZNXiYqFIkSYKKWs5GxoG3sAtyxIUJFKaXWpbLvl37OcSa2bd03rYBlP2J0Yc8a5ZkvV00clsLscYO");

const HomeApps = () => {
    const location = useLocation();
    const history = useHistory();
    const { isApplicantAuth, userInfo } = useContext(AuthContext);
    const [ examList, setExamList ] = useState([]);
    const [ applicationDetails, setApplicationDetails ] = useState({status: 'reloaded'});
    const [ stripeSession, setStripeSession ] = useState(null);
    let topMessage = location.state? location.state.topMessage : '';


    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
    
        if (query.get("success")) {
          console.log("Order placed! You will receive an email confirmation.");
          const application_id=query.get("application_id");
          const exam_id=query.get("exam_id");
          const applicant_email=query.get("applicant_email");
          registerPurchasedExam({application_id, exam_id, applicant_email});
        }
    
        if (query.get("canceled")) {
          console.log("Order canceled -- continue to shop around and checkout when you're ready.");
        }
      }, []);


    useEffect(()=>{
        async function loadStripeSession(){
            const stripe = await stripePromise;
            const result = await stripe.redirectToCheckout({
                sessionId: stripeSession.id,
            });

            if (result.error) {
                console.log("result.error:", result.error.message);
            } 
        };
        if (stripeSession) loadStripeSession();
    }, [stripeSession]);


    useEffect(()=>{
        async function retrieveExamList(){
            const applicableExams = await examineApi.getApplicableExams();
            setExamList(applicableExams);
        };
        retrieveExamList();
    },[]);


    async function registerPurchasedExam(appDetails){
        const newApplication = await examineApi.acquireExam(appDetails);
        
        if (newApplication === null ) {
            history.push("/applicants");
        } else {
            // dispatch(loadExam(exam));
            console.log("nada");
        }
    };


    const handleBuyExam = async (e, exam_id, application_id, exam_name, org_logo) =>{
        if (!isApplicantAuth) {
            alert("Please login or register first");
        } else {
            e.currentTarget.className += " loading";
            const appDetails = {
                application_id,
                applicant_email: userInfo.email,
                exam_id,
                exam_name,
                org_logo
            };

            setApplicationDetails(appDetails);

            async function createStripeSession(){
                setStripeSession(await examineApi.createStripeSession(appDetails));
            };
            createStripeSession();
        }
    };

    return (
        <div className="ui container">
            {topMessage?<div className={`ui  message`}>{topMessage}</div>:''}

            {isApplicantAuth? <AppRecords /> : <AppAccess />}

            <h2 className="ui block header">
                <i className="tasks icon"></i>
                <div className="content">Browse exams</div>
            </h2>
            {
                examList.length === 0
                ?   <div>
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
    )
}

export default HomeApps;