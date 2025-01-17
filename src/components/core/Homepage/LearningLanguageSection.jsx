import React from 'react'
import Highlighter from './Highlighter'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from '../../../components/core/Homepage/Button'

const LearningLanguageSection = () => {
  return (
    <div className='mt-[120px]'>
      <div className='flex flex-col gap-5 items-center'>

        <div className='text-4xl font-semibold text-center'>
            Your Swiss Knife for 
          <Highlighter text={"Learning Any Language"}/>
        </div>

        <div className='text-center text-richblack-600 mx-auto text-base font-medium text-base w-[70%]'>
          Using Spin Making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress-tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-5'>
          <img src={know_your_progress} alt='img' className='object-contain -mr-28'/>
          <img src={compare_with_others} alt='img' className='object-contain'/>
          <img src={Plan_your_lessons} alt='img' className='object-contain -ml-36'/>
        </div>

        <div className='mb-16'>
          <CTAButton active={true} linkto={"/signup"}>
              <div>
                Learn More
              </div>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection