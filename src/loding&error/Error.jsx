import { Navigate } from "react-router-dom"

const Error = () =>{
    return(
        <>
        <h1>Error(404)</h1>
        <Navigate to="/login"/>
        </>
    )
}

export default Error