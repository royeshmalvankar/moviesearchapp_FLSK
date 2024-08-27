import { useContext } from "react"
import { AuthContext } from "../authcontext/AuthContext"
import { Navigate } from "react-router-dom"
function PrivateRoute(props) {
    const {IsAuth}=useContext(AuthContext)
    if(!IsAuth){
        return (
            <Navigate to="/login"/>
        )
    }
    return (
        props.children
    )
}

export default PrivateRoute