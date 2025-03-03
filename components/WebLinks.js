// Weblinks Page Sections
// created by @realvjy
// date: 29 Jul, 2022

import Image from "next/image";
import styled from "styled-components";
import { Button, ButtonLink, Container, StyledLink } from "./ReusableStyles";
import Link from "next/link";
import { ChevronRightIcon, HexIcon, HomeIcon, TwitterIcon, OvalIcon } from './icons';
import allLinks from "../data/LinksData";
import bioData from "../data/BioData";
import { useState, useEffect } from 'react';
import { useDarkMode } from "usehooks-ts";



const Links = () => {
  const { isDarkMode, toggle } = useDarkMode();

  // all user info from bioData
  const name = bioData[0].name;
  const url = bioData[0].url;
  const username = bioData[0].username;
  const titleImg = bioData[0].titleImg;
  const avatarImg = bioData[0].avatar;
  const description = bioData[0].description;
  const descShow = bioData[0].descShow;
  const subdesc = bioData[0].subdesc;
  const subdescShow = bioData[0].subdescShow;
  const footerText = bioData[0].footerText;
  const author = bioData[0].author;
  const authorURL = bioData[0].authorURL;
  const titleImage = "/title.svg";

  // Check what class to use oval or hex for avatar
  const avatarShape = bioData[0].nftAvatar ? `nft-clipped` : `oval-clipped`


  // Description and subdescription goes here
  const descriptionText = descShow ? description : `Write your own fall back text if description not in BioData.js or remove me/leave blank`
  const subdescText = subdescShow ? subdesc : `Write your own if you want or just remove me/leave blank`


  const newProduct = bioData[0].newProduct; // checking for newProduct flag true false
  const newProductUrl = bioData[0].newProductUrl; // get product url if available



  // Collect all links filter by type - social, project, nft and other etc=
  // get data for social section
  const social = allLinks.filter((el) => {
    return el.type === "social" && el.on
  });

  // Get data for install section
  const install = allLinks.filter((el) => {
    return el.type === "install" && el.on
  });

  // Get data for nfts
  const nfts = allLinks.filter((el) => {
    return el.type === "nft" && el.on
  });

  // Get data for other section
  const others = allLinks.filter((el) => {
    return el.type === "other" && el.on
  });

  return (
      <LinkWrapper>
        <ThemeToggle onClick={toggle}>
          <span className={isDarkMode ? "icon-moon" : "icon-sun"} />
        </ThemeToggle>
        <LinkContainer>
          <TopPart>
            <LinkHeader>
              <Avatar>
                <AvatarWrap>
                  <HexIcon />
                  <OvalIcon />
                  <div className={`${avatarShape} avatar-border`}></div>
                  <div className={`${avatarShape} avatar-fill`}></div>
                  {bioData[0].useAvatarIcon ? (
                      <span className="icon-user" />
                  ) : (
                      <img
                          src={avatarImg}
                          className={avatarShape}
                      />
                  )}
                </AvatarWrap>
              </Avatar>
              <Title>
                {/* Using titleimg flag to use image as title or text */}
                {titleImg ?
                    <img src={titleImage} className="handle" /> :
                    <h1>{name}</h1>
                }
                {/* if your remove username from data it will not appear */}
                {
                  username ? 
                    <h3>
                      <a href={`${url}`} target="_blank" rel="noopener noreferrer">
                        {username}
                      </a>
                    </h3> 
                    : ''
                }
              </Title>
            </LinkHeader>

            {/* Bio Section */}
            <LinkBio>
              {description && <h1>{descriptionText} </h1>}
              {subdesc && <h4>{subdescText}</h4>}
            </LinkBio>
            {/* End Bio Section */}

            {/* Weblinks started */}
            <WebLinkWrap>
              {/* Social Icon */}
              <LinkSection className="social">
                <div className="iconsonly">
                  {
                    social.map((i) => {
                      return (
                          <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                            <LinkBox className="socialIcon">
                              <img 
                                src={i.icon} 
                                alt={i.title}
                              />
                            </LinkBox>
                          </a>
                      )
                    })
                  }
                </div>
              </LinkSection>
              {/* Social Icon */}

              {/* Install Section */}
              {
                install.length > 0 ?
                    <LinkSection>
                      <h3>{install[0].type}</h3>
                      {
                        install.map((i) => {
                          return (
                              <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                                <LinkBox>
                                  <LinkTitle><img src={i.icon} style={{ filter: 'var(--img)' }} /> {i.title}</LinkTitle>
                                </LinkBox>
                              </a>
                          )
                        })
                      }
                    </LinkSection> : ''
              }
              {/* End Install Section */}

              {/* NFT Section */}
              {
                nfts.length > 0 ?
                    <LinkSection>
                      <h3>{nfts[0].type}s</h3>
                      {
                        nfts.map((i) => {
                          return (
                              <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                                <LinkBox>
                                  <LinkTitle><img src={i.icon} style={{ filter: 'var(--img)' }} /> {i.title}</LinkTitle>
                                </LinkBox>
                              </a>
                          )
                        })
                      }
                    </LinkSection>
                    : ''
              }
              {/* End NFT Section */}

              {/* Featured Products Section */}
              {
                allLinks.filter(link => link.type === 'featured' && link.on).length > 0 &&
                <LinkSection>
                    <h3>Featured Products</h3>
                    {
                        allLinks
                            .filter(link => link.type === 'featured' && link.on)
                            .map((link, index) => (
                                <a href={link.url} key={link.title} target="_blank" rel="noreferrer">
                                    <LinkBox>
                                        <LinkTitle>
                                            {link.title === '3dicons' && <span className="icon-cube" />}
                                            {link.title === 'Designletter' && <span className="icon-mail" />}
                                            {link.title === 'Illustrations' && <span className="icon-lightning-bolt" />}
                                            {link.title}
                                        </LinkTitle>
                                        <span className="icon-external-link" />
                                    </LinkBox>
                                </a>
                            ))
                    }
                </LinkSection>
              }
              {/* End Featured Products Section */}

              {/* Other Section */}
              {
                others.length > 0 ?
                    <LinkSection>
                      <h3>{others[0].type}</h3>
                      {/* BioData.js > newProduct == true */}
                      {/* New Section will render once newProduct == true */}
                      {(newProduct) ? 
                        <NewSection>
                          <a href={newProductUrl} target="_blank" rel="noreferrer">
                            <img
                              src={'/newproduct.png'}
                              className="newproduct"
                              alt="A custom banner - replace with any different image"
                            />
                          </a>
                        </NewSection> : ''
                      }
                      {/* End Biodata.js, You can move this section anywhere */}
                      {
                        others.map((i) => {
                          return (
                              <a href={i.url} key={i.title} target="_blank" rel="noreferrer">
                                <LinkBox>
                                  <LinkTitle><img src={i.icon} /> {i.title}</LinkTitle>
                                </LinkBox>
                              </a>
                          )
                        })
                      }
                    </LinkSection> : ''
              }
              {/* End Other Section */}

            </WebLinkWrap>
            {/* End Weblinks */}
          </TopPart>
          <BottomPart>
            <LinkFoot>
              <h4>{footerText} <a href={authorURL} target="_blank" rel="noopener noreferrer">{author}</a></h4>
            </LinkFoot>
          </BottomPart>

        </LinkContainer>
      </LinkWrapper>

  )
};

