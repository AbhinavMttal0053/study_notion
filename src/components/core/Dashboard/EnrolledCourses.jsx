import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const EnrolledCourses = () => {
    const { token } = useSelector( (state) => state.auth);
    const[enrolledCourses,setEnrolledCourses] = useState(null);

    const getUserCourses = async(token) =>{
        console.log("Api Called");
        // THIS IS TEMPORARY TO BE REPLACED BY ACTUAL BACKEND CALL

    }
    async function getEnrolledCourses(){
        try{
            const response = await(getUserCourses(token));
            setEnrolledCourses(response);

        }   
        catch(error){
            console.log(error.message); 
        }
    }

    useEffect( () =>{
        getEnrolledCourses();
    },[])

  return (
    <div>
        <div>Enrolled Courses</div>
        {
            !enrolledCourses ? (<div>
                Loading...
            </div>) :
            (
                !enrolledCourses.length ? 
                (
                    <div>
                        Not Enrolled In Any Courses
                    </div>  
                ) : 
                (
                    <div>
                        <div>
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p>Progress</p>
                        </div>
                        {
                            enrolledCourses.map((element,index) =>()
                                return(

                                )
                            ))
                        }
                    </div>

                )
            )
        }
    </div>
  )
}

export default EnrolledCourses