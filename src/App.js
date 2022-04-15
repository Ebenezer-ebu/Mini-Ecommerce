import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Category from "./components/Category";
import ProductDescription from "./components/ProductDescription";
import CartPage from "./components/CartPage";
import CheckOut from "./components/CheckOut";

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
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </div>
    );
  }
}

export default App;
