import React from 'react'
import Highlighter from '../Homepage/Highlighter'

const Quote = () => {
  return (
    <div>
        We Are Passionate about revolutionizing the way we learn. our innovative
        platform <Highlighter text={"Combines Technology"}/>
        <span className='text-orange'>
            {" "}
            expertise
        </span>
        , and community to create an
        <span className='text-orange'>
            unparalleled educational experience
        </span>
        

    </div>
  )
}

export default Quote