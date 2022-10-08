import { onAuthStateChanged, getAuth } from "firebase/auth"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const auth = getAuth()
	const navigate = useNavigate()

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			setCurrentUser(user)
			if (!user) {
				return navigate("react-test-orders/login")
			}
		})
	}, [])

	return (
		<AuthContext.Provider
			value={{
				currentUser
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
