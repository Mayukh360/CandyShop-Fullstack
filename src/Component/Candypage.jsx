import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Candypage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  const [candyData, setCandyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/getData');
      console.log(response.data.data);
      setCandyData(response.data.data);
    };
    fetchData();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(name, price, description, quantity);
    const data = {
      candy: name,
      price: parseFloat(price),
      description,
      quantity: parseFloat(quantity),
    };

    await axios.post('http://localhost:3000/getData', data);
    console.log('Data saved successfully:');
    // Reset the form after successful submission
    setName('');
    setPrice('');
    setDescription('');
    setQuantity('');
  };

  const handleBuy = async (id, quantityToBuy) => {
    try {
      await axios.put(`http://localhost:3000/getData/${id}`, { quantity: quantityToBuy });
      console.log('Quantity updated successfully');
      // Refresh the data after updating quantity
      const response = await axios.get('http://localhost:3000/getData');
      setCandyData(response.data.data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        {/* Form inputs */}
      </form>
      {candyData &&
        candyData.map((item) => (
          <li style={{ margin: '1rem' }} key={item.id}>
            Name: {item.candy} --- Price: {item.price} --- Description: {item.description} -- Quantity: {item.quantity}
            <button onClick={() => handleBuy(item.id, 1)}>BUY ONE</button>
            <button onClick={() => handleBuy(item.id, 2)}>BUY TWO</button>
            <button onClick={() => handleBuy(item.id, 3)}>BUY THREE</button>
          </li>
        ))}
    </div>
  );
}
