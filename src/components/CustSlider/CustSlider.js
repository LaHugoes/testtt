
require('rc-slider/assets/index.css');

const React = require('react');
const Slider = require('rc-slider');
const Tooltip = require('rc-tooltip');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;
const style = { margin: 15 };

//hier haben wir die logik für den Slider
const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle {...restProps} />
    </Tooltip>
  );
};

class CustSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //hier wird er initialisiert und die Slider Preis-grenzen gesetzt
      lowerBound: 0,
      upperBound: 50,
      value: [0, 100]
    };
  }

  onLowerBoundChange = (e) => {
    this.setState({ lowerBound: +e.target.value });
  }

  onUpperBoundChange = (e) => {
    this.setState({ upperBound: +e.target.value });
  }

  onSliderChange = (value) => {
    if (typeof this.props.onChange === 'function') {
        this.props.onChange({lowerBound: value[0]*50, upperBound: value[1]*50});
    }
    this.setState({
      value,
    });
  }

  handleApply = () => {
    const { lowerBound, upperBound } = this.state;
    this.setState({ value: [lowerBound, upperBound] });
  }

  render() {
    return (
      <div style={style}>
<<<<<<< HEAD
        <Range allowCross={false} value={this.state.value} onChange={this.onSliderChange}  tipFormatter={value => `${value*50}`} />
=======
        <Range allowCross={false} value={this.state.value} onChange={this.onSliderChange}  tipFormatter={value => `${value*50}€`} />
>>>>>>> 11216cf78e4fee2d164ee14576b56b65a5083906
      </div>
    );
  }
}

CustSlider.propTypes = {
  onChange: React.PropTypes.func
};

export default CustSlider;
