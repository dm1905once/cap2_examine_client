import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class examineApi {

    // Template API request to accomodate all variations
    static async request(verb, endpoint, paramsOrData = {}) {
        paramsOrData._token = localStorage.getItem("_token");
        console.debug("API Call:", verb, endpoint, paramsOrData);
    
        try {
          return (await axios({
            method: verb,
            url: `${BASE_URL}/${endpoint}`,
            [verb === "get" ? "params" : "data"]: paramsOrData})).data;
        }
    
        catch(err) {
          console.error("API Error:", err.response);
          let message = err.response.data.message;
          throw Array.isArray(message) ? message : [message];
        }
      }


    // Specific API calls
    static async authenticateExaminer(credentials) {
        let res = await this.request('post', 'examiners/login', credentials);
        return res.token;
    }

    static async registerExaminer(fields) {
        let res = await this.request('post', 'examiners/register', fields);
        return res.token;
    }

    static async getExaminerInfo(username) {
      let res = await this.request('get', `examiners/${username}`);
      return res;
    }

    static async getExaminerExams(username) {
      let res = await this.request('get', `examiners/${username}/exams`);
      return res;
    }

    static async createExam(newExam) {
      const username= newExam.exam_owner;
      let res = await this.request('post', `examiners/${username}/exams`, newExam);
      return res;
    }

    static async deleteExam(username, examId) {
      let res = await this.request('delete', `examiners/${username}/exams`, {exam_id: examId});
      return res;
    }

    static async getEditableExam(username, examId) {
      let res = await this.request('get', `examiners/${username}/exams/${examId}`);
      return res;
    }
}


export default examineApi;