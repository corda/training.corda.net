import React from 'react';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';


const CardWrapper = styled.div`
	display: flex;
  justify-content: space-between;
`

const useStyles = makeStyles({
  navcard: {
    width: "32%"    
  },
  areanormal: {
  	padding: "20px",
  	height: "100%"
  },
  title: {
  	"font-size": "1.2em",
  	"margin-bottom": "10px"
  }

});

export default function NavigationCard(props) {
	const classes = useStyles();

	return (
			<Card className={classes.navcard}>
				<CardActionArea className={classes.areanormal} href={props.href}>
					<div className={classes.title}>
						{props.title}
					</div>
					{props.children}
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