/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useState } from 'react';
import { categories } from '../../services/apis';
import { apiConnector } from '../../services/apiConnector';



const Navbar = () => {
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {totalItems} = useSelector((state) => state.cart);
    const location = useLocation();
    // const token = null;

    function checkPath(route){
        return matchPath({path:route},location.pathname)
    }

    const[subLinks,setSubLinks] = useState([]);

    async function fetchSubLinks(){
        try{
            const result = await apiConnector("GET",categories.CATEGORIES_API);
            setSubLinks(result.data.data);
            console.log("Printing SubLinks Data",result);
        }
        catch(error){
            console.log("Could not fetch data",error);
        }
    }

    useEffect(() =>{
        console.log("Printting TOken",token);
        fetchSubLinks();
    },[])

  return (
        <div className='flex items-center h-14 justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to = '/'>
            {/* Image Part */}
            <img src={Logo} alt='Website Logo' width={160} height={42} loading='lazy'/>
            </Link> 

            {/* Links Part */}
            <nav>
                <ul className='flex gap-6 text-richblack-25'>
                    {
                        NavbarLinks.map( (link,index) =>{
                            return(
                                <li key={index}>
                                    {
                                        link.title === 'Catalog' ? (
                                        <div>
                                            <p>{link.title}</p>
                                        </div>
                                    ) :
                                        (
                                            <Link to={link?.path}>
                                                <p className = {`${checkPath(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>{link.title}</p>
                                            </Link>
                                        )
                                    }
                                </li>
                            )
                        }) 
                    }
                </ul>
            </nav>

            {/* Login And Signup DashBoard */}
            <div className='flex items-center gap-6 '>
                {
                    user && user.accountType !== "Instructor" && (
                        <Link to={"dashboard/cart"} className='relative'>
                            <AiOutlineShoppingCart />
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }

                        </Link>
                    ) 
                }
                {
                    token === null && (
                        <Link to={"/login"}>
                            <button className='border border-richblack-700 bg-richblack-800
                            py-[8px] px-[12px] rounded-md text-richblack-100'>
                                Log In
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to = {"/signup"}>
                            <button className='border border-richblack-700 bg-richblack-800
                            py-[8px] px-[12px] rounded-md text-richblack-100'>
                                Sign Up                                
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown/>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar