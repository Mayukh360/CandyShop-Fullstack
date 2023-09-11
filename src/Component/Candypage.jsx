import React, { useEffect, useState } from "react";
import axios from "axios";
import  './Candypage.css';

export default function Candypage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const [candyData, setCandyData] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/getData");
    console.log(response.data.data);
    setCandyData(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(name, price, description, quantity);
    const data = {
      candy: name,
      price: parseInt(price),
      description,
      quantity: parseInt(quantity),
    };

    await axios.post("http://localhost:3000/getData", data);
    // console.log("Data saved successfully:", response.data);
    // Reset the form after successful submission
    setName("");
    setPrice("");
    setDescription("");
    setQuantity("");

    fetchData();
  };

  const handleBuy = async (id, quantityToBuy) => {
    try {
      await axios.put(`http://localhost:3000/getData/${id}`, {
        quantity: quantityToBuy,
      });
      console.log("Quantity updated successfully");
      // Refresh the data after updating quantity
      fetchData()
      
    } catch (error) {
      alert("Candy quantity not enough");
    }
  };
  const dltHandler=async(id)=>{
    await axios.delete(`http://localhost:3000/getData/${id}`)
    fetchData()
  }

  return (
    <div className="container">
      <form onSubmit={submitHandler} className="form">
        <label className="label">Candy Name</label>
        <input
          type="text"
          name="candy"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      {candyData &&
        candyData.map((item) => (
          <li className="item" style={{ margin: "1rem" }} key={item.id}>
            Name: {item.candy} --- Price: {item.price} --- Description:{" "}
            {item.description} -- Quantity: {item.quantity}
            <button className="item__buttons" onClick={() => handleBuy(item.id, 1)}>BUY ONE</button>
            <button className="item__buttons"  onClick={() => handleBuy(item.id, 2)}>BUY TWO</button>
            <button className="item__buttons" onClick={() => handleBuy(item.id, 3)}>BUY THREE</button>
            <button className="item__button" onClick={() => dltHandler(item.id)}>DELETE</button>
          </li>
        ))}
    </div>
  );
}
