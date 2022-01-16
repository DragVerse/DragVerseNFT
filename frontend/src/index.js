import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';
import { css } from '@emotion/css'
import { MediaConfiguration } from '@zoralabs/nft-components'
import { Web3ConfigProvider } from '@zoralabs/simple-wallet-provider'
import { NETWORK_ID, RPC_URL } from './utils/env-vars'
import GlobalStyles, { mediaConfigurationStyles } from './styles/index'

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <GlobalStyles />
    <Web3ConfigProvider
      networkId={parseInt(NETWORK_ID, 10)}
      rpcUrl={RPC_URL || undefined}
      theme={{
        walletOption: css`
        position: relative;
        width: 100%;
        padding: 20px;
        margin-bottom: 20px;
        cursor: pointer;
        &:last-child {
          margin-bottom: 0;
        }
        `,
      }}>
        <MediaConfiguration
          networkId={NETWORK_ID}
          style={mediaConfigurationStyles}
        >
          <App />
        </MediaConfiguration>
    </Web3ConfigProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

registerServiceWorker();