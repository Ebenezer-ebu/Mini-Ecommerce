import { PureComponent } from "react";
import "./DisplayValue.css";

class DisplayValue extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tick: {},
    };
  }

  componentDidMount() {
    const { selectedAttr } = this.props;
    const keys = Object.keys(selectedAttr);
    if (keys.length > 0) {
      keys.forEach((key) => {
        const obj = selectedAttr[key];
        this.setState((prev) => ({ tick: { ...prev.tick, [key]: obj } }));
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedAttr !== this.props.selectedAttr) {
      const { selectedAttr } = this.props;
      const keys = Object.keys(selectedAttr);
      if (keys.length > 0) {
        keys.forEach((key) => {
          const obj = selectedAttr[key];
          this.setState((prev) => ({ tick: { ...prev.tick, [key]: obj } }));
        });
      }
    }
  }
  render() {
    const { attributes, handleSelectedAtt } = this.props;
    const { tick } = this.state;
    const details = attributes;
    const displayType = details.type;
    return (
      <>
        <p>{details.id.toUpperCase()}:</p>
        <div>
          {details.items.map((item) => (
            <div
              key={item.value}
              className={`display-value ${
                tick[details.id] &&
                tick[details.id][item.value] &&
                displayType === "swatch"
                  ? "display-value-bord"
                  : ""
              }`}
            >
              <button
                className="chosen"
                style={{
                  background:
                    displayType === "swatch"
                      ? item.value
                      : tick[details.id] &&
                        tick[details.id][item.value] &&
                        displayType !== "swatch"
                      ? "black"
                      : "",
                  width: displayType === "swatch" ? "35px" : "",
                  height: displayType === "swatch" ? "35px" : "",
                  color:
                    tick[details.id] &&
                    tick[details.id][item.value] &&
                    displayType !== "swatch"
                      ? "#fff"
                      : "",
                  border: "0.5px solid #8d8f9a",
                }}
                onClick={() =>
                  handleSelectedAtt(
                    item.value,
                    item.id,
                    displayType,
                    details.id
                  )
                }
              >
                <b>{displayType === "swatch" ? "" : item.value}</b>
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default DisplayValue;
