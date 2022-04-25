import { Component } from "react";
import { FcCheckmark } from "react-icons/fc";

class DisplayValue extends Component {
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
        let obj = selectedAttr[key];
        this.setState((prev) => ({
          ...prev,
          tick: { [key]: Object.keys(obj)[0] },
        }));
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedAttr !== this.props.selectedAttr) {
      const { selectedAttr } = this.props;
      const keys = Object.keys(selectedAttr);
      if (keys.length > 0) {
        keys.forEach((key) => {
          let obj = selectedAttr[key];
          if (Object.keys(obj).length > 0) {
            this.setState((prev) => ({
              ...prev,
              tick: { ...prev.tick, [key]: Object.keys(obj)[0] },
            }));
          } else {
            let { tick } = this.state;
            let { [key]: value, ...rest } = tick;
            this.setState((prev) => ({
              ...prev,
              tick: { ...rest },
            }));
          }
        });
      }
    }
  }

  render() {
    const { attributes, handleSelectedAtt } = this.props;
    const { tick } = this.state;
    const details = attributes;
    let displayType = details.type;
    return (
      <>
        <p>{details.id.toUpperCase()}:</p>
        <div>
          {details.items.map((item) => (
            <button
              key={item.value}
              style={{
                background: displayType === "swatch" ? item.value : "",
                border: displayType === "swatch" ? "1px solid #8D8F9A" : "",
                width: displayType === "swatch" ? "35px" : "",
                height: displayType === "swatch" ? "35px" : "",
              }}
              className="chosen"
              onClick={() =>
                handleSelectedAtt(item.value, item.id, displayType, details.id)
              }
            >
              {displayType === "swatch" ? "" : item.value}
              {(tick[details.id] && tick[details.id] === item.value) ||
              tick[details.id] === item.id ? (
                <FcCheckmark className="tick" />
              ) : null}
            </button>
          ))}
        </div>
      </>
    );
  }
}

export default DisplayValue;
