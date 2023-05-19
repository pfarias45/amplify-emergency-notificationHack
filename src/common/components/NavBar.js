import * as React from 'react';

import styled from '@emotion/styled';
import {space } from "@workday/canvas-kit-react/tokens";
import { SystemIcon,} from "@workday/canvas-kit-react/icon";

import {faceIdIcon, boltFillIcon} from '@workday/canvas-system-icons-web';
import PageHeader from './PageHeader';



import {AccentIcon, AppletIcon, SystemIconCircle, Graphic} from "@workday/canvas-kit-react/icon";

import { recentSignOnsIcon, workerSpendIcon } from '@workday/canvas-applet-icons-web';
import { Card } from "@workday/canvas-kit-react/card";
import { Link } from 'react-router-dom';




const NavBar = () => {
  
    return (
      <div class="item2">
        
        <CardLayout>
            <CardLink to='/ai-authentication'>
              <HomeCard depth={2}>
                <Card.Body>
                  <CardHeader>AI</CardHeader>
                  <CardDescription>AI</CardDescription>
                </Card.Body>
              </HomeCard>
            </CardLink>
            <CardLink to='/generate-map'>
              <HomeCard depth={2}>
                <Card.Body>
                  <CardHeader>Map</CardHeader>
                  <CardDescription>Map</CardDescription>
                </Card.Body>
              </HomeCard>
            </CardLink>
        </CardLayout>

</div>
    )

}



const CardLayout = styled("div") ({
display: "flex",
flexWrap: "wrap",
justifyContent: "left",
padding: space.l,
marginBotom: "50%"

});

const CardDescription = styled("p") ({

});

const CardHeader = styled("h2") ({

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
}
});

 
  
  export default NavBar;
  

  /*onClick={() => alert("Clicked the item")}

        
// Import the circular menu
import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from "react-circular-menu";

<CircleMenu
startAngle={90}
rotationAngle={-90}
itemSize={3}
radius={6.5}
rotationAngleInclusive={true}
>
<CircleMenuItem
  tooltip="Help"
  tooltipPlacement={TooltipPlacement.Top}
  link="/generate-map">
   <SystemIcon icon={speechExclamationIcon} />
   
</CircleMenuItem>

<CircleMenuItem tooltip="Inspire"
tooltipPlacement={TooltipPlacement.Top}>
  <SystemIcon icon={rocketIcon} />

</CircleMenuItem>

<CircleMenuItem tooltip="Recharge"
tooltipPlacement={TooltipPlacement.Top}>
  <SystemIcon icon={boltFillIcon} />
</CircleMenuItem>

<CircleMenuItem tooltip="Connect"
tooltipPlacement={TooltipPlacement.Top}
link="/ai-authentication">

   <SystemIcon icon={faceIdIcon} />
</CircleMenuItem>
</CircleMenu> 



                  <AppletIcon icon={} />

*/
