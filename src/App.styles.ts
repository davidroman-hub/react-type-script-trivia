import styled, {createGlobalStyle } from 'styled-components';
//@ts-ignore
import Maiz from './img/maiz.jpg';

export const GlobalStyles = createGlobalStyle`

html{
    height:100%;
}
body{
    background-image: url(${Maiz});
    background-size: cover;
    marging:0;
    padding: 0 20px;
    display:flex;
    justify-content:center;

}

*{
    box-sizing: border-box;
    font-family: 'Catamaran',sans-serif;
}

`