
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
      untereGrenze: 0,
      obereGrenze: 50,
      value: [0, 100]
    };
  }

  untereGrenzeWechsel = (e) => {
    this.setState({ untereGrenze: +e.target.value });
  }

  obereGrenzeWechsel = (e) => {
    this.setState({ obereGrenze: +e.target.value });
  }

  sliderWechsel = (value) => {
    if (typeof this.props.onChange === 'function') {
        this.props.onChange({untereGrenze: value[0]*50, obereGrenze: value[1]*50});
    }
    this.setState({
      value,
    });
  }

  wechselAnwenden = () => {
    const { untereGrenze, obereGrenze } = this.state;
    this.setState({ value: [untereGrenze, obereGrenze] });
  }

  render() {
    return (
      <div style={style}>
        <Range allowCross={false} value={this.state.value} onChange={this.sliderWechsel}  tipFormatter={value => `${value*50}€`} />
      </div>
    );
  }
}

CustSlider.propTypes = {
  onChange: React.PropTypes.func
};

export default CustSlider;
//Jil