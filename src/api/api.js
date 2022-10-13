import { API_URL_ORDERS, API_URL_USERS } from "./constants"

const handleResponse = response => {
	if (response.ok) {
		return response.json()
	}
	return Promise.reject({ error: response.status, message: response.message })
}

export const getOrders = () => {
	return fetch(`${API_URL_ORDERS}`, {
		method: "GET"
	}).then(res => handleResponse(res))
}

export const post = data => {
	return fetch(`${API_URL_ORDERS}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ ...data })
	}).then(res => handleResponse(res))
}


export const remove = (data) => {
	console.log(data)
     let req = data.map(id => {
		return fetch(`${API_URL_ORDERS}/${id}`, {
			method: "DELETE",
			headers: {
			  Accept: "application/json",
			  "Content-Type": "application/json"
			}
		  }).then(res => handleResponse(res))
  })
  return req
}




export const getUsersData = () => {
	return fetch(`${API_URL_USERS}`, {
		method: "GET"
	}).then(res => handleResponse(res))
}