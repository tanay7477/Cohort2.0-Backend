import {createContext , useState} from 'react'

export const PostContext = createContext()

export const PostContextProvider= ({children})=>{

    const[ loading, setLoading ] = useState(false)
    const[post, setPost] = useState(false)
    const[feed, setFeed] = useState(false)

    return (
        <PostContext.Provider value={{loading , setLoading, post , setPost , feed ,setFeed}}>
            {children}
        </PostContext.Provider>
    )

}