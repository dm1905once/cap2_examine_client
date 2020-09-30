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
}


export default examineApi;