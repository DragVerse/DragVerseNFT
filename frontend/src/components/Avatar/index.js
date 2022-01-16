import styled from "@emotion/styled";
import {useEffect, useState} from 'react';
import {
  AuctionManager,
  useManageAuction,
} from "@zoralabs/manage-auction-hooks";
import { FetchStaticData } from "@zoralabs/nft-hooks";
import {
  NFTDataContext,
  NFTPreview,
  PreviewComponents,
} from "@zoralabs/nft-components";
import {
    useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";
import { Fragment, useContext } from "react";
import Service from "../../services";
import { PageWrapper } from "../../styles/index";
import Dropzone from "../Dropzone";
import { withFirebase } from "../Firebase";
import { Card } from "@mui/material";
import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MediaCard = ({file_url, name, description}) =>{
    return (
      <Card style={{ maxWidth: 345, margin: '10px', padding: '10px' }}>
        <CardMedia
          component="img"
          height="140"
          image={file_url}
          alt="DragVerse NFT"
        />
        <CardContent>
          <h5 gutterBottom variant="h5" component="div">
            {name}
          </h5>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
        </CardActions>
      </Card>
    );
  }

const ListItemComponent = () => {
  const {
    nft: { data },
  } = useContext(NFTDataContext);

  const { openManageAuction, openListAuction } = useManageAuction();

  if (!data || !data.nft) {
    return <Fragment />;
  }

  if (
    data.pricing.reserve?.status === "Active" ||
    data.pricing.reserve?.status === "Pending"
  ) {
    return (
      <button
        className="button"
        onClick={() => {
          const reserveId = data.pricing.reserve?.id;
          if (reserveId) {
            openManageAuction(parseInt(reserveId, 10));
          }
        }}
      >
        Manage
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        openListAuction(data.nft.contract.address, data.nft.tokenId);
      }}
      className="button"
    >
      List
    </button>
  );
};

const RenderOwnedList = ({list=[]}) => {
  if (list.length === 0 ) {
    return (
        <div className="owned-list-no-tokens">
          <h2>We couldn’t find any NFTs you own 😢</h2>
          <p style={{color: 'white'}}>Make sure you’ve connected the correct wallet</p>
        </div>
      );
  } else if (list) {
      console.log(list.length);
        return list.map((item) => {
            return <MediaCard {...item} />
        });
  }
};

const MediaThumbnailPreview = ({
  tokenContract,
  tokenId,
}) => {
  return (
    // TODO(iain): Fix indexer in this use case
    <NFTPreview
      id={tokenId}
      contract={tokenContract}
      useBetaIndexer={true}
    >
      <div className="owned-list-item">
        <PreviewComponents.MediaThumbnail />
        <div className="list-component-wrapper">
          <ListItemComponent />
        </div>
      </div>
    </NFTPreview>
  );
};

const List = ({firebase}) => {
  const { active, account } = useWeb3Wallet();
  const [list, setList] = useState([]);

  useEffect(() => {
    Service.getOwnedItems(account).then((data) => {   
        console.log('nft: ', data); 
        Promise.all(data.tokens.map((token) => {
           FetchStaticData.getIndexerServerTokenInfo(token).then((tokenInfo) => {
              return (
                  <NFTPreview
                    id={tokenInfo.tokenId}
                    contract={tokenInfo.tokenContract}
                    initialData={token}
                    useBetaIndexer={true}
                    key={`${tokenInfo.tokenContract}-${tokenInfo.tokenId}`}
                  >
                    <div className="owned-list-item">
                      <PreviewComponents.MediaThumbnail />
                      <div className="list-component-wrapper">
                        <ListItemComponent />
                      </div>
                    </div>
                  </NFTPreview>
                );
          });
        })).then((results) => {
            console.log(results);
            if (results.length !== 0) {
              setList(results);
            }
            return results
          });
    });
    firebase.db.collection("nfts").where("mint_to_address", "==", account.toLowerCase()).onSnapshot((querySnapshot) => {
        setList(querySnapshot.docs.map((doc) => {
            return {...doc.data()};
        }));
    });
  } , [account]);
  return (
    <>
      <AuctionManager
        renderMedia={MediaThumbnailPreview}
        strings={{
          LIST_MEDIA_HEADER: "List your NFT",
          LIST_MEDIA_DESCRIPTION: `Set the reserve price to list your NFT on DragVerse Marketplace`,
        }}
      >
        <ListWrapper>
          {/* <ConnectWallet /> */}
          {account &&
            <div className="owned-list">
              <RenderOwnedList list={list} />
            </div>
          }
        </ListWrapper>
        <Dropzone />
      </AuctionManager>
    </>
  );
}

export default withFirebase(List);

const ListWrapper = styled(PageWrapper)`
  max-width: var(--content-width-lg);
  .owned-list {
    padding-top: var(--space-md);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .owned-list-no-tokens {
    text-align: center;
    padding-top: var(--space-sm);
  }
  .list-component-wrapper {
    padding: var(--base-unit) 0;
    border-top: var(--border-light);
  }
  .thumbnail-manage-button {
    margin: 0 auto var(--space-sm)!important;
  }
`;
