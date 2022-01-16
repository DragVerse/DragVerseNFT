import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IconButton extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        active: PropTypes.bool,
        id: PropTypes.string,
        icon: PropTypes.string,
    }

    render() {
        const { onClick, active, id, icon } = this.props;
        return (
            <div 
            onClick={onClick} 
            id={id}
            style={{ ...localStyle.button, ...(active ? localStyle.active : {}) }}
            >
                {icon && <img src={icon}></img>}
            </div>
        );
    }
}

export default IconButton;

const localStyle = {
    button: {
        cursor: 'pointer',
        borderRadius: 14,
        padding: 15,
        textDecoration: 'none',
        width: 60,
        height: 60,
        textAlign: 'center',
        textOverflow: 'hidden',
        border: '2px solid rgb(98, 91, 193)',

    },
    active: {
        border: '2px solid rgb(191, 111, 178)',
    }
}