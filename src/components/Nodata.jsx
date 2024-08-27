import { useNavigate } from "react-router-dom"
import "../App.css"
const Nodata = () => {
    const navigate = useNavigate()
    return (
        <div className="nodata">
            <h1>Movie Search</h1>
            <br />
            <h1>No result found</h1>
            <button onClick={() => navigate("/")}>Go Back</button>
        </div>
    )
}

export default Nodata