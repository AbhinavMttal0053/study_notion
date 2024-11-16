import React from 'react'
import { matchPath, NavLink, useLocation } from 'react-router-dom'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux'

const SideBarLink = ({element , iconName}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const Icon = Icons[iconName]

    const matchRoute = (route) =>{
        return matchPath( {path:route}, location.pathname )
    }
    console.log(element.path);
  return (
    <NavLink
    to = {element.path}
    className = {`relative px-8 py-2 ${matchRoute(element.path) ? "bg-yellow-800" : "bg-opacity-0"}`}
    >
        <span className = {`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
        ${matchRoute(element.path) ? "bg-opacity-100" : "bg-opacity-0 "}`}>

        </span>
        <div className = 'flex items-center gap-x-3'>
            <Icon className= 'text-lg'/>
            <span>{element.name}</span>
        </div>

    </NavLink>
  )
}

export default SideBarLink