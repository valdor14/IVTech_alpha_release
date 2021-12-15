import axios from "axios";
import React, {useState, useContext} from "react";
//import "./Event.scss";
import { useTranslation } from "react-i18next";
import "./Mentor.scss";
import UserContext from "../../context/UserContext";

// destructuring props into event
function MentorApplication() {

  const { t } = useTranslation();
  const { user } = useContext(UserContext);


    const [data, setData] = useState({
        name: "",
        contact: "",
        mentor: "",
        motivation: ""
    })

const onSubmit = async (e) => {
    e.preventDefault();
    try{
        if (window.confirm("Do you want to send your application?")){
            await axios.post("http://localhost:5000/mentors/application", {
                name: data.name,
                contact: data.contact,
                mentor: data.mentor,
                motivation : data.motivation
            })
            setData({
                name: "",
                contact: "",
                mentor: "",
                motivation: ""
            })
        }
    }catch (error){
        console.log(error)
    }
}

function handle (e) {
    const newData={...data}
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)
}


  return (
    <>
    {user && (
    <div className='mentor' style={{background: "white"}}>
        <form className='form' onSubmit = {(e) => onSubmit(e)}>
            <label>Name</label>
            <input onChange={(e) => handle(e)} id='name' value={data.name} type="text"></input>
            <label>Contact</label>
            <textarea onChange={(e) => handle(e)} id='contact' value={data.contact} type="text"></textarea>
            <label>Mentor</label>
            <input onChange={(e) => handle(e)} id='mentor' value={data.mentor} type="text"></input>
            <label>Motivation</label>
            <textarea onChange={(e) => handle(e)} id='motivation' value={data.motivation} type="text"></textarea>
            <button className='btn-edit'>Submit</button>
        </form>
    </div>
    )}
    </>
  );
}

export default MentorApplication;