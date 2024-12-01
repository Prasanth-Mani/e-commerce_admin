import React, { useState, useEffect } from 'react'
import "./Orders.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Orders = () => {
   const [orders, setOrders] = useState([]);

   const fetchAllOrders = async () => {
     try {
       const response = await axios.get('https://e-commerce-backend-et2s.onrender.com/api/order/list');
       if (response.data.success) {
         setOrders(response.data.data);
       } else {
         toast.error('Error fetching orders');
       }
     } catch (error) {
       toast.error('Error fetching orders');
     }
   };

   const statusHandler = async (event, orderId) => {
     console.log(event, orderId)
     const response = await axios.post('https://e-commerce-backend-et2s.onrender.com/api/order/status', {
       orderId,
       status: event.target.value
     })
     if (response.data.success) {
       toast.success("Status updated")
       await fetchAllOrders();
     }
   }

   useEffect(() => {
     fetchAllOrders();
   }, []);

   const styles = {
     container: {
       fontFamily: 'Arial, sans-serif',
       maxWidth: '1200px',
       margin: '0 auto',
       padding: '20px',
       backgroundColor: '#f5f5f5'
     },
     orderList: {
       display: 'flex',
       flexDirection: 'column',
       gap: '15px'
     },
     orderItem: {
       display: 'flex',
       backgroundColor: 'white',
       border: '1px solid #e0e0e0',
       borderRadius: '8px',
       padding: '15px',
       boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
       alignItems: 'center'
     },
     parcelIcon: {
       width: '50px',
       height: '50px',
       marginRight: '15px'
     },
     orderDetails: {
       flex: 1,
       marginRight: '15px'
     },
     productDetails: {
       marginBottom: '10px',
       padding: '10px',
       backgroundColor: '#f9f9f9',
       borderRadius: '6px'
     },
     productImage: {
       width: '50px',
       height: '50px',
       objectFit: 'cover',
       borderRadius: '4px',
       marginTop: '10px'
     },
     statusSelect: {
       padding: '8px',
       borderRadius: '4px',
       border: '1px solid #ccc',
       backgroundColor: '#f8f8f8'
     },
     orderSummary: {
       display: 'flex',
       flexDirection: 'column',
       alignItems: 'flex-end',
       minWidth: '100px'
     }
   };

   return (
     <div style={styles.container}>
       <h3 style={{textAlign: 'center', marginBottom: '20px'}}>Order Page</h3>
       <div style={styles.orderList}>
         {orders.map((order, index) => (
           <div key={index} style={styles.orderItem}>
             <img src={assets.parcel_icon} alt='' style={styles.parcelIcon} />
             <div style={styles.orderDetails}>
               <p className='order-item-food'>
                 {order.items.map((item, itemIndex) => (
                   <div key={itemIndex} style={styles.productDetails}>
                     <span style={{fontWeight: 'bold'}}>{item.name} x {item.quantity}</span>
                     {item.brand && <p>Brand: {item.brand}</p>}
                     {item.category && <p>Category: {item.category}</p>}
                     
                     {item.price && <p>Price: ${item.price}</p>}
                    
                    
                     {item.image && (
                       <img
                         src={`https://e-commerce-backend-et2s.onrender.com/images/${item.image}`}
                         alt={item.name}
                         style={styles.productImage}
                       />
                     )}
                   </div>
                 ))}
               </p>
               <p className='order-item-name' style={{fontWeight: 'bold', marginTop: '10px'}}>
                 {order.address.firstName + " " + order.address.lastName}
               </p>
               <div className="order-item-address" style={{color: '#666', marginBottom: '10px'}}>
                 <p>{order.address.street + ","}</p>
                 <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
               </div>
               <p className='order-item-phone' style={{fontWeight: '500'}}>{order.address.phone}</p>
             </div>
             <div style={styles.orderSummary}>
               <p style={{marginBottom: '10px'}}>Items: {order.items.length}</p>
               <p style={{fontWeight: 'bold', marginBottom: '10px'}}>${order.amount}</p>
               <select
                 style={styles.statusSelect}
                 onChange={(event) => statusHandler(event, order._id)}
                 value={order.status}
               >
                 <option value="Processing">Processing</option>
                 <option value="Out for Delivery">Out for Delivery</option>
                 <option value="Delivered">Delivered</option>
               </select>
             </div>
           </div>
         ))}
       </div>
     </div>
   );
};

export default Orders;