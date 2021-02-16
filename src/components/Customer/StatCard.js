import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider, Grid, List, ListItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		height: "auto",
		margin: theme.spacing(2),
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		height: "180px",
	},
	pos: {
		marginBottom: 12,
	},
}));

export default function StatCard() {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Grid
					className={classes.title}
					container
					direction="column"
					alignItems="center"
					justify="center"
				>
					<Typography color="textSecondary" variant="h1">
						0
					</Typography>

					<Typography color="textSecondary" variant="h6">
						Total Calorie Intake
					</Typography>
				</Grid>
				<Divider />

				<Grid item>
					<List component="h5">
						<ListItem button>
							<Typography>Total Protien: 20g</Typography>
						</ListItem>
					</List>
				</Grid>
				<Grid item>
					<List component="h5">
						<ListItem button>
							<Typography>Total Fat: 30g</Typography>
						</ListItem>
					</List>
				</Grid>
				<Grid item>
					<List component="h5">
						<ListItem button>
							<Typography>Total Carbs: 100g</Typography>
						</ListItem>
					</List>
				</Grid>
				<Grid item>
					<List component="h5">
						<ListItem button>
							<Typography>Total Fiber: 12g</Typography>
						</ListItem>
					</List>
				</Grid>
			</CardContent>
		</Card>
	);
}
