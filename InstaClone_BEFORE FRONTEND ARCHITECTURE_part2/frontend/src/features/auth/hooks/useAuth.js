import { useContext } from 'react'
import { AuthContext } from '../auth.context'
import { login, register, getMe } from '../services/auth.api'

export const useAuth = () => {


const { user, setUser, loading, setLoading } = useContext(AuthContext)

async function handleLogin(username, password) {
    try {
        setLoading(true)

        const response = await login(username, password)

        setUser(response.user)

        return response

    } catch (error) {
        console.log(error)
        throw error

    } finally {
        setLoading(false)
    }
}

async function handleRegister(username, email, password) {
    try {
        setLoading(true)

        const response = await register(username, email, password)

        setUser(response.user)

        return response

    } catch (error) {
        console.log(error)
        throw error

    } finally {
        setLoading(false)
    }
}

async function handleGetMe() {
    try {
        setLoading(true)

        const response = await getMe()

        setUser(response.user)

        return response

    } catch (error) {
        console.log(error)
        throw error

    } finally {
        setLoading(false)
    }
}

return { user, loading, handleLogin, handleRegister, handleGetMe }


}
