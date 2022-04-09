import { connect } from "react-redux";
import ProductCard from "./ProductCard";

const Category = (props) => {
  const { dispatch, state } = props;
  const { category } = state;
  const displayData = category.categories?.filter(
    (cate) => cate.name === category.defaultCategory
  );
  return (
    <div className="container">
      <h1>Category name</h1>
      <div className="grid">
        {displayData &&
          displayData[0].products.map((data) => (
            <ProductCard key={data.id} data={data} />
          ))}
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(Category);
