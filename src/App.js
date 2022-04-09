import { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Category from "./components/Category";
import ProductDescription from "./components/ProductDescription";

class App extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/product/:id" element={<ProductDescription />} />
        </Routes>
      </div>
    );
  }
}

export default App;
