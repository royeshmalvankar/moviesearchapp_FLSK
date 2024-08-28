import { useState, createContext } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [IsAuth, setIsAuth] = useState(false)
    const [data, setData] = useState([])
    const [isLoding, setLoding] = useState(true)
    const [isError, setError] = useState(true)
    const [email, setemail] = useState([]);
    const [password, setpassword] = useState([]);
    const [logemail, setlogemail] = useState([]);
    const [logpassword, setlogpassword] = useState([]);
    const [fav,setfav] = useState({})
    const [role,setRole]=useState("")
    const [token,setToken]=useState("")
    if (localStorage.getItem("token") != null) {
        setIsAuth(true)
    }
    else {
        setIsAuth(false)
        
    }

    return (
        <AuthContext.Provider value={{IsAuth, setIsAuth, data, setData, isLoding, setLoding, isError,
         setError, email, setemail, password, setpassword,logemail, setlogemail,logpassword, setlogpassword,fav,setfav,role,setRole,token,setToken}}>
            {children}
        </AuthContext.Provider>
    )

}