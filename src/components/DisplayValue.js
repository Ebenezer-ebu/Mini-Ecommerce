import { PureComponent } from "react";

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
          const obj = selectedAttr[key];
          if (Object.keys(obj).length > 0) {
            this.setState((prev) => ({
              ...prev,
              tick: { ...prev.tick, [key]: Object.keys(obj)[0] },
            }));
          } else {
            const { tick } = this.state;
            const { [key]: value, ...rest } = tick;
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
    const displayType = details.type;
    return (
      <>
        <p>{details.id.toUpperCase()}:</p>
        <div>
          {details.items.map((item) => (
            <div
              key={item.value}
              style={{
                marginRight: "10px",
                padding: "2px",
                border:
                  (tick[details.id] && tick[details.id] === item.value) ||
                  tick[details.id] === item.id
                    ? "3px solid #5ece7b"
                    : "",
              }}
            >
              <button
                style={{
                  background: displayType === "swatch" ? item.value : "",
                  border: "0.5px solid #8D8F9A",
                  width: displayType === "swatch" ? "35px" : "",
                  height: displayType === "swatch" ? "35px" : "",
                }}
                className="chosen"
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
