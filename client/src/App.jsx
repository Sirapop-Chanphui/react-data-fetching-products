import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    let response = await axios.get("http://localhost:4001/products");
    setProducts(response.data.data);
  };

  const deleteData = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    setProducts(products.filter((product) => product.id !== id));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>

        <div className="product-list"></div>
        {products.map((product) => {
          return (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price:{product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => deleteData(product.id)}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
