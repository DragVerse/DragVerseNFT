/** @jsxImportSource @emotion/react @emotion/styled */
import { Global, css } from '@emotion/react'
import styled from '@emotion/styled';
import { media, buttonStyle } from './mixins'
import { returnBreakpoint } from './breakpoints'
import * as mixins from './mixins'

export const PageWrapper = styled.section`
  background: linear-gradient(90deg, rgba(30,9,93,255) 1%, rgba(36,9,110,255) 100%) !important;
  margin-top: 60px;
  position: relative;
`

export const mediaConfigurationStyles = {
  theme: { 
    lineSpacing: 20,
    // linkColor: 'var(--white)',
    borderStyle: '1px solid var(--white)',
    defaultBorderRadius: 0,
    maximumPricingDecimals: 2,
  },
  styles: {
    fullMediaWrapper: () => css`
      margin: 0;
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      overflow-y: visible;
      img {
        object-fit: contain;
        ${mixins.absoluteFullCentered};
      }
      ${mixins.media.laptop`
        height: 50vh;
        min-height: 35rem;
        max-height: 65rem;
        padding-bottom: 0;
      `}
    `,
    mediaObject: () => css`
      z-index: 1;
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: contain;
    `,
    mediaLoader: () => css`
      ${mixins.absoluteFullCentered};
      z-index: 0;
    `,
    fullPageDataGrid: () => css`
      display: grid;
      grid-gap: var(--space-md);
    `,
    fullCreatorOwnerSection: () => css`
      padding: 0;
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: auto auto;
      padding: var(--base-unit);
      border: 1px solid var(--black);
      * {
        text-align: center;
      }
    `,
    fullOwnerAddress: () => css`
      padding-top: var(--space-sm);
      font-size: var(--text-01);
    `,
    fullDescription: () => css`
      margin: var(--space-sm) 0;
      font-size: var(--text-02);
      line-height: 1.25;
    `,
    fullTitle: () => css`
      font-size: var(--text-04);
      padding: var(--base-unit) 0;
    `,
    fullLabel: () => css`
      color: var(--white);
      font-family: var(--font-b)!important;
      text-transform: uppercase;
      font-size: var(--text-03);
    `,
    infoContainer: () => css`
      padding: var(--space-sm);
      border: 1px solid var(--black);
      margin: 0 auto var(--space-sm);
    `,
    fullInfoProofAuthenticityContainer: () => css`
      padding: var(--space-sm) 0 0;
      display: grid;
      grid-template-columns: 1fr;
    `,
    fullPageHistoryTxnLink: () => css`
      font-size: var(--text-01);
      padding-top: 5px;
    `,
    fullPageHistoryItemDatestamp: () => css`
      color: var(--white);
      font-size: var(--text-01);
      padding-top: 5px;
    `,
    fullPageHistoryItemMeta: () => css`
      padding-top: 10px;
    `,
    fullProofLink: () => css`
      ${mixins.buttonStyle};
      display: inline-block;
      padding: var(--base-unit);
      margin-bottom: var(--space-sm);
      font-size: var(--text-02);
    `,
    fullPageHistoryItem: () => css`
      margin: 0;
      padding: 0 0 5px;
      margin-bottom: var(--space-sm);
      font-size: var(--text-01);
      border-bottom: 1px dotted var(--black);
      &:last-of-type {
        border-bottom: 0;
      }
      > div {
        width: 100%;
        display: flex;
        flex-direction: column;
  
      }
    `,
    fullInfoCreatorEquityContainer: () => css`
      margin: 0 0 var(--space-md);
    `,
    cardItemInfo: () => css`
      padding: var(--space-sm) var(--space-sm) 0;
      display: flex;
      justify-content: center;
      font-size: 0.9em;
      * {
        text-align: center;
      }
    `,
    fullPageHistoryItemDescription: () => css`
      font-size: var(--text-01);
    `,
    cardMediaWrapper: () => css`
    //   width: 100%;
    //   position: relative;
      height: 0;
      padding-bottom: 100%;
      overflow-y: visible;
      img {
        ${mixins.absoluteFullCentered};
        object-fit: cover;
      }
    `
  }
}

export const customStyles = {
    goLiveButton: {
        background: 'linear-gradient(150deg, rgba(223,92,171,1) 50%, rgba(153,32,243,1) 100%)',
        borderColor: 'transparent',
    },
    purpleSelectableCard: {
        background: 'linear-gradient(90deg, rgba(83,116,225,1) 1%, rgba(141,60,215,1) 100%)'
    },
    yellowSelectableCard: {
        background: 'linear-gradient(90deg, rgba(247,238,86,1) 1%, rgba(251,177,49,1) 100%)',
        color: '#000000'
    }
}

