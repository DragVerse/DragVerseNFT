import React, {useState, useEffect} from 'react';
import styled from "@emotion/styled";
import { CONTRACT_ADDRESSES, NETWORK_ID, APP_TITLE, CURATOR_ID } from '../../utils/env-vars'
import { PageWrapper } from "../../styles/index";
import Dashboard from "../Dashboard";
import logo from '../../assets/dragverse-logo.png';
import {
  MediaFetchAgent,
} from "@zoralabs/nft-hooks";
import { withFirebase } from "../Firebase";

const Profile = ({ firebase, history
    // user, featuredEvents, featuredNFTs 
}) => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const fetchAgent = new MediaFetchAgent(
        NETWORK_ID
      );
    const contractAddress = CONTRACT_ADDRESSES;

    useEffect(() => {
        const currentUser = firebase.currentUser;
        console.log(currentUser)
        setAvatarUrl(currentUser?.avatarUrl);
        setUsername(currentUser?.username);
        setUserId(currentUser?.userId);
    }, [firebase.currentUser]);


    
    // TODO: use the api to get this info
      const featuredEvents = [{
        type: 'live-chat',
        title: 'Shangela',
        ranking: 1,
        imageUrl: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2022%2F01%2F12%2FDrag-Race.jpg',
        url: '/events/24234sfsdf'
      }, {
        type: 'live-chat',
        title: 'Shangela',
        ranking: 1,
        imageUrl: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2022%2F01%2F12%2FDrag-Race.jpg',
        url: '/events/242fsdf'
        
      }]
    
      // TODO: use the api to get this info 
      const featuredNFTs = [{
        currentEthPrice: 234.2,
        title: 'stage is yours',
        imageUrl: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2022%2F01%2F12%2FDrag-Race.jpg'
      },
      {
        currentEthPrice: 234.2,
        title: 'stage is yours',
        imageUrl: 'https://ntvb.tmsimg.com/assets/p197358_b_h8_at.jpg?w=1280&h=720'
      },
      {
        currentEthPrice: 234.2,
        title: 'stage is yours',
        imageUrl: 'https://decider.com/wp-content/uploads/2022/01/rupauls-drag-race-14-ru.jpg?quality=80&strip=all'
      }]
    return (
        <ProfileWrapper>
        <br></br>
        <h1>{`Welcome, ${username ?? 'bitch'}`}</h1>
        <Dashboard
            history={history}
            userId={userId}
            featuredEvents={featuredEvents}
            featuredNFTs={featuredNFTs}
            avatarUrl={avatarUrl}
        />
        </ProfileWrapper>
    );
}

export default withFirebase(Profile);

const ProfileWrapper = styled(PageWrapper)`
.center-container {
  padding-top: var(--space-md);
  display: grid;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  columns: 1,
}
.horizontal-container {
  display: flex;
  flex-direction: row;
  text-align: center;
  padding-top: var(--space-md);
  justify-content: center;
}
.list-component-wrapper {
  padding: var(--base-unit) 0;
  border-top: var(--border-light);
}
.thumbnail-manage-button {
  margin: 0 auto var(--space-sm)!important;
}
.dragverse-container {
  background-image: url('../assets/img/dragverse-logo.png')
}
`;