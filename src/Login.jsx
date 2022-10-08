import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "./firebase/firebase"
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut
} from "firebase/auth"
import { AuthContext } from "./firebase/AuthProvider"
import "./Login.css"

const Login = () => {
	const [loginEmail, setLoginEmail] = useState("")
	const [loginPassword, setLoginPassword] = useState("")
	const [user, setUser] = useState({})
	const [isRegistered, setIsRegistered] = useState(false)

	const { currentUser } = useContext(AuthContext)

	const navigate = useNavigate()

	const login = async () => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				loginEmail,
				loginPassword
			)
			if (user) {
				return navigate("/react-test-orders")
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	const logout = async () => {
		await signOut(auth)
	}

	const register = async () => {
		try {
			const auth = getAuth()
			await createUserWithEmailAndPassword(auth, loginEmail, loginPassword)
			console.log("успешно")
			setIsRegistered(true)
		} catch (e) {
			setIsRegistered(false)
		}
	}

	console.log("userEmail: ", currentUser?.email)

	return (
		<>
			<div>
        {currentUser && <Link className='links__back' to='/react-test-orders/'>
					Back to main
				</Link>}
				<h3> Login / Sign Up</h3>
				<input
					placeholder='Email...'
					onChange={event => {
						setLoginEmail(event.target.value)
					}}
				/>
				<input
					placeholder='Password...'
					onChange={event => {
						setLoginPassword(event.target.value)
					}}
				/>

				<button onClick={login}> Login</button>
			</div>
			{currentUser ? (
				<h4> User Logged In: {currentUser?.email}</h4>
			) : (
				<h4>please login or register</h4>
			)}
			{currentUser && <button onClick={logout}>Sign Out </button>}

			<button onClick={register}>Register</button>
			{isRegistered && <div>Успешная регистрация</div>}
		</>
	)
}

export default Login
