import { PureComponent } from "react";
import { connect } from "react-redux";
import { client } from "../index";
import ProductCard from "./ProductCard";
import { GET_PRODUCTS_BY_CATEGORY } from "../utils/graphqlApi";
import "./Category.css"

class Category extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayData: [],
      loading: false,
    };
  }
  componentDidMount() {
    const { state } = this.props;
    const { category } = state;
    const { defaultCategory } = category;
    if (!defaultCategory || this.state.displayData.length === 0) {
      this.setState((prev) => ({ ...prev, loading: true }));
    }
  }

  componentDidUpdate(prevProps) {
    const { state } = this.props;
    const { category } = state;
    const { defaultCategory } = category;
    if (defaultCategory) {
      this.setState((prev) => ({ ...prev, loading: false }));

      client
        .query({
          query: GET_PRODUCTS_BY_CATEGORY,
          variables: {
            input: {
              title: defaultCategory,
            },
          },
        })
        .then((result) => {
          if (result.loading) return <p>Loading...</p>;
          if (result.error) return <p>Error Loading Product...</p>;
          if (result.data)
            this.setState({
              displayData: result.data,
            });
        });
    }
  }
  render() {
    const { state } = this.props;
    const { category: category2 } = state;
    const { displayData, loading } = this.state;
    return (
      <div className="container">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="product-content">
            <h1>
              {`${category2.defaultCategory
                ?.split("")[0]
                .toUpperCase()}${category2.defaultCategory?.slice(1)}`}
            </h1>
            <div className="grid">
              {displayData.category &&
                displayData.category.products.map((data) => (
                  <ProductCard key={data.id} data={data} />
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps)(Category);
