import axios from "axios";
import React, {useState} from "react";
import ReactDOM from "react-dom";
//import DOMPurify from "dompurify"; // for sanitizing html

function AddCourse () {

    //const url = "http://localhost:5000"

    const [data, setData] = useState({
        author: "",
        title: "",
        description: "",
        filePath: ""
    })

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post("http://localhost:5000/courses", {
                author: data.author,
                title: data.title,
                description: data.description,
                filePath : data.filePath
            })
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

    const redirect = async (e) => {
        const xx = await axios.get("http://localhost:5000/courses/chosen")
        console.log(xx.data)
        //ReactDOM.render(xx.data, document.getElementById('root'));
        //const safeHTML = DOMPurify.sanitize(xx.data);
        ReactDOM.render(<div dangerouslySetInnerHTML={{ __html: xx.data }} />, document.getElementById('root')); //! caution, may create security risks
    }

    return(
        <div>
            <form onSubmit = {(e) => onSubmit(e)}>
                <input onChange={(e) => handle(e)} id="author" value={data.author} placeholder="Author" type="text"></input>
                <input onChange={(e) => handle(e)} id="title" value={data.title} placeholder="Title" type="text"></input>
                <textarea onChange={(e) => handle(e)} id="description" value={data.description} placeholder="Description" type="text"></textarea>
                <input onChange={(e) => handle(e)} id="filePath" value={data.filePath} placeholder="FilePath" type="text"></input>
                <button>Submit</button>
            </form>
            <button onClick={(e)=>redirect(e)}>THE REDIRECT BUTTON</button>
        </div>

    );
}

export default AddCourse;