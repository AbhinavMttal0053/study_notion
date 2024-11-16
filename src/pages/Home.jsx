import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import Highlighter from '../components/core/Homepage/Highlighter'
import CTAButton from '../components/core/Homepage/Button'
import banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/codeblocks'
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection'
import TimeLineSection from '../components/core/Homepage/TimeLineSection'
import InstructorSection from '../components/core/Homepage/InstructorSection' 
import ExploreMore from '../components/core/Homepage/ExploreMore'
import Footer from '../components/common/Footer'
import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import {logout} from '../services/operations/authAPI'


function Home (){
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   dispatch(logout(navigate));
  return (
    <div>
        {/*Section 1*/}

        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
        text-white justify-between'>
            <Link to= {"/signup"}>

            <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit'>
                <div className='flex flex-row items-center gap-2 rounded-full  px-10 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become A Instructor </p>
                    <FaArrowRight />
                </div>
            </div>

            </Link>
            <div className='text-4xl text-center font-semibold mt-8'>
                Empower Your Future With
                <Highlighter text = {"Coding Skills"}/>
            </div>

            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                with our online coding courses, you can learn at your own pace,
                from anywhere in the world and get access to a wealth of resources,
                including hands-on projects , quizzes and personalized feedback from instructors

            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton linkto={"/signup"} active={true}>
                    Learn More
                </CTAButton>

                <CTAButton linkto={"/login"} active={false}>
                    Book A Demo
                </CTAButton>
            </div>
            {/* className="shadow-[0_0_20px_0] shadow-[#FC6767]" */}

            <div className='mx-3 my-12 shadow-blue-200 shadow-[0_0_40px_0] shadow-[#2a52be]'>
                <video loop muted autoPlay>
                    <source src={banner} type='video/mp4'/>
                </video>
            </div>

            {/*Code Section 1*/}
            <div>
                <CodeBlocks
                    position = {"lg:flex-row"}
                    heading = {
                        <div className='text-4xl font-semibold'>
                            Unlock Your
                            <Highlighter text = {"Coding Potential"}/>
                            With our Online Courses
                        </div>
                    }                    
                    subheading={"Our Courses Are taught by industry experts who have many years of experience in coding and are very passionate to share their knowledge with you"}
                    ctabtn1={
                        {
                            active:true,
                            btnText:"Try it Yourself",
                            linkto:"/signup"
                        }
                    }

                    ctabtn2={
                        {
                            active:false,
                            btnText:"Learn More",
                            linkto:"/login"
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document</title>\n</head>\n<body>\n</body>\n</html>`}
                    codeColor = {"text-yellow-25"}
                    />
            </div>

            
            {/*Code Section 2*/}
            <div>
                <CodeBlocks
                    position = {"lg:flex-row-reverse"}
                    heading = {
                        <div className='text-4xl font-semibold'>
                            Unlock Your
                            <Highlighter text = {"Coding Potential"}/>
                            With our Online Courses
                        </div>
                    }                    
                    subheading={"Our Courses Are taught by industry experts who have many years of experience in coding and are very passionate to share their knowledge with you"}
                    ctabtn1={
                        {
                            active:true,
                            btnText:"Try it Yourself",
                            linkto:"/signup"
                        }
                    }

                    ctabtn2={
                        {
                            active:false,
                            btnText:"Learn More",
                            linkto:"/login"
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Document</title>\n</head>\n<body>\n</body>\n</html>`}
                    codeColor = {"text-yellow-25"}
                    />
            </div>

            <ExploreMore/>
            

        </div>

        {/*Section 2*/}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[315px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className='h-[180px]'></div>
                    <div className='flex flex-row gap-7 text-white'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        
                        <CTAButton active={false} linkto={"/login"}>
                            <div className='flex items-center gap-3'>
                                Learn More
                            </div>
                        </CTAButton>

                    </div>

                </div>

            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col gap-7 items-center justify-between'>
                    
                    <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                        <div className='text-4xl font-semibold w-[45%]'>
                            Get The Skills you need for a
                            <Highlighter text={"Job That Is in Demand"}/>
                        </div>
                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                            <div className='text-[16px]'>
                                The Modern StudyNotion dictates its Own terms,Today to 
                                Be a Competitive Specialist requires More Than Professional Skills
                            </div>
                            <CTAButton active={true} linkto={"/login"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>

                        </div>

                    </div>
                    <TimeLineSection/>
                    <LearningLanguageSection/>
            </div>
        </div>

        {/*Section 3*/}

        <div className='w-11/12 mx-auto max-w-maxContent bg-richblack-900 text-white
        flex flex-col items-center justify-between gap-8 first-letter'>
            <InstructorSection/>

            <h2 className='text-center font-semibold text-4xl mt-10'> Reviews From Other Learners</h2>
            {/*Section 4*/}
        </div>

        {/* Footer */}
        <Footer/>

       

    </div>
  )
}

export default Home;