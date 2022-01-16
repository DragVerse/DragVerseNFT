import fetch from 'node-fetch';
import FormData from 'form-data';
import { FetchStaticData, MediaFetchAgent } from "@zoralabs/nft-hooks";
import { NETWORK_ID, CONTRACT_ADDRESSES } from '../utils/env-vars';

const uploadFileToIPFS = (files) => new Promise((resolve, reject) => {
  const form = new FormData();
  files.forEach((file) => {
    form.append('file', file);
  });

  const options = {
    method: 'POST',
    body: form,
    headers: {
      "Authorization": process.env.REACT_APP_NFTPORT_API_KEY,
    },
  };
  fetch("https://api.nftport.xyz/v0/files", options)
    .then(response => {
      return response.json()
    })
    .then(responseJson => {
      // Handle the response
      console.log(JSON.stringify(responseJson));
        resolve(responseJson);
    })
    .catch((error) => {
      reject(new Error('Failed: ', error));
    });
});

const mintNFT = (jsonBody) => new Promise((resolve, reject) => {
  fetch("https://api.nftport.xyz/v0/mints/easy/urls", {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `${process.env.REACT_APP_NFTPORT_API_KEY}`,
    },
    "body": JSON.stringify(jsonBody),
  })
  .then(response => {
    return response.json();
  })
  .then((data) => {
    console.log(JSON.stringify(data));
    resolve(data);
  })
  .catch(err => {
    console.error(err);
    reject(err);
  });
});

const getOwnedItems = (owner) => {
  return new Promise(async (resolve, reject) => {
    if (!owner) {
      reject({status: 500, failed: true});
    }
  
    const fetchAgent = new MediaFetchAgent(
      NETWORK_ID
    );

    console.log('getOwnedItems', owner);
  
    FetchStaticData.fetchUserOwnedNFTs(
      fetchAgent,
      {
        collectionAddresses: CONTRACT_ADDRESSES
          ? (CONTRACT_ADDRESSES).split(",")
          : undefined,
        userAddress: owner,
        limit: 200,
        offset: 0,
      },
      true
    ).then((tokens) => {
      resolve({tokens, status: 200})
    });
  });
};


const Service = {
  uploadFileToIPFS,
  getOwnedItems,
  mintNFT,
};

export default Service;