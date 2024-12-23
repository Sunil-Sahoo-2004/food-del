/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
            console.log('Order Data:', response.data.data);  // Debug log to check order structure
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.length > 0 ? (
                    data.map((order, index) => {
                        const flattenedItems = order.items.flat();  // Flatten the nested arrays
                        return (
                            <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="Parcel Icon" />
                                <p>
                                    {flattenedItems.length > 0 ? (
                                        flattenedItems.map((item, idx) => 
                                            `${item?.name ?? 'No name'} x ${item?.quantity ?? 'No quantity'}`
                                        ).join(', ')
                                    ) : (
                                        "No items available"
                                    )}
                                </p>
                                <p>₹{order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        )
                    })
                ) : (
                    <p>No orders available</p>
                )}
            </div>
        </div>
    );
}

export default MyOrders;
