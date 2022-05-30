import { PureComponent } from "react";
import left from "../assets/left.png";
import right from "../assets/right.png";
import "./Slider.css";

class Slider extends PureComponent {
  state = {
    current: 0,
  };
  nextSlide = () => {
    const { slides } = this.props;
    const { current } = this.state;
    const length = slides.length;

    this.setState({ current: current === length - 1 ? 0 : current + 1 });
  };

  prevSlide = () => {
    const { slides } = this.props;
    const { current } = this.state;
    const length = slides.length;

    this.setState({ current: current === 0 ? length - 1 : current - 1 });
  };
  render() {
    const { slides } = this.props;
    const { current } = this.state;
    return (
      <div className="slider">
        <div className="img-slider">
          {slides.map((slide, index) => {
            return (
              <div key={index} className="mini-image2">
                {index === current && <img src={slide} alt={slide} />}
              </div>
            );
          })}
        </div>
        <div className="indicator">
          {slides.length > 1 ? (
            <>
              <img src={left} alt={left} onClick={this.prevSlide} />
              <img src={right} alt={right} onClick={this.nextSlide} />
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Slider;
