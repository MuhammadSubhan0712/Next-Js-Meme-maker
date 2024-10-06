'use client'
import React from 'react'

const Memes = async() => {
        const memesData:[] = await fetch('https://api.imgflip.com/get_memes')
        const response:[{}]  =  await memesData.json();
        console.log("Memes",response.data.memes);
        interface datas {
            url: string
            id: string
            box_count: number
        }
        
  return (
    <>
    <div>

    <div>
        <h1>
            Meme Generator 
        </h1>
    </div>
    <div>

    </div>
    </div>
    
    </>
  )
}

export default Memes