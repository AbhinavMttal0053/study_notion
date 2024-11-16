import React from 'react'
import ContactUsForm from '../../ContactUs/ContactUsForm'
import Highlighter from '../Homepage/Highlighter'
const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
      <h1 className='text-3xl'>
        Get in Touch
      </h1>
      <p className='mb-10 text-4xl font-bold'>
        We'd love to here for you,
        <Highlighter text={"Please fill out this form."}/> 
      </p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
