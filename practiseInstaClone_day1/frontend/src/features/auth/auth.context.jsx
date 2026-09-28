import {createContext ,useState } from 'react'
import {login , register } from './services/auth.api'

export const AuthContext = createContext()

export function AuthProvider({children}){

    const [user,setUser] = useState(null) //user jo current login hai
    const [loading ,setLoading ] = useState(false) //

    const handleLogin = async(username ,password)=>{
        
        setLoading(true)
        try{
        
        const response = await login(username,password)
        console.log("CONTEXT RESPONSE:", response);
        setUser(response.user)
       
      }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
        
    }

    const handleRegister = async (username , email , password)=>{
        setLoading(true)
        console.log("CONTEXT REGISTER DATA:", username, email, password);
        try{

            const response = await register(username , email , password)
            console.log("REGISTER CONTEXT RESPONSE:", response);
            setUser(response.user)

        }catch(err){
            console.log("REGISTER CONTEXT ERROR:", err);
        }finally{
            setLoading(false)
        }
    }

    return ( 
        <AuthContext.Provider value={{user, loading , handleLogin ,handleRegister}}>
            {children}
        </AuthContext.Provider>
    )

}

