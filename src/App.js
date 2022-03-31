import { Component } from "react";
import Header from "./components/Header";
import Category from "./components/Category";
import CartModal from "./components/CartModal";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Category />
      </div>
    );
  }
}

export default App;
