import React,{useState} from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    let history = useHistory();
    const host = "http://localhost:5000";
    const [credentials, setcredentials] = useState({email:"",password:""})
    const OnChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
      };

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const url = `${host}/api/auth/login`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json()
        if(json.success){
            // Redirect to Home Page
            localStorage.setItem('token',json.token)
            history.push('/');
            props.showAlert("Logged In SuccessFully ","success");

        }
        else{
          props.showAlert("Invalid Credentials","danger");
        }
    }
  return (
  <div className="container mt-2">
  <h2>Login or Create an account to continue using MySecrets</h2>
    <div className="container my-2">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={OnChange}
            id="email"
            value={credentials.email}
            required
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={OnChange}
            value={credentials.password}
            className="form-control"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
