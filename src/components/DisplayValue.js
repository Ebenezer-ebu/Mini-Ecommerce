import { useState, useEffect } from "react";
import { FcCheckmark } from "react-icons/fc";

const DisplayValue = (props) => {
  const { attributes, handleSelectedAtt, selectedAttr } = props;
  const [tick, setTicked] = useState({});
  const details = attributes;
  let displayType = details.type;
  useEffect(() => {
    const keys = Object.keys(selectedAttr);
    if (keys.length > 0) {
      keys.forEach((key) => {
        let obj = selectedAttr[key];
        setTicked((prev) => ({ ...prev, [key]: Object.keys(obj)[0] }));
      });
    }
  }, [selectedAttr]);
  return (
    <>
      <p>{details.id.toUpperCase()}:</p>
      <div>
        {details.items.map((item) => (
          <button
            key={item.value}
            style={{
              background: displayType === "swatch" ? item.value : "",
              border: displayType === "swatch" ? "none" : "",
            }}
            className="chosen"
            onClick={() =>
              handleSelectedAtt(item.value, item.id, displayType, details.id)
            }
          >
            {displayType === "swatch" ? item.id : item.value}
            {(tick[details.id] && tick[details.id] === item.value) ||
            tick[details.id] === item.id ? (
              <FcCheckmark className="tick" />
            ) : null}
          </button>
        ))}
      </div>
    </>
  );
};



export default DisplayValue;
