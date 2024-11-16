/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import  HomepageExplore  from '../../../data/homepage-explore'
import Highlighter from './Highlighter';


const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
]

const ExploreMore = () => {

    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const[courses,setCourses] = useState(HomepageExplore[0].courses);
    const[currentCard,setCurrentCard] = useState(HomepageExplore[0].courses[0].heading);

    const setCard = (value) =>{
        setCurrentTab(value)

        const result = HomepageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>
        <div className='text-4xl font-semibold text-center'>
            Unlock The
            <Highlighter text={"Power Of Code"}/>
        </div>

        <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'>
            Learn to Build anything you can imagine
        </p>
        
        <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-5
        border-richblack-100 px-1 py-1'>
            {
                tabsName.map(( element,index ) =>{
                    return(
                        <div className={`text-[16px] flex flex-row items-center gap-2
                        ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium"
                    :"text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                    hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                    key={index}
                    onClick={() => setCard(element)}
                    >
                        {element}
                        </div>
                    )
                })
            }

        </div>

        <div className='h-[150px]'>

        </div>
    </div>
  )
}

export default ExploreMore