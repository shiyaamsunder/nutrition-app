import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const RouteGuard = (props) => {

    let authStatus = localStorage.getItem("authStatus")
    let authRole  = localStorage.getItem("authRole")
    
    if(authStatus==="true"){
        return (
            <Route path={props.path} component={props.component}/>
        )
    }else{
        return <Redirect to="/login"/>
    }
}

export default RouteGuard
