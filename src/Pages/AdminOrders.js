/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react'
import { UserProvider } from '../contexts/UserContext'
import {AdminOrderContext} from '../contexts/AdminOrderContext'
import StatusModal from '../components (admin)/StatusModal'
import Invoice from '../components/Invoice'
import SuccessModal from '../components/SuccessModal'

function AdminOrders() {

    // AdminOrderContext
    const {orders, setOrders, setOrderID} = useContext(AdminOrderContext)

    // A dropdown value for setting up the message when the 'orders' state is empty.
    const [dropdownValue, setDropdownValue] = useState('all')

    const [isUpdateDone, setUpdateDone] = useState(false)

    const [statusModalData, setStatusModalData] = useState(null)
    const [invoiceData, setInvoiceData] = useState(null)

    /** Get the orders */
    const getOrders = () => {

        fetch('http://localhost:3001/get-orders')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setOrders(JSON.parse(data))
        })
    }

    /** A function that gets the orders 
     * based on the specified status. */
    const getOrdersWithStatus = (status) => {

        fetch('http://localhost:3001/get-order-with-status', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({status})
        })
        .then(res => res.json())
        .then(data => {
            setOrders(JSON.parse(data))
        })
    }

    /** For the first render of this page, 
     * get all the orders of the app. */
    useEffect(() => {

        document.title = 'Food Hub | Orders'
        if (orders.length < 1) 
           getOrdersWithStatus(dropdownValue)
            
    }, [])

    return (
        <div className="row-start-2 row-end-5 grid grid-cols-12 w-screen gap-3 px-10 relative">

            {/* Status Modal */}
            <StatusModal idNumber={statusModalData !== null && statusModalData.id_number} referenceFor={statusModalData !== null && `${statusModalData.order_id}/status`}
                                       isUpdateDone={isUpdateDone}     setUpdateDone={setUpdateDone}/>
            {/* Invoice Modal */}
            <UserProvider>
                <Invoice orderDetails={invoiceData} referenceFor={invoiceData !== null && `${invoiceData.order_id}/invoice`} />
            </UserProvider>

            <section className="flex gap-3 items-center justify-stretch w-max">
                <h1 className="row-start-1 col-span-12 text-pnc font-bold text-2xl lg:text-4xl">Orders</h1>

                {/* This is the dropdown or <select> tag */}
                <section className="flex gap-3 items-center">
                    <label htmlFor="status">Filter By:</label>
                    <select onChange={(e) => {

                        if (e.target.value === 'all')
                            getOrders()
                        else
                            getOrdersWithStatus(e.target.value);

                        setDropdownValue(e.target.value) // the dropdown value
                    }}  className="border border-black" id="status">
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="to received">To Received</option>
                        <option value="received">Received</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </section>
            </section>
            
             <div className="col-start-1 col-end-13 overflow-y-auto border table-height ">
                
                { orders.length > 0 ? <table className="table w-full relative table-zebra">
                    <thead>
                            
                        {/* Table Headers */}
                        <th className="table-headers">Order ID</th>
                        <th className="table-headers">Order Date</th>
                        <th className="table-headers">Ordered By</th>
                        <th className="table-headers">Payment Method</th>
                        <th className="table-headers">Desired Time</th>
                        <th className="table-headers">Status</th>
                        <th className="table-headers">Invoice</th>
                    </thead>

                    {/* Actual Data */}
                    <tbody className="overflow-y-auto">

                        {
                          orders.map((order, index) => {
                                
                                let paymentMethod = JSON.parse(order.order_details).paymentMethod;
                                let time = JSON.parse(order.order_details).desiredTime
                                return (
                                    <>
                                        <tr key={order.order_id} className="hover">
                                            <th className="font-bold font-mono text-pnc">{order.order_id}</th>
                                            <td className="font-serif font-bold">{order.order_date}</td>
                                            <td className="font-semibold text-pnc">{order.id_number}</td>
                                            <td className={`font-bold ${paymentMethod === 'Cash On Delivery' ? "text-pnc" : "text-yellow-700"}`}>{paymentMethod}</td>
                                            <td className="font-bold font-mono">{time}</td>

                                            {/* Order Status */}
                                            <td>
                                                <label 
                                                    onClick={() => {
                                                        
                                                        setStatusModalData(order)
                                                        setOrderID(order.order_id)
                                                    }} 
                                                    className={order.status === 'pending' || order.status === 'preparing' ? 'button-sm' : 'btn btn-sm btn-disabled'} 
                                                    htmlFor={order.status === 'pending' || order.status === 'preparing' ? `${order.order_id}/status` : ''}>{order.status}
                                                </label>
                                            </td>

                                            <td>
                                                <label onClick={() => setInvoiceData(order)} className="button-sm" htmlFor={`${order.order_id}/invoice`}>Invoice</label>
                                            </td>
                                        </tr>

                                        
                                    </>
                                )
                            }) 
                        }
                    </tbody>
                </table> : <div className="flex flex-col justify-center items-center h-full"><p className="font-bold text-3xl w-max m-auto">There are no {dropdownValue} orders.</p></div> }
                
            </div>
            {/* This will show up if the updateDone state is true */}
            {isUpdateDone && <SuccessModal isUpdateDone={isUpdateDone}/>}
        </div>
    )
}

export default AdminOrders
