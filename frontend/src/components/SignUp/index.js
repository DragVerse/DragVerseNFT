import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export { SignUpLink };

import styled from "@emotion/styled";
import { CONTRACT_ADDRESSES, NETWORK_ID, APP_TITLE, CURATOR_ID } from '../../utils/env-vars'
import { PageWrapper } from "../../styles/index";
import Onboarding from "../Onboarding";
import { withFirebase } from '../Firebase';

import {
  MediaFetchAgent,
} from "@zoralabs/nft-hooks";

const Signup = ({ firebase, history, user, featuredEvents, featuredNFTs }) => {
  const fetchAgent = new MediaFetchAgent(
    NETWORK_ID
  );
  const contractAddress = CONTRACT_ADDRESSES;

  return (
    <SignupWrapper>
      <h1 style={{ paddingBottom: 10 }}>{`Connect your wallet`}</h1>
      <h4>{'Easy to join the dragVerse with 3 steps'}</h4> 
      <Onboarding firebase={firebase} history={history} user={user} featuredEvents={featuredEvents} featuredNFTs={featuredNFTs}/>
    </SignupWrapper>
  );
}
export default withFirebase(Signup);

const SignupWrapper = styled(PageWrapper)`
max-width: var(--content-width-lg);
.center-container {
  padding-top: var(--space-md);
  justify-content: center;
  align-items: center;
}
.horizontal-container {
    display: flex;
    flex-direction: row;
    text-align: center;
    padding-top: var(--space-sm);
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
  width: var(--space-lg);
}
.progressbar {
    counter-reset: step;
}
.progressbar li {
    list-style-type: none;
    width: 20%;
    float: left;
    font-size: 12px;
    position: relative;
    text-align: center;
    text-transform: uppercase;
    color: var(--white);
}
.progressbar li:before {
    width: 40px;
    height: 40px;
    content: counter(step);
    counter-increment: step;
    line-height: 40px;
    display: block;
    text-align: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: var(--black);
}
.progressbar li:after {
    width: 60%;
    height: 1px;
    content: '';
    position: absolute;
    background-color: #7d7d7d;
    top: 20px;
    left: -30%;
    z-index: -1;
}
.progressbar li:first-child:after {
    content: none;
}

.progressbar li.active:before {
    border-color: rgb(124, 92, 247);
    background-color: rgb(124, 92, 247)
}
/* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  padding-top: 4px;
  padding-left: 45px;
  margin: 25px 30px;
  cursor: pointer;
  color: var(--white);
  font-size: 17px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: transparent;
  border-radius: 6px;
  border: 1px solid var(--white);
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: rgb(124, 92, 247);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 8px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
`;