import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    useWalletButton,
    useWeb3Wallet,
  } from "@zoralabs/simple-wallet-provider";
import { Button } from 'reactstrap';

export const ConnectWallet = (props) => {
    const { buttonAction, actionText, connectedInfo } = useWalletButton();
    useEffect(() => {
        if (connectedInfo) {
            console.log(actionText);
            console.log(connectedInfo);
            props.updateConnectedInfo(connectedInfo);
            props.history.push('/avatar')
        }
    }, [connectedInfo]);
  
    return (
      <div style={{textAlign: 'center'}}>
        {/* <h1>{`${
          connectedInfo === undefined
            ? "To List your NFT Connect your wallet!"
            : connectedInfo
        }`}</h1> */}
        <Button style={localStyle.button} onClick={() => buttonAction()}>
          {actionText}
        </Button>
      </div>
    );
  };

class WalletLinkButton extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        active: PropTypes.bool,
        id: PropTypes.string,
        value: PropTypes.string,
        customStyle: PropTypes.object,
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
            id, 
            value,
            disabled
        } = this.props;
        const { hovering } = this.state;
        return (
          <div 
            disabled={disabled ?? false}
            onClick={onClick} 
            onMouseOver={this.onMouseOver}
            onMouseLeave={this.onMouseLeave}
            id={id}
            style={{ cursor:'pointer',...localStyle.button, ...(hovering && !customStyle ? localStyle.hovering : {}), ...(customStyle ?? {})  }}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={localStyle.add_container}>+</div>
                <div style={localStyle.button_text}>{value}</div>
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

export default WalletLinkButton;

const localStyle = {
    button: {
        background: 'rgba(0, 0, 0, 0.5)',
        border: '2px solid transparent',
        borderRadius: 16,
        color: '#ffffff',
        cursor: 'pointer',
        fontWeight: 600,
        height: 100,
        lineHeight: '2.2',
        margin: '5px 2px',
        padding: '0px 10px',
        textAlign: 'center',
        textDecoration: 'none',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: 350,
    },
    add_container: {
        borderRadius: 16,
        background: 'rgba(255, 255, 255, .15)',
        height: 78,
        width: 78,
        color: 'var(--white)',
        fontSize: 36,
        fontWeight: 300,
        marginRight: 30,
        textAlign: 'center',
        transform: 'translateY(9px)',
        verticalAlign: 'middle',
    },
    button_text: {
        textAlign: 'left',
        fontSize: 24,
        verticalAlign: 'middle',
        textOverflow: 'ellipsis',
        marginTop: 22,
    },
    hovering: {
        border: '2px solid rgb(191, 111, 178)',
    }
}