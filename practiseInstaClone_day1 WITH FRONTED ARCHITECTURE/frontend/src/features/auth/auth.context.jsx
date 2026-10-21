import {createContext ,useState } from 'react'
import {login , register } from './services/auth.api'

export const AuthContext = createContext() //ek context create kiya jisse hum apne app me kahi bhi use kar sakte hai kyon create kiya hai taki hum apne app me kahi bhi user ki state ko access kar sake user ki state ka mtlab hai ki user login hai ya nahi aur agar login hai to uska data kya hai.
//AuthContext data share karne ke liye Context object provide karta hai.

export function AuthProvider({children}){ // auth provider ek component hai jo apne children components ko context provide karta hai. isme hum user ki state aur loading state ko manage karte hai aur handleLogin aur handleRegister functions ko provide karte hai.iske children components kon konse hai ye depend karta hai ki humne is component ko kaha use kiya hai. jaise ki humne is component ko app.js me use kiya hai to app.js ke andar jitne bhi components hai wo sab is context ko access kar sakte hai.
//AuthProvider tumhara component hai jo state aur functions ko manage karke Context ke through share karta hai.
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

