import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const Container = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
`;

const Post = styled.div`
    margin-bottom: -4px;
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
`;

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 2vw;
`;

const Nav = styled(NavLink)`
    padding: 8px; 
    text-decoration: none;
    color: 'grey';
`;

export { Container, Post, Image, NavContainer, Nav };