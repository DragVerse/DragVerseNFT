import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { customStyles } from '../../styles/index'

const DEFAULT_WIDTH = 250
const DEFAULT_HEIGHT = DEFAULT_WIDTH * (6/16)

class SelectableCard extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        active: PropTypes.bool,
        backgroundColor: PropTypes.string,
        id: PropTypes.string,
        value: PropTypes.string,
        customStyle: PropTypes.object,
        height: PropTypes.number,
        width: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
    }

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
            height,
            id, 
            title,
            width,
            value,
            description 
        } = this.props;
        const { hovering } = this.state;

        const heightToUse = height ? height : DEFAULT_HEIGHT
        const widthToUse = width ? width : DEFAULT_WIDTH

        return (
            <div 
            onClick={onClick}
            id={id}
            style={{ ...localStyle.container, ...(hovering ? localStyle.hovering : {}),  height: heightToUse, width: widthToUse, ...(customStyle ?? {})  }}
            >
                <div style={localStyle.imgContainer}>
                    <img src='https://www.w3schools.com/howto/img_avatar.png' alt='avatar' style={{ width: '80%' }}></img>
                </div>
                <div style={{ width: '70%', paddingTop: '10%', paddingLeft: 7 }}>
                    <p style={localStyle.titleText}>{title}</p>
                    <p style={localStyle.descriptionText}>{description}</p>
                    </div>
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

export default SelectableCard;

const localStyle = {
    container: {
        display: 'flex',
        cursor: 'pointer',
        borderRadius: 6,
        padding: '0px 10px',
        margin: '5px 8px',
        textDecoration: 'none',
        width: 120,
        height: 40,
        textAlign: 'center',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: '#ffffff',
        lineHeight: '50%',
        ...customStyles.purpleSelectableCard,

    
    },
    hovering: {
        border: '2px solid rgb(191, 111, 178)',
    },
    imgContainer: {
        margin: '5px 5px',
        width: '30%',
        transform: 'translateY(18%)',
    },
    titleText: {
        fontSize: 18, 
        lineHeight: 1,
        fontWeight: 600,
        paddingBottom: 3,
        textAlign: 'left',
        textOverflow: 'ellipsis',

    },
    descriptionText: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.2,
        textAlign: 'left',
        textOverflow: 'wrap',
        whiteSpace: 'normal',

    }
    
}