export default Links;

const LinkWrapper = styled(Container)`
`
const LinkContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 24px;
`

const LinkHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 12px;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
       margin-top: 20px;
    }
`

const Avatar = styled.div`
    height: 90px;
    width: 90px;
    position: relative;
    margin-bottom: 12px;
`

const AvatarWrap = styled.div`
   height: 100%;
   width: 100%;
   filter: drop-shadow(0px 1px 2px var(--avatar-shadow));
   
   .icon-user {
     font-size: 48px;
     color: ${({ theme }) => theme.text.secondary};
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
   img{
    height: calc(100% - 6px);
    width: calc(100% - 6px);
   }
   .avatar-border{
        height: 100%;
        width: 100%;
        position: absolute;
        background: ${({ theme }) => theme.bg.primary};
   }
   .avatar-fill{
        height: calc(100% - 6px);
        width: calc(100% - 6px);
        position: absolute;
        background: ${({ theme }) => theme.bg.primary};
   }
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
      font-size: 38px;
      font-weight: 700;
      
      letter-spacing: -2px;
      background: linear-gradient(90deg, #4AB1F1 5.71%, #566CEC 33.77%, #D749AF 61.82%, #FF7C51 91.21%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 32px;
      }
    }
    h3{
      margin-top:6px;
      font-size: 18px;
      font-weight: 500;
      letter-spacing: -.7px;
      color: ${({ theme }) => theme.text.secondary};
      opacity: .5;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 15px;
        margin-top:2px;
      }
    }
    
 
    .name{
      margin-top: 8px;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        width: 140px;
      }
    }
    .handle{
      height: 32px;
      margin-top: 6px;
      margin-bottom: 6px;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        height: 26px;
      }
    }
`

