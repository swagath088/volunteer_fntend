import { Link } from "react-router-dom";
import "../css/Register.css";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
function Register(){
    const [item,setitem]=useState('');
    const[showpassword,setshowpassword]=useState(false);
    const[confirm,setconfirm]=useState(false);
    const usernameref=useRef();
    const emailref=useRef();
    const mobileref=useRef();
    const cityref=useRef();
    const skillsref=useRef();
    const passwordref=useRef();
    const confirmref=useRef();
    const [verify,setverify]=useState('');
    const[loading,setloading]=useState(false);
        
    const eye=()=>{
        setshowpassword(!showpassword)
    }
    const visible=()=>{
        setconfirm(!confirm)
    }
    const handleregister = ()=>{
        const data={
            username:usernameref.current.value,
            email:emailref.current.value,
            mobile:mobileref.current.value,
            city:cityref.current.value,
            skills:skillsref.current.value,
            password:passwordref.current.value,
            confirmpassword:confirmref.current.value

        }
        if (data.password!==data.confirmpassword){
            alert('password do not match')
            return;
        }
        const mobile=mobileref.current.value
        if (mobile.length!==10){
            setverify('enter 10digits mobile number')
            return;
        }
        console.log(data);
        if (
            !data.username||
            !data.email||
            !data.mobile||
            !data.city||
            !data.skills||
            !data.password||
            !data.confirmpassword
        ){
            setitem('please fill all feilds');
            return;
        }
        setloading(true);
        setitem("Server is waking up. Please wait 1-2 minutes...");
        const base_url="https://volunteer-bckend.onrender.com/main/register/";
        axios.post(base_url,data).then((res)=>{
            console.log(res.data)
            setloading(false);
            setitem('registration completed successfully...! login now')
            usernameref.current.value=''
            emailref.current.value=''
            mobileref.current.value=''
            cityref.current.value=''
            skillsref.current.value=''
            passwordref.current.value=''
            confirmref.current.value=''
        })
        .catch((err)=>{
            console.log(err.response?.data?.message)
            setloading(false);
            setitem('please try again')
            usernameref.current.value=''
            emailref.current.value=''
            mobileref.current.value=''
            cityref.current.value=''
            skillsref.current.value=''
            passwordref.current.value=''
            confirmref.current.value=''
        })

    };
    return(
        <div className="register">
            <h1>Volunteer Registration</h1>
            <input type="text" name="" id="" placeholder="full name" ref={usernameref} required onFocus={()=>setitem('')}/>
            <input type="email" name="" id=""  placeholder="email"ref={emailref} required onFocus={()=>setitem('')}/>
            <input type="tel" name="" id="" placeholder="mobile no" ref={mobileref} required  onChange={(e)=>{e.target.value=e.target.value.replace(/\D/g,'');}} onFocus={()=>setitem('') }onFocus={()=>setverify('') }/>
            <input type="text" name="" id="" placeholder="city" ref={cityref} required onFocus={()=>setitem('')}/>
            <input type="text" name="" id="" placeholder="skills" ref={skillsref} required onFocus={()=>setitem('')}/>
            <input type={showpassword ? 'text':'password'} name="" id="" placeholder="password" ref={passwordref} required onFocus={()=>setitem('')}  />
            <span onClick={eye}>{showpassword ? <FaEye/> : <FaEyeSlash />}</span>
            <input type={confirm ? 'text':'password'} name="" id="" placeholder="confirm password" ref={confirmref} required onFocus={()=>setitem('')} className="confirm"/>
            <span onClick={visible} className="confirmpass">{confirm ?  <FaEye/> : <FaEyeSlash />}</span>
            <button onClick={handleregister} disabled={loading}>{loading ? 'loading...':'register'}</button>
            <h2>Alerady have an acc..!</h2>
            <Link to="/" className="login">login</Link>
            <h3>{item}</h3><h4>{verify}</h4>

        </div>
    );
}
export default Register;