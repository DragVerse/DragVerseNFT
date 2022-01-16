export const NETWORK_ID: string = process.env.REACT_APP_NETWORK_ID!;
if (!NETWORK_ID) {
  throw new Error("NetworkID is required.");
}

export const CURATOR_ID = process.env.REACT_APP_CURATOR_ID;

export const CONTRACT_ADDRESSES =
  process.env.REACT_APP_NETWORK_ID === '1'
    ? (process.env.REACT_APP_MAINNET_CONTRACTS as string)
    : (process.env.REACT_APP_TESTNET_CONTRACTS as string)

if (!CURATOR_ID && !CONTRACT_ADDRESSES) {
  throw new Error(
    "At least one of curator id or contract address is required"
  );
}

export const APP_TITLE = process.env.REACT_APP_APP_TITLE
export const APP_DESCRIPTION = process.env.REACT_APP_DEFAULT_DESCRIPTION || ''
export const BASE_URL = process.env.REACT_APP_BASE_URL || ''
export const DEFAULT_OG_CARD = `${BASE_URL}/meta-content/social-card.jpg`
export const FAVICON = `${BASE_URL}/meta-content/social-card.jpg`

export const RPC_URL: string | undefined = process.env.REACT_APP_RPC_URL;
