import React from 'react'
import {  sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import  SideBarLink  from '../Dashboard/SideBarLink'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'

const SideBar = () => {
    const{loading: authLoading} = useSelector( (state) => state.auth)
    const{user,loading: profileLoading} = useSelector( (state) => state.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[confirmationModal,setConfirmationModal] = useState(null);

    if(authLoading || profileLoading){
        return(
            <div>
                Loading...
            </div>
        )
    }

  return (
    <div>
        <div className = 'flex min-w-[222px] flex-col border-r[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 text-white'>

            <div className = 'flex flex-col'>
                {
                    sidebarLinks.map( (element,index) =>{
                        if(element.type && user.accountType !== element.type){
                            return null;
                        }
                        return(
                            <SideBarLink element = {element} iconName = {element.icon}
                            key = {index}/>
                        )
                    })
                }
            </div>

                {/* Horizontal Line */}
            <div className = "flex mt-6 w-10/12 h-[1px] mb-6 bg-richblack-800"></div>
            <div className = 'flex flex-col'>
                <SideBarLink
                    element = {{name:"Settings",path:'dashboard/settings'}}
                    iconName="VscSettingsGear"
                />
                <button onClick={() => setConfirmationModal({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text:"Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                })}
                className='text-sm font-medium text-richblack-300'>
                
                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg'/>
                        Logout
                    </div>
                </button>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
        {/* {confirmationModal && <ConfirmationModal modalData={confirmationModal} />} */}
    </div>
  )
}

export default SideBar