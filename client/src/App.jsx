import "./App.css";
import axios from "axios"
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]) 
  const [isWating, setIsWating] = useState(true)

  async function requsetReadingData(){
    const response = await axios.get("http://localhost:4001/products")
    setData(response.data.data)
    setIsWating(false)
  }

  async function handleDelData(id){
    setIsWating(true)
    const response = await axios.delete(`http://localhost:4001/products/${id}`)
    requsetReadingData()
  }

  useEffect(() => {
    requsetReadingData()
    console.log("wating")
  },[])

  return (
    <div className="App">
      {isWating? <h1>Loading...</h1> : 
      <>
        <div className="app-wrapper">
          <h1 className="app-title">Products</h1>
        </div>
        <div className="product-list">
          {data.map(value => (
            <div key={value.id} className="product">
              <div className="product-preview">
                <img
                  src={value.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {value.name}</h1>
                <h2>Product price: {value.price} Baht</h2>
                <p>Product description: {value.description}</p>
              </div>

              <button className="delete-button" onClick={() => handleDelData(value.id)}>x</button>
            </div>
          ))}
        </div>
      </>
      }
    </div>
  );
}

export default App;
