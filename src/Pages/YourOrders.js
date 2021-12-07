import React, {useState, useEffect, useContext} from 'react'
import {UserProvider} from '../contexts/UserContext'
import {UserContext} from '../contexts/UserContext'
import Button from '../components/Button'
import Invoice from '../components/Invoice'

// YourOrders Page
function YourOrders() {

    // User Context
    const {isUser, setUser, userIDNumber, setUserIDNumber} = useContext(UserContext)
    const [orderDetails, setOrderDetails] = useState(null)
    const [activeTab, setActiveTab] = useState({

        toPrepare: true,
        preparing: false,
        toReceived: false,
        received: false,
        cancelled: false
    })

    const [orders, setOrders] = useState([])

    /** A function that gets the orders 
     * based on the specified status. */
    const getOrdersWithStatus = (status) => {

        fetch('http://localhost:3001/get-order-with-status', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({userIDNumber, status})
        })
        .then(res => res.json())
        .then(data => {
            setOrders(JSON.parse(data))
        })
    }

    /** A function that sets the order
     * based on the specified status. */
    const setOrderStatusAs = (status, orderID) => {
        
        fetch('http://localhost:3001/set-order-as', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({status, userIDNumber, orderID})
        })
        .then(response => response.json())
        .then(_data => {
            
            getOrdersWithStatus('to prepare')
        })
    }

    /** 
     * For Every Refresh,
     * we need to check if the session
     * storage is not empty. */
    useEffect(() => {
        
        let id_number = sessionStorage.getItem('idNumber')

        if (id_number) {
            setUserIDNumber(id_number);
            setUser(true)
        }
    }, [])
    

    useEffect(() => {

        document.title = 'PNC Cafe | Your Orders'
        getOrdersWithStatus('to prepare')
    }, [isUser])

    // 
    return (
        <div className="h-max flex flex-col gap-3 items-stretch justify-start sm:max-w-md w-full md:max-w-2xl mx-auto p-2 py-10 md:py-5">

            <h1 className="text-2xl font-bold text-pnc lg:text-4xl">Your Orders</h1>

            <div className="tabs tabs-boxed">

                {/* To Prepare */}
                <a onClick={() => {
                    
                    setActiveTab({toPrepare: true, preparing: false, toReceived: false, received: false, cancelled: false})
                    getOrdersWithStatus('to prepare')
                }} 
                className={`tab ${activeTab.toPrepare ? "tab-style" : ""}`}>To Prepare</a> 
                
                {/* Preparing */}
                <a onClick={() => {
                    
                    setActiveTab({toPrepare: false, preparing: true, toReceived: false, received: false, cancelled: false})
                    getOrdersWithStatus('preparing')
                }} 
                 className={`tab ${activeTab.preparing ? "tab-style" : ""}`}>Preparing</a> 
                
                {/* To Received */}
                <a onClick={() => {
                    
                    setActiveTab({toPrepare: false, preparing: false, toReceived: true, received: false, cancelled: false})
                    getOrdersWithStatus('to received')
                }}  className={`tab ${activeTab.toReceived ? "tab-style" : ""}`}>To Received</a>

                {/* Received */}
                <a onClick={() => {
                    
                    setActiveTab({toPrepare: false, preparing: false, toReceived: false, received: true, cancelled: false})
                    getOrdersWithStatus('received')
                }}  className={`tab ${activeTab.received ? "tab-style" : ""}`}>Received</a>

                {/* Cancelled */}
                <a onClick={() => {
                    
                    setActiveTab({toPrepare: false, preparing: false, toReceived: false, received: false, cancelled: true})
                    getOrdersWithStatus('cancelled')
                }}  className={`tab ${activeTab.cancelled ? "tab-style" : ""}`}>Cancelled</a>
            </div>

            {/* Orders Container */}
            <div className="flex flex-col items-stretch gap-3 w-full">

                {
                    orders.length > 0 ? orders.map(order => {

                        return (
                            
                            <div key={order.order_id} className="border-pnc border shadow-lg flex flex-col gap-4 justify-between sm:flex-row sm:items-center w-full p-2 ">
                                <section>
                                    <h1 className="font-medium"><span className="text-pnc">Order ID:</span> {order.order_id}</h1>
                                    <h3 className="font-medium"><span className="text-pnc">Order Date:</span> {order.order_date}</h3>
                                </section>

                                <section className="flex items-center">

                                   {
                                        activeTab.toReceived === true && 
                                        <Button onClick={() => {
                                            setOrderStatusAs('received', order.order_id)
                                        }} className="button-sm" text="Received"/>
                                   }
                                   { 
                                        activeTab.toReceived !== true && 
                                        activeTab.preparing !== true && 
                                        activeTab.received !== true && 
                                        activeTab.cancelled !== true && 
                                        <Button onClick={() => {
                                            setOrderStatusAs('cancelled', order.order_id)
                                        }} 
                                        className="button-sm-red" 
                                        text="Cancel"/> 
                                   }

                                    <label onClick={() => {
                                        
                                        setOrderDetails(order)               
                                    }} htmlFor="invoice" className="text-white button-no-color modal-button" > View </label>
                                    
                                </section> 
                            </div>
                        )
                    }) : 
                    <div className="flex justify-center items-center">
                        <h1 className="text-pnc font-bold text-2xl">Empty Orders</h1>
                    </div>
                }
                <UserProvider>
                    <Invoice orderDetails={orderDetails}/>
                </UserProvider>
            </div>
        </div>
    )
}

export default YourOrders
