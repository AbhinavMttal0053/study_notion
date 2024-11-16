import React from 'react'
import InstructorImg from "../../../assets/Images/Instructor.png"
import Highlighter from './Highlighter'
import CTAButton from './Button'
import { FaArrowRight } from "react-icons/fa"

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-row gap-20 items-center'>
            <div className='w-[55%]'>
                <img src={InstructorImg} alt='InstructorImage' className='shadow-white'/>

            </div>
            <div className='w-[45%] flex flex-col gap-10'>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become a 
                    <Highlighter text={"Instructor"}/>
                </div>
                <p className='font-medium text-[16px] w-[80%] text-richblack-300 '>Instructors Around the World teach millions
                     of Students ono StudyNotion
                    We provide the tools and skills to teach what you love 
                </p>
                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className=' flex flex-row items-center gap-2'>
                            Start Learning Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>

        </div>
    </div>
  )
}

export default InstructorSection