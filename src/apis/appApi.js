import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class appApi {

    // Template API request
    static async request(verb, endpoint, paramsOrData = {}) {
        paramsOrData._token = localStorage.getItem("_appToken");
        console.debug("'Applicant' API Call:", verb, endpoint, paramsOrData);
    
        try {
          return (await axios({
            method: verb,
            url: `${BASE_URL}/${endpoint}`,
            [verb === "get" ? "params" : "data"]: paramsOrData})).data;
        }
    
        catch(err) {
          console.error("'Applicant' API Error:", err.response);
          let message = err.response.data.message;
          throw Array.isArray(message) ? message : [message];
        }
      }


    // APPLICANT-Specific API calls
    static async getApplicableExams() {
      let res = await this.request('get', `applicants/exams`);
      return res;
    }

    static async getPurchasedExams(applicantEmail) {
      let res = await this.request('get', `applicants/${applicantEmail}/purchased`);
      return res;
    }
    
    static async getCompletedExams(applicantEmail) {
      let res = await this.request('get', `applicants/${applicantEmail}/completed`);
      return res;
    }

    static async registerApplicant(fields) {
      let res = await this.request('post', 'applicants/register', fields);
      return res.token;
    }

    static async authenticateApplicant(credentials) {
      let res = await this.request('post', 'applicants/login', credentials);
      return res.token;
    }

    static async acquireExam(examDetails) {
      let res = await this.request('post', 'applicants/acquireExam', examDetails);
      return res;
    }

    static async validateApplication(appDetails) {
      const { application_id, applicant_email } = appDetails;
      let res = await this.request('get', `applicants/validateApplication?application_id=${application_id}&applicant_email=${applicant_email}`);
      return res;
    }

    static async applyExam(examId) {
      let res = await this.request('get', `applicants/applyExam?exam_id=${examId}`);
      return res;
    }

    static async submitExam(responses) {
      let res = await this.request('post', 'applicants/submitExam', responses);
      return res;
    }

    // STRIPE client APIs
    static async createStripeSession(examDetails) {
      try {
        let res = await this.request('post', 'applicants/stripe/create-session', examDetails);
        return res;
      } catch(e){
        throw e;
      }
    }

}


export default appApi;