import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Surface } from '@react-native-community/art';

import Circle from './animated/Circle';

export default class Pulse extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string
  };

  static defaultProps = {
    size: 14,
    color: '#000'
  };

  state = {
    bounces: [
      new Animated.Value(1),
      new Animated.Value(0)
    ]
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
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(this.state.bounces[index], {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false
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

    return (<Surface width={width} height={height}>
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
    </Surface>);
  }
}
