/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./Orders.css"
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  }

  const statusHandler =async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", { 
      orderId,
      status: event.target.value
     })
     if(response.data.success) {
      await fetchAllOrders()
     }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.flat().map((item, index) => { 
                  return (
                    <span key={index}>
                      {item?.name ? `${item.name} x ${item.quantity}` : "Unnamed Item x N/A"}
                      {index !== order.items.flat().length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </p>
              <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>₹{order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
