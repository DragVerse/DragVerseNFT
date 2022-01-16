import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { customStyles } from '../../styles/index'

const DEFAULT_WIDTH = 350
const DEFAULT_HEIGHT = DEFAULT_WIDTH * (9/16)

const EXAMPLE_EVENT = {
    type: 'live-chat',
    title: 'Shangela',
    ranking: 1,
    imageUrl: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2022%2F01%2F12%2FDrag-Race.jpg'
}

class EventCard extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        backgroundColor: PropTypes.string,
        id: PropTypes.string,
        customStyle: PropTypes.object,
        height: PropTypes.number,
        width: PropTypes.number,
        featuredEvent: PropTypes.object,
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
            featuredEvent,
            height,
            id, 
            width,
        } = this.props;
        const { hovering } = this.state;

        console.log('event props', this.props)

        const heightToUse = height ? height : DEFAULT_HEIGHT
        const widthToUse = width ? width : DEFAULT_WIDTH
        const rankingText = featuredEvent.ranking ? `NO. ${featuredEvent.ranking}` : 'TOP'

        const ranking = featuredEvent?.ranking  ? `NO. ${featuredEvent?.ranking}` : 'TOP'
        const title = (featuredEvent?.title ?? 'Special Event')
        let type = 'Live Chat'
        switch (featuredEvent?.type) {
            case 'live-chat': {
                type = ('Live Chat').toUpperCase()
                break
            }
            default:{
                break
            }
        }

        return (
            <div 
            onClick={onClick}
            id={id}
            style={{ 
                background: `linear-gradient(rgba(0, 0, 0, .4), rgba(0, 0, 0, .4)), url(${featuredEvent.imageUrl})`,
                ...localStyle.imageContainer, 
                height: heightToUse, 
                width: widthToUse, 
                ...(customStyle ?? {})
            }}
            >
                <div style={localStyle.contentContainer}>
                    <div style={localStyle.rankingContainer}>
                        <p style={localStyle.nowText}>NOW</p>
                        <p style={localStyle.rankText}>{ranking}</p>
                    </div>
                    <div style={{ width: '70%', paddingTop: '15%', paddingLeft: 7 }}>
                        <p style={localStyle.titleText}>{type}</p>
                        <p style={localStyle.descriptionText}>{title}</p>
                    </div>
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

export default EventCard;

const localStyle = {
    imageContainer: {
        backgroundPosition: 'center',
        backgroundSize: '175%',
        borderRadius: 6,
        color: '#ffffff',
        cursor: 'pointer',
        height: 40,
        margin: '5px 10px',
        textAlign: 'center',
        textDecoration: 'none',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: 120,
        
    },
    contentContainer: {
        padding: '0px 10px',
        margin: '0 8px',
        display: 'flex',
        flexDirection: 'column',
        lineHeight: '50%',
        
    },
    innerContainer: {
        height: '50%',
        width: '100%'
    },
    hovering: {
        border: '2px solid rgb(191, 111, 178)',
    },
    rankingContainer: {
        width: 65,
        height: 65,
        transform: 'translateY(18%)',
        paddingBottom: '20px',
        backgroundColor: 'var(--white)',
        borderRadius: 12,
    },
    rankText: {
        color: 'black',
        fontSize: '1.1em',
        fontWeight: '600',
        textAlign: 'left',
        padding: '0 8px',
        transform: 'translateY(-30%)',

    },
    nowText: {
        color: 'gray',
        fontSize: '1.1em',
        paddingLeft: 8,
        textAlign: 'left',
        transform: 'translateY(30%)',
    },
    titleText: {
        fontSize: 17, 
        lineHeight: 1.5,
        fontWeight: 200,
        paddingBottom: 3,
        textAlign: 'left',
        textOverflow: 'ellipsis',

    },
    descriptionText: {
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 1.2,
        textAlign: 'left',
        textOverflow: 'wrap',
        whiteSpace: 'normal',

    }
    
}