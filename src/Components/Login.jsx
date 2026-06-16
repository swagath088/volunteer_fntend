import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { useRef, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Login(){
    const emailref=useRef();
    const passwordref=useRef();
    const [item,setitem]=useState('');
    const navigate=useNavigate();
    const[showpassword,setshowpassword]=useState(false);
    const[loading,setloading]=useState('false');
    const eye=()=>{
        setshowpassword(!showpassword)
    }
    const handlelogin=()=>{
        const data={
            email:emailref.current.value,
            password:passwordref.current.value
        };
        if (!data.email || !data.password){
            setitem('please fill all fields');
            return;
        }
        const base_url='https://volunteer-bckend.onrender.com/main/login/';
        setloading(true);
        setitem('Server is waking up. Please wait 1-2 minutes...');
        axios.post(base_url,data).then((res)=>{
            console.log(res.data)
            localStorage.setItem('is_admin',res.data.is_admin)
            setloading(false);
            setitem('login successfully completed')
            navigate('/List');
        })
        .catch((err)=>{
            console.log(err.response?.data)
            setloading(false);
            setitem('email/password incorrect try again ')
            emailref.current.value=''
            passwordref.current.value=''
        });

    };
    return(
        <div className="loginpage">
            <h1>Volunteer Loginpage</h1>
            <input type="email" name="" id="" placeholder="email" ref={emailref} required onFocus={()=>setitem('')}/>
            <input type={showpassword? 'text':'password'} name="" id="" placeholder="password" ref={passwordref} required onFocus={()=>setitem('')}/>
            <span onClick={eye}>{showpassword ? <FaEye/> : <FaEyeSlash/>}</span>
            <button onClick={handlelogin} disabled={loading}>{loading ? 'loading...':'login'}</button>
            <h2>Dont have an acc?</h2>
            <Link to="/Register" className="registerpage">Register</Link>
            <h3>{item}</h3>
        </div>
    );
}
export default Login;