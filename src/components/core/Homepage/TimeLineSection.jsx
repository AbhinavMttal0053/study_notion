import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo:Logo1,
        Heading:"Leadership",
        Description:"Fully Committed to The Success Of The Company"
    },
    {
        Logo:Logo2,
        Heading:"Leadership",
        Description:"Fully Committed to The Success Of The Company"
    },
    {
        Logo:Logo3,
        Heading:"Leadership",
        Description:"Fully Committed to The Success Of The Company"
    },
    {
        Logo:Logo4,
        Heading:"Leadership",
        Description:"Fully Committed to The Success Of The Company"
    },    
]

const TimeLineSection = () => {
  return (
    <div className='flex flex-row gap-15 items-center'>
        {/*First Section*/}
        <div className='w-[45%] flex flex-col gap-5'>
            {
                timeline.map((element,index) =>{
                    return(
                        <div className='flex flex-row gap-6' key = {index}>
                            <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                <img src={element.Logo} alt='img'/>
                            </div>
                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                            </div>
                        </div>
                    )
                })
            }

        </div>
        {/*Second Section*/}
        <div className='relative shadow-blue-200 '>
            <img src={TimelineImage} alt='TimelineImg'
            className='shadow-white object-cover h-fit'/>

            <div className = "absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-6 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                    <p className='text-3xl font-bold '>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>years of experience</p>

                </div>

                <div className='flex gap-5 items-center px-7'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>Types of Courses</p>
                </div>

            </div>
        </div>

    </div>
  )
}

export default TimeLineSection