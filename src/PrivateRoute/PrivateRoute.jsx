import { useContext } from "react"
import { AuthContext } from "../authcontext/AuthContext"
import { Navigate } from "react-router-dom"
function PrivateRoute(props) {
    if(localStorage.getItem("token")==undefined){
        return (
            <Navigate to="/login"/>
        )
    }
    return (
        props.children
    )
}

export default PrivateRoute