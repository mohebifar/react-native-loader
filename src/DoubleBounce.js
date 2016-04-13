import React, { Component, PropTypes, Animated, Easing, ART } from 'react-native';
const { Surface } = ART;

import Circle from './animated/Circle';

export default class Pulse extends Component {
  static propTypes = {
    size: PropTypes.number
  };

  state = {
    bounces: [
      new Animated.Value(1),
      new Animated.Value(0)
    ]
  };

  static defaultProps = {
    size: 14,
    color: '#000'
  };

  componentDidMount() {
    this.animate(0);
    setTimeout(() => this.animate(1), 1000);
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  animate(index) {
    Animated
      .sequence([
        Animated.timing(this.state.bounces[index], {
          toValue: 1,
          duration: 1000
        }),
        Animated.timing(this.state.bounces[index], {
          toValue: 0,
          duration: 1000
        })
      ])
      .start(() => {
        if (!this.unmounted) {
          this.animate(index);
        }
      });
  }

  render() {
    const { size, color } = this.props;
    const { bounces: [scale1, scale2] } = this.state;
    const width = size * 2;
    const height = size * 2;

    return (<Surface
      width={width}
      height={height}>
      <Circle
        radius={size}
        fill={color}
        scale={scale1}
        opacity={0.6}
        x={size}
        y={size}
      />
      <Circle
        radius={size}
        fill={color}
        scale={scale2}
        opacity={0.6}
        x={size}
        y={size}
      />
    </Surface>)
  }
}
