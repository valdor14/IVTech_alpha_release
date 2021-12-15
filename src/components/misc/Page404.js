import React from "react";

function Page404() {
    const quote = require('iquotes');
    const randQuote = quote.random();

    return (<div style={{
        display: "block",
        width: "100%"
    }}>
        <h2 style={{color:"white"}}>{randQuote.quote} <br/> - {randQuote.author}</h2>
        <img src={`https://http.cat/404`} alt="Error" width="100%"></img>
        </div>);
  }
  
  export default Page404;