import React, { useContext, useEffect, useState } from "react"
import { createOrder } from "../api/createOrder"
import { getOrdersData } from "../api/getOrders"
import { removeOrder } from "../api/removeOrder"
import { AuthContext } from "../firebase/AuthProvider"
import { Link } from "react-router-dom"

import "./Orders.css"
import { remove } from "../api/api"

export default function Orders() {
	const [ordersData, setOrdersData] = useState([])
	const [textOrder, setTextOrder] = useState("")
	const [textSelect, setTextSelect] = useState("Иванов И. И.")
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccessed, setIsSuccessed] = useState(false)
	const [error, setError] = useState(false)
	const [currentId, setCurrentId] = useState(null)

	useEffect(() => {
		getOrders()
	}, [])

	const getOrders = () => {
		setIsLoading(true)
		return getOrdersData()
			.then(orders => setOrdersData(orders))
			.catch(err => {
				console.error(err)
				setError(true)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	function handleEditInputValue(e) {
		setTextOrder(e.currentTarget.value)
	}

	function handleSelectValue(e) {
		setTextSelect(e.target.value)
	}

	const addNewOrder = e => {
		e.preventDefault()
		const name = textSelect
		const documentName = textOrder
		console.log(textSelect, textOrder)
		if (
			ordersData.filter(
				x => x["name"] === textSelect && x["documentName"] === textOrder
			) == false
		) {
			setIsLoading(true)
			return createOrder({ name, documentName })
				.then(() => getOrders())
				.then(() => {
					setTextOrder("")
					setIsSuccessed(true)
				})
				.catch(err => {
					setError(true)
					console.error(err)
				})
				.finally(() => {
					setError(false)
					setIsLoading(false)
					setTimeout(() => {
						setIsSuccessed(false)
					}, 3000)
				})
		} else {
			setError(true)
		}
	}



	function removeOrderHandler(ordersName) {
		console.log(ordersName);
		let data = []
		ordersData.forEach(t => t.documentName === ordersName ?  data.push(t.id) : t)

		setIsLoading(true)
		Promise.all(remove(data))
			// remove(data)
			.then(() => getOrders())
			.catch(err => {
				setError(true)
				console.error(err)
			})
			.finally(() => {
				setError(false)
				setIsLoading(false)
			})
	}
  
	const filteredOrdersData = ordersData.reduce(function (o, i) {
		if (!o.hasOwnProperty(i["documentName"])) {
			o[i["documentName"]] = 0
		}
		o[i["documentName"]]++
		return o
	}, {})

	const ordersResult = Object.keys(filteredOrdersData).map(function (o) {
		return { documentName: o, count: filteredOrdersData[o] }
	})


	const sortOrdersResult = ordersResult.sort(function (b, a) {
		return a.count - b.count
	})

	const Result = sortOrdersResult.map((o, index) => o)




	const items = [
		{
			title: "Добавить заявку",
			content: (
				<section className='order-form'>
					<div className='container'>
						<select onClick={handleSelectValue}>
							<option value='Иванов И. И.'>Иванов И. И.</option>
							<option value='Петров П. П.'>Петров П. П.</option>
							<option value='Сидоров С. С'>Сидоров С. С</option>
						</select>
						<input
							type='text'
							onChange={handleEditInputValue}
							value={textOrder}
						/>

						<button type='button' onClick={addNewOrder} disabled={isLoading}>
							add order
						</button>
						{isSuccessed && <div>Заявка успешно добавлена</div>}
						{error && (
							<div>
								Пользователь с именем {textSelect} уже оставлял заявку на данный
								документ
							</div>
						)}
					</div>
				</section>
			)
		},
		{
			title: "Сводная таблица",
			content: (
				<section className='order-table'>
					<div className='container'>
						<div className='order-table__inner'>
							<div className='order-table__description'>
								<div className='order-table__description-item'>Документ</div>
								<div className='order-table__description-item'>
									Количество заявок
								</div>
							</div>
							{sortOrdersResult.map((order, index) => (
								<div className='order-table__row' key={index}>
									<div className='order-table__name'>{order.documentName}</div>
									<div className='order-table__count'>{order.count}</div>
									<button
										className='order-table__remove'
										onClick={() => removeOrderHandler(order.documentName)}
									>
										X
									</button>
								</div>
							))}
						</div>
					</div>
				</section>
			)
		}
	]

	return (
		<>
			<div>
				<Tabs items={items} />
				{isLoading && <div>Loading...</div>}
			</div>
		</>
	)
}

const TabContent = ({ title, content }) => (
	<div className='tabcontent'>
		<div>{content}</div>
	</div>
)

export function Tabs({ items }) {
	const [active, setActive] = React.useState(null)

	const { currentUser } = useContext(AuthContext)

	const openTab = e => setActive(+e.target.dataset.index)

	return (
		<div>
			<div className='tab'>
				{items.map((n, i) => (
					<button
						className={`tablinks ${i === active ? "active" : ""}`}
						onClick={openTab}
						data-index={i}
					>
						{n.title}
					</button>
				))}
				<div className='nav-link__wrap'>
					<span className='nav-link__login-wrap'>
						<Link className='nav-link__login' to='/react-test-orders/login'>
							Login page
						</Link>
					</span>
					<span className='nav-link__email'>{currentUser?.email}</span>
				</div>
			</div>
			{items[active] && <TabContent {...items[active]} />}
		</div>
	)
}
