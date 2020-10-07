import { css } from '@emotion/core';
import { colors } from './theme';

export default css`
* {
  box-sizing: border-box;
  margin: 0;
}

html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 2vh;
  color: ${colors.white};
  }

  > div {
    margin-top: 0;
  }

  header {
    width: 100%;
    max-width: 600px;
    height: 15vh;
    border: solid ${colors.white} thick;
    border-radius: 50px 50px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: ${colors.pink};
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100vw;
    min-width: 300px;
    height: 100vh;
    min-height: 300px;
    background: ${colors.pale};
    padding: 2vh 5vw 0 5vw;
  }

  footer {
    z-index: 10;
    height: 10vh;
    min-height: 2.5vh;
    width: 100vw;
    padding: 0.5vh 2vw;
    border-top: solid ${colors.white} thick;
    margin-top: 2vh;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: ${colors.white};
    background:${colors.dark};
    font-size:
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins';
    line-height: 1.1;
    font-weight: 400;
    text-align: center;
    color: ${colors.white};

    + * {
      margin-top: 0.5rem;
    }
  }

  h1 {
    font-family: 'Contrail One';
    font-size: 7.5vh;
    font-style: italic;
  }

  h3 {
    font-size: 2.5vh;
    font-style: italic;
  }

  h4 {
    font-family: 'Kaushan Script';
    font-size: 4vh;
    margin-bottom: 1rem;
    padding-top: 2vh;
  }

  h5 {
    padding: 1vh 0;
    font-size: 2vh;
    font-weight: 200;
    line-height: 1.4;
  }

  h6 {
    font-size: 2.5vh;
  }

  form {
    width: 75%;
  }

  button {
    padding: 1rem;
    height: 7.5vh;
    width: auto;
    min-width: 35vw;
    max-width: 100%;
    border: solid thin ${colors.white};
    border-radius: 50px;
    background: ${colors.pink};
    font-family: 'Poppins';
    font-size: 2.5vh;
    color: ${colors.white};

    &:hover {
        box-shadow: 0 3px 2px ${colors.dark};
      }
  }

  a {
    color: ${colors.white};
    text-decoration: none;

    &:hover {
        -webkit-text-stroke: 1px ${colors.white};
        color: ${colors.dark};
      }

      &:hover[id="title"] {
        -webkit-text-stroke: 1px ${colors.white};
        color: ${colors.pink};
      }
  }

  figure {
    font-size: 12vh;
    margin-bottom: 20px;
  }

  span[role="img"]{
    padding: 0 10px;
    font-style: normal;
  }

  span[id="babify"]{
    font-family: 'Contrail One';
    font-style: italic;
    font-size: 1.1em;
    margin-right: 5px;
  }

  time {
    font-size: 1.5vh;
  }

}
`;
