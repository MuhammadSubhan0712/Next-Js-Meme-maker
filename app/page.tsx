"use client"
import React, { useEffect, useState } from 'react'

const App = () => {

  // const [memeData , setMemeData] = useState(null);
  

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) =>{
    response.json()
    .then(data => console.log(data))
    setMemeData(data);
    })
  .catch((error)=> {
    console.log("Error ==>" , error);
    })
    
    },[])    
  return (
    <>
    <div>App</div>
    </>
  )
}

export default App