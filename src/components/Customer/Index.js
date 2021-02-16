import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "../UI/NavBar";
import Activity from "./Activity/Activity";
import Today from "./Food/Today";
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
	root: {},
	container: {
		marginTop: theme.spacing(2),
	},
});

class Index extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<NavBar />
				<Container className={classes.container}>
					<Switch>
						<Route exact path="/index" component={Today} />
						<Route exact path="/index/today" component={Today} />
						<Route exact path="/index/activity" component={Activity} />
					</Switch>
				</Container>
			</div>
		);
	}
}

export default withStyles(useStyles)(Index);