export const DragVerseTheme = {
    background: 'linear-gradient(90deg, rgba(30,9,93,255) 1%, rgba(36,9,110,255) 100%)',
};

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          /* COLORS */
          --black: #000000;
          --white: #ffffff;
          --overlay: rgba(0, 0, 0, 0.85);
          --overlay-light: rgba(0, 0, 0, 0.35);
          --border-black: 1px solid var(--black);
          --border-light: 1px solid #dbdbdb;
          --bg-color: rgb(15,5,64);
          --bg-color-gradient: radial-gradient(circle, rgba(15,5,64,1) 74%, rgba(89,17,149,1) 100%);

          /* FONTS */
          --font-a: SFMono-Regular, Arial, sans-serif;
          --font-b: Courier, monospace;
          
          /* SPACING */
          --base-unit: 8px;
          --space-sm: calc(var(--base-unit) * 2);
          --space-md: calc(var(--base-unit) * 3);
          --space-lg: calc(var(--base-unit) * 5);

          /* TYPOGRAPHY */
          --text-01: calc(var(--base-unit) * 1.5);
          --text-02: calc(var(--base-unit) * 2);
          --text-03: calc(var(--base-unit) * 3);
          --text-04: calc(var(--base-unit) * 4);
          --text-05: calc(var(--base-unit) * 5);

          /* LAYOUT */
          --header-z: 100;
          --header-height: calc(var(--base-unit) * 10);
          --footer-height: calc(var(--base-unit) * 10);
          --content-width-md: 960px;
          --content-width-lg: ${returnBreakpoint('desktop')};
          --content-width-xl: ${returnBreakpoint('xl')};
        }

        /* MEDIA QUERY MIXIN */
        ${media.laptop`
          :root {
            --base-unit: 10px;
            --text-05: calc(var(--base-unit) * 6);
          }
        `}

        ${media.xl`
          :root {
            --base-unit: 11px;
            --text-05: calc(var(--base-unit) * 7);
          }
        `}

        /* DEFAULTS */
        /* LAYOUT */
        body * {
          font-family: var(--font-a)!important;
        }

        main {
          width: 100%;
          overflow-x: hidden;
          position: relative;
          min-height: calc(100vh - (var(--header-height) + var(--footer-height)));
        }

        header,
        footer {
          font-size: var(--text-02);
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 var(--space-md);
          a {
            text-decoration: none;
            color: var(--white);
            &.active {
              text-decoration: underline;
            }
            ${media.hover`
              text-decoration: underline;
            `}
          }
        }

        /* TYPOGRPAHY */
        h1,h2,h3,h4,h5,h6 {
          font-weight: 500;
          color: var(--white);
          text-align: center;
        }
        h1 {
          font-size: var(--text-05);
          line-height: 1;
          text-align: center;
          padding: var(--space-md) 0 0;
        }
        h2 {
          font-size: var(--text-03);
          padding: var(--space-sm) 0;
        }
        h3 {
          font-size: var(--text-03);
          padding: var(--space-sm) 0;
        }
        a {
          font-weight: 400;
        }
        p,ol,ul {
          font-size: var(--text-02);
          padding-bottom: var(--space-sm);
          line-height: 1.35;
          font-weight: 400;
        }

        /* CUSTOM */
        .button {
          border: 5px solid rgb(98, 91, 193);
        }

        /* ZORA SPECIFIC -- CLEAN UP
           - WALLET MODAL
        */
        .zora-wallet-modalContent {
          h3 {
            font-size: var(--text-03)!important;
            padding: 0 0 15px;
          }
          .zora--auction-house-modalSuccessMessage {
            font-size: var(--text-02)!important;
          }
          img {
            object-fit: contain;
          }
          p {
            font-size: var(--text-02)!important;
            padding: 0 0 10px;
            &:last-of-type {
              padding-bottom: 30px!important;
            }
          }

          dragverse {
            content: url('/assets/img/dragverse-logo.png');
          }

          hr {
            height: 100%;
            margin: 20px 0 0;
            padding-bottom: 4px;
            border: none;
            border-bottom: 1px solid #fff;
            width: 95%;
            overflow: hidden;
          }
          .zora--auction-house-ethAmountLabel {
            padding-bottom: 15px;
            font-size: var(--text-02);
          }
          input {
            margin-bottom: 15px;
          }
          button.zora--auction-house-actionButton {
            ${buttonStyle};
            margin-bottom: 15px;
          }
        }
      `}
    />
  )
}