import React from 'react';
import styled from '@emotion/styled';
import {breakpoints} from 'gatsby-theme-apollo-core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import {ReactComponent as IconClockSVG} from "./assets/fa-clock-light.svg";

const CardWrapper = styled.div({
	display: "flex",
  "justify-content": "space-between",
  [breakpoints.md]: {
    display: "block"
  }
})

const useStyles = makeStyles({
  navcard: {
    width: "32%",
    [breakpoints.md]: {
    	width: "100%",
    	"margin-bottom": "10px"
    }
  },
  areanormal: {
  	height: "100%",
    padding: "20px",
    "padding-bottom": "60px",
    "padding-top": "100px",
    "text-align": "center"
  },
  title: {
  	position: "absolute",
    display: "flex",
    left: 0,
    right: 0,
    top: 0,
    height: "80px",
    "background-color": "#d0191f",
    padding: "10px",
    "text-align": "center",
    "font-size": "1.2em",
    color: "#ffffff"
  },
  bottombar: {
    "border-top": "1px solid #ccc",
    "bottom": "10px",
    "left": 0,
    "position": "absolute",
    "width": "100%",
    height: "35px",
    "padding-left": "20px",
    "padding-top": "6px",
    color: "#5A6270",
    "font-size": "14px",
    "text-align": "left"
  },
  titletext: {
    margin: "auto"
  }

});

const SVGIconWrapper = styled.div`
  position: relative;
  top: 5px;
  width: 20px;
  margin-right: 6px;
  display:inline-block;
`

const IconSupport = () => {
  return (

    <SVGIconWrapper>
      <IconClockSVG/>
    </SVGIconWrapper>

  )
}

export default function NavigationCard(props) {
	const classes = useStyles();

	return (
			<Card className={classes.navcard}>
				<CardActionArea className={classes.areanormal} href={props.href}>
					<div className={classes.title}>
						<div className={classes.titletext}>
              {props.title}
            </div>
					</div>
					{props.children}
          <div className={classes.bottombar}>
            <IconSupport />
            {props.readingtime} min
          </div>
				</CardActionArea>
			</Card>
		
	);
}

export function NavigationCardWrapper(props) {
	return (
		<CardWrapper>
			{props.children}
		</CardWrapper>
	);
}