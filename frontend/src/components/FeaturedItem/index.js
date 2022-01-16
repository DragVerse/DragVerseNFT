import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { customStyles } from '../../styles/index'

const DEFAULT_WIDTH = 250
const DEFAULT_HEIGHT = DEFAULT_WIDTH * (6/16)

class FeaturedItem extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        active: PropTypes.bool,
        backgroundColor: PropTypes.string,
        id: PropTypes.string,
        iconUrl: PropTypes.string,
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
            iconUrl,
            id, 
            width,
            title,
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
                <div style={{...localStyle.imgContainer, backgroundImage: `url(${iconUrl})` }}/>
                <div style={{ width: '70%', paddingLeft: 15 }}>
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

export default FeaturedItem;

const localStyle = {
    container: {
        backgroundSize: '120%',
        backgroundPosition: 'center',
        color: '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        height: 50,
        lineHeight: '50%',
        margin: '5px 8px',
        padding: '0px 10px',
        textAlign: 'center',
        textDecoration: 'none',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: 180,

    
    },
    hovering: {
        border: '2px solid rgb(191, 111, 178)',
    },
    imgContainer: {
        backgroundSize: '250%',
        backgroundPosition: 'center',
        borderRadius: 10,
        width: 80,
        height: 80,
    },
    titleText: {
        fontSize: 18, 
        lineHeight: 2.1,
        fontWeight: 600,
        paddingBottom: 3,
        textAlign: 'left',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',

    },
    descriptionText: {
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 1.5,
        textAlign: 'left',
        textOverflow: 'wrap',
        whiteSpace: 'normal',

    }
    
}