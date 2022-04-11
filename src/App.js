import { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Category from "./components/Category";
import ProductDescription from "./components/ProductDescription";
import CartPage from "./components/CartPage";

class App extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/product/:id" element={<ProductDescription />} />
          <Route path="/view-bag" element={<CartPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