const LinkBio = styled.div`
    display: flex;
    flex-direction: column;
    h1{
      font-size: 22px;
      line-height: 30px;
      font-weight: 500;
      letter-spacing: -0.6px;
      padding: 0 20px;
      transition: color 0.2s ease;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 18px;
        line-height: 26px;
        padding: 0 8px;
      }
      vertical-align: middle;
      span{
        font-size: 12px;
        vertical-align: bottom;
        line-height: 30px;
        color: ${({ theme }) => theme.text.secondary};
        margin: 0 2px;
        @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
          font-size: 10px;
          line-height: 20px;
        }
      }
    }
    h4{
      font-size: 18px;
      letter-spacing: -.5px;
      margin: 10px 0;
      color: ${({ theme }) => theme.text.secondary};
      font-weight: 500;
      transition: color 0.2s ease;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 15px;
        padding: 0 20px;
        line-height: 24px;
      }
      a{
        font-weight: 700;
        opacity: .7;
        &:hover{
          opacity: 1;
        }
      }
    }
`

const TopPart = styled.div`
    
`


const BottomPart = styled.div`
    margin-bottom: 40px;
    
`
const LinkFoot = styled.div`
    h4{
      color: ${({ theme }) => theme.text.secondary};
      line-height: 32px;
      letter-spacing: -.2px;
      font-size: 16px;
      font-weight: 500;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 12px;
      }
      span{
        font-size: 10px;
        vertical-align: bottom;
        line-height: 32px;
        margin: 0 2px;
        opacity: .6;
        @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
          font-size: 8px;
        }
      }
    }
`

const WebLinkWrap = styled.div`
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
       padding: 0 12px;
    }
`


const LinkSection = styled.div`
    padding: 12px 0;
    display: flex;
    margin: 0 auto;
    max-width: 400px;
    flex-direction: column;
    &.social{
      max-width: max-content;
      padding: 0;
      margin-bottom: 18px;
    }
    .iconsonly{
      display: flex;
      justify-content: center;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        flex-wrap: wrap;
      }
    }
    h3{
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 4px;
      color: ${({ theme }) => theme.text.secondary};
      opacity: 0.8;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 11px;
      }
    }
`

const LinkBox = styled.div`
    padding: 18px 20px;
    border-radius: 12px;
    margin: 8px 18px;
    border: 1px solid ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.2)' : theme.bg.secondary};
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -.5px;
    position: relative;
    text-align: center;
    color: ${({ theme }) => theme.name === 'dark' ? 'var(--color-neutral-100)' : 'inherit'};
    background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};
    
    &::before{
      content: "";
      border-radius: 12px;
      display: block;
      position: absolute;
      z-index: -1;
      inset: -2px;
      opacity: 0;
      transform: scale(0.8);
    }
    &:hover{
      transition: all 333ms ease 0s;
      border-color: ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'transparent'};
      background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
      &::before{
        opacity: 1;
        background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.15)' : theme.bg.hover};
        transition: all 333ms ease 0s;
        transform: scale(1);
      }
    }
    
    &.socialIcon {
      padding: 12px;
      border-radius: 50%;
      border: none;
      margin: 4px;
      background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
      
      img {
        height: 20px;
        filter: ${({ theme }) => theme.name === 'dark' ? 'invert(1) brightness(100%)' : 'none'};
      }
      
      &:hover {
        background: ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
      }
      
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        padding: 8px;
        margin: 2px;
        img {
          height: 16px;
        }
      }
    }

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      padding: 16px 18px;
      font-size: 15px;
    }

    .icon-external-link {
      font-size: 20px;
      opacity: 0.7;
      color: ${({ theme }) => theme.name === 'dark' ? 'var(--color-neutral-100)' : 'inherit'};
    }
`
const LinkTitle = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.name === 'dark' ? 'var(--color-neutral-100)' : 'inherit'};

  .icon-cube,
  .icon-mail,
  .icon-lightning-bolt {
    font-size: 20px;
    color: ${({ theme }) => theme.name === 'dark' ? 'var(--color-neutral-100)' : theme.text.secondary};
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    font-size: 15px;
    .icon-cube,
    .icon-mail,
    .icon-lightning-bolt {
      font-size: 18px;
    }
  }
`;

const NewSection = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  
  img {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.2)' : theme.bg.secondary};
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.01);
      border-color: ${({ theme }) => theme.name === 'dark' ? 'rgba(255, 255, 255, 0.3)' : theme.bg.secondary};
    }
  }
`;

const ThemeToggle = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.bg.secondary};
  }

  span {
    font-size: 24px;
    color: ${({ theme }) => theme.text.primary};
  }

  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    top: 12px;
    right: 12px;
    
    span {
      font-size: 20px;
    }
  }
`;
