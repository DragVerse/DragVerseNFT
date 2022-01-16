import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TextButton from '../TextButton';

import FeaturedItem from '../FeaturedItem';
import WalletLinkButton, {ConnectWallet} from '../WalletLinkButton';

const ONBOARDING_STEPS = ['connect', 'scan', 'confirm', 'complete'];

class Onboarding extends Component {
    static propTypes = {
        user: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            onboardingStep: 0,
            ageAgreed: false,
            termsAgreed: false,
            walletConnect: false,
        }
    }

    componentDidMount() {
        const { user } = this.props;

        if (user?.walletAaddress) {
            this.setState({
                onboardingStep: ONBOARDING_STEPS.indexOf('confirm'),
            })
            if (!user?.acceptedTerms) {
                this.setState({
                    onboardingStep: ONBOARDING_STEPS.indexOf('connect'),
                })
            } else {
                this.setState({
                    onboardingStep: ONBOARDING_STEPS.indexOf('complete'),
                })
            }
        }
    }

    updateConnectedInfo = (info) => {
        console.log(info);
        this.setState({walletConnect: false})
    }

    render() {
        const { 
            active, 
            featuredEvents,
            featuredNFTs,
            id, 
            icon, 
            user 
        } = this.props;

        const { onboardingStep } = this.state;

        return (
            <div className="center-container">
                {/* Intro */}
                <div style={{ display: 'grid', transform: 'translateX(20%)', paddingBottom: 20 }}>
                   <ul class="progressbar">
                     <li class={`${onboardingStep >= 0 ? 'active' : '' }`}>Select</li>
                     <li class={`${onboardingStep >= 1 ? 'active' : '' }`}>Scan</li>
                     <li class={`${onboardingStep >= 2 ? 'active' : '' }`}>Confirm</li>
                   </ul>

                </div>
                {onboardingStep === ONBOARDING_STEPS.indexOf('connect') && (
                    <div>
                <div style={localStyles.description_text}> Login with Metamask </div>
                <div style={{...localStyles.help_text, fontWeight: 600, paddingBottom: 5 }}>Don't have a wallet?</div>
                <div style={localStyles.help_text}>Create a Metamask wallet{' '}
                    <a 
                href='https://metamask.io/download.html' 
                target='_blank' 
                rel='noreferrer noopener'
                style={{...localStyles.hyperlink, cursor: 'pointer', zIndex: 100}} 
                >here
                </a>
                </div>
                {this.state.walletConnect ? (<ConnectWallet history={this.props.history} updateConnectedInfo={(info) => this.updateConnectedInfo.bind(info)}/>) : null}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 15 }}>
                    {!this.state.walletConnect ? (
                        <WalletLinkButton 
                            onClick={this.onClick.bind(this, 'metamask')} 
                            id={id}
                            value="🦊 Metamask"
                        />
                    ) : <></>}
                    <WalletLinkButton 
                    disabled={true}
                    onClick={this.onClick.bind(this, 'other')} 
                    id={id}
                    value="Other - Coming soon!"
                />
                </div>
                </div>
                )}
                {onboardingStep === ONBOARDING_STEPS.indexOf('scan') && (
                    <div></div>
                )}
                {onboardingStep === ONBOARDING_STEPS.indexOf('confirm') && (
                    <div>
                        <div style={localStyles.description_text}> Terms of Service </div>
                        <div style={{...localStyles.help_text, display: 'table-row', width: 200 }}>Please take a few minutes to read and understand the{' '}
                    <a 
                href='https://metamask.io/download.html' 
                target='_blank' 
                rel='noreferrer noopener'
                style={localStyles.hyperlink} 
                >Stacks Terms of Service
                </a>
                . To continue, you'll need to accept the terms services by checking the boxes.
                </div>
                        <label class="container">I am at least <b>13 years old</b>
  <input type="checkbox" onClick={this.onCheckBox.bind(this, 'ages')}/>
  <span class="checkmark"></span>
</label>

<label class="container">I agree <b>to terms of service</b>
  <input type="checkbox" onClick={this.onCheckBox.bind(this, 'terms')}/>
  <span class="checkmark"></span>
</label>
                    </div>
                )}
                <div className="center-container" style={{ display: 'flex'}}>
                <TextButton 
                        onClick={this.onClick.bind(this, 'next')} 
                        id={id}
                        value={onboardingStep === ONBOARDING_STEPS.indexOf('confirm') ? "Let's go" : "Next"}
                        customStyle={localStyles.continue_button}
                    />
                </div>
                <div style={{paddingBottom: '50px'}} />
            </div>

        );
    }

    getFeaturedNFTs() {
        const { featuredNFTs } = this.props;

        let featuredNFTsToRender = [];
        let i = 0

        while (i < MAX_SHOWABLE_NFTS && i < featuredNFTs?.length) {
            const featuredNFT = featuredNFTs[i];
            const price = `${featuredNFT.currentEthPrice} ETH`;
            featuredNFTsToRender.push(<FeaturedItem key={featuredNFT.id} iconUrl={featuredNFT.imageUrl} title={featuredNFT.title} description={price}/>)
            i++;
        }

        return featuredNFTsToRender;
    }

    onCheckBox(type) {
        switch(type) {
            case 'age': {
                return this.setState({ ageAgreed: !this.state.ageAgreed })
            }
            case 'terms': {
                return this.setState({ termsAgreed: !this.state.termsAgreed })
            }
            default: {
                return
            }
        }
    }
        

    onClick(destination) {
        const { 
            ageAgreed,
            onboardingStep,
            termsAgreed,
        } = this.state

        switch (destination) {
            case 'next': {
                if (onboardingStep === ONBOARDING_STEPS.indexOf('confirm')) {
                    if (ageAgreed && termsAgreed) {
                        // update user and route to dashboard
                    }
                    // go to dashboard
                    history.push('/dashboard');
                } else if (onboardingStep === ONBOARDING_STEPS.indexOf('connect')) {
                    this.setState({ onboardingStep: onboardingStep + 1})
                }
                break
            }
            case 'metamask': {
                console.log('launch metamask');
                this.setState({walletConnect: true});
            }
            default: {
                break
            }
        
        }
    }

}

export default Onboarding;

const localStyles = {
    body_container: {
        height: 200
    },
    description_text: {
        color: 'var(--white)',
        fontSize: '1.7rem',
        fontWeight: 500,
        textAlign: 'center',
        paddingBottom: 25,
    },
    help_text: {
        // width: 300,
        color: 'var(--white)',
        fontSize: 13,
        fontWeight: 100,
        textAlign: 'center',
        paddingBottom: 25,
    },
    hyperlink: {
        color: 'var(--white)',
    },
    continue_button: {
        width: 350,
        background: 'rgb(124, 92, 247)',
        border: 'none',
    }
}