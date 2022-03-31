import ProductCard from "./ProductCard";

const Category = () => {
  return (
    <div className="category-container">
      <h1>Category name</h1>
      <div className="grid">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default Category;
