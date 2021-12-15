import axios from "axios";
import React, {useState} from "react";

function AddMentor () {

    //const url = "http://localhost:5000"

    const [data, setData] = useState({
        title: "",
        description: "",
        image: ""
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:5000/mentors", {
                title: data.title,
                description: data.description,
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
                <input onChange={(e) => handle(e)} id="image" value={data.image} placeholder="Image" type="url"></input><br></br><br></br>
                <button style= {{background: "blue"}}>Submit</button>
            </form>
        </div>

    );
}

export default AddMentor;