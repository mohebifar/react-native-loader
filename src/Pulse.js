import React, { Component, PropTypes, Animated, Easing, ART } from 'react-native';
const { Surface } = ART;

import Circle from './animated/Circle';

export default class Pulse extends Component {
  static propTypes = {
    size: PropTypes.number
  };

  state = {
    pulse: new Animated.ValueXY({
      x: 0.5,
      y: 1
    })
  };

  static defaultProps = {
    size: 14,
    color: '#000'
  };

  componentDidMount() {
    this.animate();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  animate() {
    Animated
      .timing(this.state.pulse, {
        toValue: {
          x: 1,
          y: 0
        },
        duration: 1000
      })
      .start(() => {
        if (!this.unmounted) {
          this.state.pulse.setValue({
            x: 0,
            y: 1
          });
          this.animate();
        }
      });
  }

  render() {
    const { size, color } = this.props;
    const { pulse } = this.state;
    const width = size * 2;
    const height = size * 2;

    return (<Surface
      width={width}
      height={height}>
      <Circle
        radius={size}
        fill={color}
        scale={pulse.x}
        opacity={pulse.y}
        x={size}
        y={size}
      />
    </Surface>)
  }
}
