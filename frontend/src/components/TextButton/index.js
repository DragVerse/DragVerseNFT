import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hovering: false,
        }
    }

    render() {
        const { 
            customStyle, 
            onClick, 
            id, 
            value 
        } = this.props;
        const { hovering } = this.state;
        return (
            <div 
                onClick={onClick} 
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseLeave}
                id={id}
                style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word',...localStyle.button, ...(hovering && !customStyle ? localStyle.hovering : {}), ...(customStyle ?? {})  }}
                >
                {value}
            </div>
        );
    }

    onMouseOver = () => {
        this.setState({ hovering: true })
    }

    onMouseLeave = () => {
        this.setState({ hovering: false })
    }
}

export default TextButton;

const localStyle = {
    button: {
        cursor: 'pointer',
        background: '#FFEC16',
        color: '#fffff',
        border: '2px solid #ffffff',
        borderRadius: 6,
        padding: '0px 10px',
        margin: '5px 2px',
        textDecoration: 'none',
        width: 120,
        height: 40,
        textAlign: 'center',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontWeight: 600,
        lineHeight: '2.2',
        width: 'flex'

    },
    hovering: {
        border: '2px solid rgb(191, 111, 178)',
    }
}