import React from 'react';
import _ from 'lodash';
import TextButton from '../TextButton';
import { customStyles } from '../../styles/index';
import SelectableCard from '../SelectableCard';
import EventCard from '../EventCard';
import FeaturedItem from '../FeaturedItem';

const MAX_SHOWABLE_NFTS = 3;

const Dashboard = (props) => {
  const { history, walletAddress, avatarUrl, id, featuredEvents }  = props;

  console.log(history);
  const getFeaturedNFTs = () => {
    const { featuredNFTs } = props;

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
    
  const onClick = (destination) => {
    switch (destination) {
      case 'goLive': {
        history.push('/go-live');
        break
      }
      case 'avatar': {
        history.push('/avatar');
        break
      }
      case 'tips': {
        history.push('/tips');
        break
      }
      case 'feed': {
        history.push('/feed');
        break
      }
      case 'events': {
        history.push('/events');
        break
      }
      default: {
        break
      }
    
    }
  }

  return (
    <div className="center-container">
      {/* Intro */}
      {walletAddress && (
        <div style={{ fontSize: 14, color: '#ffffff', textAlign: 'center', paddingBottom: 20 }}>
          {walletAddress}
        </div>
      )}

      <h2> Ready to slay? </h2>
      {/* My routes */}
      <div style={{ display: 'grid', justifyContent: 'center', paddingBottom: 15 }}>
        {avatarUrl ? (
          <TextButton 
            style={{}}
            onClick={() => onClick('avatar')} 
            id={id}
            value="My Avatar"
          />
        ) : (
          <TextButton 
            onClick={() => onClick('avatar')} 
            id={id}
            value="Create my avatar"
          />
        )}
        <TextButton 
          onClick={() => onClick('tips')} 
          id={id}
          value="My Tips"
        />
        {/* <TextButton 
          onClick={onClick.bind(this, 'feed')} 
          id={id}
          value="My Feed"
        /> */}
        <TextButton 
          onClick={() => onClick('goLive')} 
          customStyle={customStyles.goLiveButton}
          id={id}
          value="Go Live"
        />
      </div>

      <div className='horizontal-container'>
        <SelectableCard title="Mint an NFT" description="Wearable and power NFTs"/>
        <SelectableCard title="Marketplace" description="Wearable and power NFTs" customStyle={customStyles.yellowSelectableCard}/>

      </div>
      {/* Featured Events */}
        <div style={{ fontSize: 26, color: '#ffffff', textAlign: 'center' }}>{'featured events'}</div>
      <div className="center-container">
        {/* TODO: make this scroll */}
        <div className='horizontal-container'>
          {_.map(featuredEvents, featuredEvent => { return (<EventCard key={featuredEvent.id} featuredEvent={featuredEvent}/>)})}
        </div>
      </div>

      <h3> Featured NFTs</h3>
      <div className="center-container">
        {getFeaturedNFTs()}
      </div>
    </div>
  );
}

export default (Dashboard);