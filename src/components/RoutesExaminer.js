import React from 'react';
import { Route } from 'react-router-dom';
import HomeOrgs from './HomeOrgs';
import NavBarOrg from './NavBarOrg';
import ExamBuild from './ExamBuild';
import ExamEdit from './ExamEdit';
import ExamList from './ExamList';
import { AuthContext } from "../context";


const RoutesExaminer = () =>{

    const { isExaminerAuth } = React.useContext(AuthContext);

    // const [ authenticated, setAuthenticated ] = useState(false);
    // const [ userInfo, setUserInfo ] = useState();

    // React.useEffect(()=> {
    //     const hasToken = localStorage.getItem("_token");
    //     if (hasToken){
    //         const examinerUserInfo = getTokenFromLS();
    //         if (examinerUserInfo.role === "examiner"){
    //             setAuthenticated(true);
    //             setUserInfo(examinerUserInfo);
    //         }
    //     } else {
    //         setAuthenticated(false);
    //         setUserInfo();
    //     }
    //   }, [authenticated]);

    // function doAuthenticate(){
    //     setAuthenticated(true);
    //     setUserInfo(getTokenFromLS());
    // }

    // function undoAuthenticate(){
    //     setAuthenticated(false);
    //     setUserInfo();
    // }

    return (
        <>
            <NavBarOrg />
            <Route path="/orgs" exact component={HomeOrgs} />
            <Route path="/orgs/:examiner" exact render={()=>(
                isExaminerAuth
                    ? <ExamList />
                    : <HomeOrgs topMessage="Please authenticate first" />
            )}/>
            <Route path="/orgs/:examiner/exams" exact render={()=>(
                isExaminerAuth
                    ? <ExamList />
                    : <HomeOrgs topMessage="Please authenticate first" />
            )}/>
            <Route path="/orgs/:examiner/exams/new" exact render={()=>(
                isExaminerAuth
                    ? <ExamBuild />
                    : <HomeOrgs topMessage="Please authenticate first" />
            )}/>
            <Route path="/orgs/:examiner/exams/:examId/edit/:seq" component={
                isExaminerAuth? ExamEdit: HomeOrgs
            } />
        </>
    )
}

export default RoutesExaminer;