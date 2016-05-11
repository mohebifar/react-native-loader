import React, { Component, PropTypes, Animated, ART } from 'react-native';
const { Surface } = ART;

import Circle from './animated/Circle';

export default class Bubbles extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    spaceBetween: PropTypes.number,
    bgColor:PropTypes.string
  };

  static defaultProps = {
    spaceBetween: 6,
    size: 11,
    color: '#000',
    bgColor:'transparent'
  };

  state = {
    circles: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0)
    ]
  };

  componentDidMount() {
    this.state.circles.forEach((val, index) => {
      const timer = setTimeout(() => this.animate(index), index * 300);
      this.timers.push(timer);
    });
  }

  componentWillUnmount() {
    this.timers.forEach((timer) => {
      clearTimeout(timer);
    });

    this.unmounted = true;
  }

  timers = [];

  animate(index) {
    Animated
      .sequence([
        Animated.timing(this.state.circles[index], {
          toValue: 1,
          duration: 600
        }),
        Animated.timing(this.state.circles[index], {
          toValue: 0,
          duration: 600
        })
      ])
      .start(() => {
        if (!this.unmounted) {
          this.animate(index);
        }
      });
  }

  renderBubble(index) {
    const { size, spaceBetween, color } = this.props;
    const scale = this.state.circles[index];
    const offset = {
      x: size + index * (size * 2 + spaceBetween),
      y: size
    };

    return (<Circle
      fill={color}
      radius={size}
      scale={scale}
      {...offset}
    />);
  }

  render() {
    const { size, spaceBetween ,bgColor} = this.props;
    const width = size * 6 + spaceBetween * 2;
    const height = size * 2;

    return (<Surface width={width} height={height} style={{backgroundColor:bgColor}}>
      {this.renderBubble(0)}
      {this.renderBubble(1)}
      {this.renderBubble(2)}
    </Surface>);
  }
}
