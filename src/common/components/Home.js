import * as React from 'react';

import styled from '@emotion/styled';

import {space} from "@workday/canvas-kit-react/tokens";


const Home = () => {
    
  return (
      <Logo>
        <img src="./well-high-resolution-color-logo.png" alt="logo"  height="600"  />

      </Logo>
  );
};

const Logo = styled('div')({
  display: "flex",
  flex: "1 0 auto",
  height: "100%",
  justifyContent: "center",
  marginRight: space.m,
  "> *": {
    marginLeft: space.m
  }
});




export default Home;


/*

import {AccentIcon, AppletIcon, SystemIcon, SystemIconCircle, Graphic} from "@workday/canvas-kit-react/icon";

import { recentSignOnsIcon, workerSpendIcon } from '@workday/canvas-applet-icons-web';
import {faceIdIcon, boltFillIcon, rocketIcon, justifyIcon, speechExclamationIcon} from '@workday/canvas-system-icons-web';
import { Card } from "@workday/canvas-kit-react/card";
import { Link } from 'react-router-dom';

import PageHeader from './PageHeader';

// Import the circular menu
import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from "react-circular-menu";




    <React.Fragment>
      <PageHeader title="Welcome!" />
      
      <CardLayout>

            <
          <CardLink to='/spot-bonus'>
            <HomeCard depth={2}>
              <Card.Body>
                <AppletIcon icon={workerSpendIcon} />
                <CardHeader>Spot Bonus</CardHeader>
                <CardDescription>Give One-Time Payments and Anytime Feedback to your workers on demand.</CardDescription>
              </Card.Body>
            </HomeCard>
          </CardLink>
          <CardLink to='/badge-generator'>
            <HomeCard depth={2}>
              <Card.Body>
                <AppletIcon icon={recentSignOnsIcon} />
                <CardHeader>Badge Generator</CardHeader>
                <CardDescription>Generate a Worker Badge image and store in Workday.</CardDescription>
              </Card.Body>
            </HomeCard>
          </CardLink>
          <HomeCardComingSoon depth={2}>
            <Card.Body>
              <AppletIcon icon={fallbackIcon} />
              <CardHeader>Coming Soon</CardHeader>
              <CardDescription>Build the next big thing!</CardDescription>
            </Card.Body>
          </HomeCardComingSoon>
      </CardLayout>
    </React.Fragment>


    
  const menuLogo = React.createElement(
    'img',
    {src: './wd-icon-justify.png',
    display: 'flex',
    height:'50px',
    paddingLeft: space.m,
    alt:'WELL', 
    onClick: () => {console.log('clicked')} },
    null
    ) ;


    
const CardLayout = styled("div") ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "left",
  padding: space.l,
  marginBotom: "50%"
  
});

const CardDescription = styled("p") ({
  ...type.levels.subtext.large
});

const CardHeader = styled("h2") ({
  ...type.levels.heading.small
});


const CardLink = styled(Link) ({
  textDecoration: "none"
});

const HomeCard = styled(Card) ({

  alignItems: "center",
  display: "flex",
  height: "250px",
  justifyContent: "center",
  marginBottom: space.l,
  marginRight: space.xl,
  padding: space.l,
  textAlign: "center",
  minWidth: "450px",
  maxWidth: "450px",
  [`&:hover`]: {
    backgroundColor: colors.soap100
  }
});


const HomeCardComingSoon = styled(HomeCard) ({
  backgroundColor: `${colors.soap200} !important`
});

    */