import axios from "axios";

const API_URL = "http://localhost:5000/login"


const auth = async (email, motdepasse) => {
  return axios
    .post(API_URL, {
      email,
      motdepasse,
    },
      {
        headers: {
          'Authorization': "JWT_TOKEN",
          'Content-Type': 'application/json'
        }
      }
    )
    .then((response) => {
      console.log(response)
      if (response.data.tocken) {
        localStorage.setItem("collab", JSON.stringify(response.data));

      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("collab");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("collab"));
};

const AuthService = {
  auth,
  logout,
  getCurrentUser,
};



export default AuthService;