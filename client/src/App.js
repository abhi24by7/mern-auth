import './App.css';
import { useState, useRef } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  const [name, setName]= useState('');
 const [email, setEmail]= useState('');
const [password, setPassword]= useState('');

  const containerRef = useRef(null);

  const handleRegisterClick = () => {
    containerRef.current.classList.add("active");
  };

  const handleLoginClick = () => {
    containerRef.current.classList.remove("active");
  };

  async function registerUser(ev){
    ev.preventDefault();
    try{
      await axios.post('/register',{
    name,
    email,
    password,
   });

   alert('User registered successfully. Now you can login.');   
}catch(e){
  alert('Registration failed. Please try again later.');  
  
   
}}
async function handleLoginSubmit(ev) {
  ev.preventDefault();

  try {
      const { data } = await axios.post("/login", { email, password });
      alert("Login successful");

  } catch (e) {
      alert("Login failed. Please try again later.");
  }
}

  return (
    <>
    <div className="container" id="container" ref={containerRef}>
        <div className="form-container sign-up">
            <form onSubmit={registerUser}>
                <h1>Create Account</h1>
                <div className="social-icons">
                    <a href="#" className="icon"><i className="fa-brands fa-google" style={{ color: '#000000' }}></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook" style={{ color: '#000000' }}></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin" style={{ color: '#000000' }}></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github" style={{ color: '#000000' }}></i></a>
                </div>
                <span>or use your email for registration</span>
                <input type="name" 
                placeholder="Name"
                value={name}
                onChange={ev => setName(ev.target.value)}
                />
                <input type="email" 
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                placeholder="Email"/>
                <input type="password" 
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                placeholder="Password"/>
                <button>Sign up</button>
            </form>
        </div> 
        <div className="form-container sign-in">
            <form onSubmit={handleLoginSubmit}>
                <h1>Sign In</h1>
                <div className="social-icons">
                    <a href="#" className="icon"><i className="fa-brands fa-google" style={{ color: '#000000' }}></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook" style={{ color: '#000000' }}></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin" style={{ color: '#000000' }}></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github" style={{ color: '#000000' }}></i></a>
                </div>
                <span>or use your email password</span>
              
                <input type="email" 
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder="Email"/>
                <input type="password" 
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                placeholder="Password"/>
                <a href="#">Forgot your password?</a>
                <button>Sign In</button>
            </form>
        </div> 
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    
    </>

  );

}

export default App;
