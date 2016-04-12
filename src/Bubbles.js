import React, { Component, PropTypes, Animated, Easing, ART } from 'react-native';
const { Surface } = ART;

import Circle from './animated/Circle';

export default class Bubbles extends Component {
    static propTypes = {
        size: PropTypes.number,
        spaceBetween: PropTypes.number
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
            var timer = setTimeout(() => this.animate(index), index * 250);
            this.timers.push(timer);
        });
    }

    timers = [];

    componentWillUnmount() {
        this.timers.forEach((timer) => {
            clearTimeout(timer);
        });

        this.unmounted = true;
    }

    times = [0, 0, 0];

    animate(index) {
        Animated
            .sequence([
                Animated.timing(this.state.circles[index], {toValue: this.props.size, duration: 650}),
                Animated.timing(this.state.circles[index], {toValue: 0, duration: 650})
            ])
            .start(() => {
                if (!this.unmounted) {
                    this.animate(index);
                }
            });
    }

    static defaultProps = {
        spaceBetween: 6,
        size: 11
    };

    renderBubble(index) {
        const { size, spaceBetween } = this.props;
        const radius = this.state.circles[index];
        const offset = {
            x: size + index * (size * 2 + spaceBetween),
            y: size
        };

        return (<Circle
            fill="#000"
            radius={radius}
            {...offset}
        />);
    }

    render() {
        return (<Surface
            width={100}
            height={40}>
            {this.renderBubble(0)}
            {this.renderBubble(1)}
            {this.renderBubble(2)}
        </Surface>)
    }
}
