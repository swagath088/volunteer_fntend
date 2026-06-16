import { useEffect, useState } from "react";
import "../css/List.css";
import axios from "axios";
import { Link } from "react-router-dom";
function List(){
const[volunteer,setvolunteer]=useState([]);
const isAdmin = localStorage.getItem('is_admin')==='true';
const handledelete=(id)=>{
    axios.delete(`https://volunteer-bckend.onrender.com/main/delete/${id}/`).then((res)=>{
        alert(res.data.message);
        setvolunteer(
            volunteer.filter(
                (item)=>item.id!==id
            )
        )
    });
};
    useEffect(()=>{
        axios.get("https://volunteer-bckend.onrender.com/main/volunteers/").then((res)=>{
            setvolunteer(res.data);
        });
    },[]);
    return(
        <div className="list">
            <h1>Volunteer Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>city</th>
                        <th>skills</th>
                        {isAdmin&&<th>action</th>}
                    </tr>
                </thead>
                <tbody>
                    {volunteer.map((item)=>(
                        <tr key={item.id}>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.city}</td>
                            <td>{item.skills}</td>
                            {isAdmin && (<td><button onClick={()=>handledelete(item.id)}>delete</button></td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to='/' className="logout">Logout</Link>
        </div>
    );
}
export default List;