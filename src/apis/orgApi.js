import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class orgApi {

    // Template API request
    static async request(verb, endpoint, paramsOrData = {}) {
        paramsOrData._token = localStorage.getItem("_orgToken");
        console.debug("'Org' API Call:", verb, endpoint, paramsOrData);
    
        try {
          return (await axios({
            method: verb,
            url: `${BASE_URL}/${endpoint}`,
            [verb === "get" ? "params" : "data"]: paramsOrData})).data;
        }
    
        catch(err) {
          console.error("'Org' API Error:", err.response);
          let message = err.response.data.message;
          throw Array.isArray(message) ? message : [message];
        }
      }


    // ORG-Specific API calls
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

    static async editExamQuestions(editExam) {
      const username = editExam.exam_owner;
      let res = await this.request('patch', `examiners/${username}/exams`, editExam);
      return res;
    }
}

export default orgApi;