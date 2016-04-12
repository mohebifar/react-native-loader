import React, { Component, PropTypes, ART } from 'react-native';
const { Shape } = ART;
const { Path } = ART;

export default class Circle extends Component {
    static propTypes = {
        radius: PropTypes.number.isRequired,
        offset: PropTypes.shape({
            left: PropTypes.number,
            top: PropTypes.number
        })
    };

    render() {
        const { radius } = this.props;

        const path = Path()
            .moveTo(0, -radius)
            .arc(0, radius * 2, radius)
            .arc(0, radius * -2, radius)
            .close();

        return <Shape {...this.props} d={path}/>;
    }
}
