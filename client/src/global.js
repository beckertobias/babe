import { injectGlobal } from 'emotion';
import { Global, css } from '@emotion/core';
import { colors } from './theme';

function global() {
  return injectGlobal`
  @font-face {
    font-family: 'Contrail One';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Contrail One'), local('ContrailOne-Regular'), url(https://fonts.gstatic.com/s/contrailone/v10/eLGbP-j_JA-kG0_Zo51noaftYkHs384t2g.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Poppins';
    font-style: italic;
    font-weight: 200;
    font-display: swap;
    src: local('Poppins ExtraLight Italic'), local('Poppins-ExtraLightItalic'), url(https://fonts.gstatic.com/s/poppins/v13/pxiDyp8kv8JHgFVrJJLmv1pVF9eOYktMqg.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: local('Poppins ExtraLight'), local('Poppins-ExtraLight'), url(https://fonts.gstatic.com/s/poppins/v13/pxiByp8kv8JHgFVrLFj_Z1xlFd2JQEk.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Poppins Regular'), local('Poppins-Regular'), url(https://fonts.gstatic.com/s/poppins/v13/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: local('Poppins SemiBold'), local('Poppins-SemiBold'), url(https://fonts.gstatic.com/s/poppins/v13/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: 'Kaushan Script';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Kaushan Script'), local('KaushanScript-Regular'), url(https://fonts.gstatic.com/s/kaushanscript/v9/vm8vdRfvXFLG3OLnsO15WYS5DG74wNJVMJ8b.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  `;
}

export default global;
