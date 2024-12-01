import React, { useEffect, useState } from 'react'
import "./List.css"
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const url="https://e-commerce-backend-8s1b.onrender.com";
  const[list,setList]=useState([]);

  const fetchList=async ()=>{
    const response=await axios.get(`${url}/api/products/list`);

    console.log(response.data);
    if(response.data.success){

      setList(response.data.data)

    }else{
   toast.error("failed to fetch food list")
    }
  }

const removeFood= async(foodId)=>{
  const response=await axios.post(`${url}/api/products/remove`,{id:foodId});
  fetchList()
  if(response.data.success){
  toast.success("Product removed succees")
  }else{
    toast.error("Fails To remove food")
  }

  
}

 useEffect(
  ()=>{
fetchList()

  },[]);

  return (
    <div  className='list add flex-col'>
      <p>All Foods List</p>

<div className="list-table">
    <div className="list-table-format title">
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b>Action</b>
    </div>

    {
      list.map((item,index)=>{
return(
  <div key={index} className='list-table-format'>
  
  <img src={`${url}/images/${item.image}`} alt="" />
  <p>{item.name}</p>
  <p>{item.category}</p>
  <p>${item.price}</p>
  <p className='cursor' onClick={()=>removeFood(item._id)}>x </p>



  </div>
)
      })
    }
  </div>   
      

    </div>
  )
}

export default List