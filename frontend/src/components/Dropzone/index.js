import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { useWeb3Wallet } from '@zoralabs/simple-wallet-provider';
import Service from '../../services';
import { withFirebase } from '../Firebase';

const Dropzone = (props) => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [loading, setLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { active, account } = useWeb3Wallet();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setLoading(true);
      const promises = [];
      promises.push(Service.uploadFileToIPFS(acceptedFiles).then((ipfsData) => {
        setIsMinting(true);
        const jsonBody = {
          "chain": "rinkeby",
          "name": ipfsData.file_name,
          "description": `DragVerse NFT for ${account}`,
          "file_url": ipfsData.ipfs_url,
          "mint_to_address": account.toLowerCase(),
        };
        console.log('jsonBody', jsonBody);
        return Service.mintNFT(jsonBody).then((data) => {
          return props.firebase.db.collection('nfts').add({...jsonBody, ...data});
        });
      }))
      Promise.all(promises).then(() => {
        setLoading(false);
        setIsMinting(false);
      });

    }
  }, [acceptedFiles]);

  return (
    <div>
      {(loading || isMinting) ? (
        <h2 style={{paddingTop: '10px', paddingBottom: '20px'}}>{"Please wait... Currently minting your NFT!"}</h2>
      ) : (
      <div
        {...getRootProps({className: `dropzone`})}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '20px',
          borderWidth: '2px',
          borderRadius: '2px',
          borderColor: '#eeeeee',
          borderStyle: 'dashed',
          backgroundColor: '#fafafa',
          color: '#bdbdbd',
          outline: 'none',
          transition: 'border .24s ease-in-out',
          justifyContent: 'space-evenly',
          height: '33vh',
        }}
      >
        <input {...getInputProps()} />
        <span style={{fontSize: '17px'}}>Click to upload your art!</span>
      </div>
      )}
    </div>
  );
}

export default withFirebase(Dropzone);
