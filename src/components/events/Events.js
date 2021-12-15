import axios from "axios";
import React, {useState} from "react";

function AddEvent () {

    //const url = "http://localhost:5000"

    const [data, setData] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        image: ""
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:5000/events", {
                title: data.title,
                description: data.description,
                location: data.location,
                date: data.date,
                image : data.image
            })
            window.location.reload();
        }catch (error){
            console.log(error)
        }
    }

    function handle (e) {
        const newData={...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    return(
        <div style={{background: "white", textAlign: "center"}}>
            <form onSubmit = {(e) => onSubmit(e)}>
                <input onChange={(e) => handle(e)} id="title" value={data.title} placeholder="Title" type="text"></input><br></br><br></br>
                <textarea onChange={(e) => handle(e)} id="description" value={data.description} placeholder="Description" type="text"></textarea><br></br><br></br>
                <input onChange={(e) => handle(e)} id="location" value={data.location} placeholder="Location" type="text"></input><br></br><br></br>
                <input onChange={(e) => handle(e)} id="date" value={data.date} placeholder="Date" type="date"></input><br></br><br></br>
                <input onChange={(e) => handle(e)} id="image" value={data.image} placeholder="Image" type="url"></input><br></br><br></br>
                <button style= {{background: "blue"}}>Submit</button>
            </form>
        </div>

    );
}

export default AddEvent;