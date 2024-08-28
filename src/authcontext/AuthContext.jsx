import { useState, createContext } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [data, setData] = useState([])
    const [isLoding, setLoding] = useState(true)
    const [isError, setError] = useState(true)
    const [email, setemail] = useState([]);
    const [password, setpassword] = useState([]);
    const [logemail, setlogemail] = useState([]);
    const [logpassword, setlogpassword] = useState([]);
    const [fav,setfav] = useState({})

    return (
        <AuthContext.Provider value={{ data, setData, isLoding, setLoding, isError,
         setError, email, setemail, password, setpassword,logemail, setlogemail,logpassword, setlogpassword,fav,setfav}}>
            {children}
        </AuthContext.Provider>
    )

}