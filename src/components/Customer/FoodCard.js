import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	TextField,
} from "@material-ui/core";

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
	search: {
		width: "100%",
	},
	pos: {
		marginBottom: 12,
	},
	list__item: {
		padding: 0,
	},
}));
export default function FoodCard(props) {
	const classes = useStyles();

	const {
		amount,
		addToRoutine,
		buttonDisabled,
		handleAmountChange,
		userWeight,
	} = props;

	const { name, calories, fat, fiber, protien, carbs, weight } = props.food;

	return (
		<div className={classes.root}>
			<Card style={{ marginTop: "0.4rem" }}>
				<CardContent>
					<Grid
						style={{
							minHeight: "90px",
							maxHeight: "100px",
						}}
						container
						direction="column"
						alignItems="flex-start"
						justify="center"
					>
						<Typography color="textPrimary" variant="h5">
							{name}
						</Typography>

						<Typography color="textSecondary" variant="subtitle1">
							{addToRoutine
								? `${calories}kCal `
								: `${calories}kCal (${userWeight}g)`}
						</Typography>
					</Grid>
					<Divider />

					<Grid
						container
						alignItems="center"
						justify="center"
						spacing={3}
						direction="row"
					>
						<Grid item xs={6}>
							<List component="h5">
								<ListItem button>
									<Typography>Total Protien: {protien}g</Typography>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={6}>
							<List component="h5">
								<ListItem button>
									<Typography>Total Fat: {fat}g</Typography>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={6}>
							<List component="h5">
								<ListItem button>
									<Typography>Total Carbs: {carbs}g</Typography>
								</ListItem>
							</List>
						</Grid>
						<Grid item xs={6}>
							<List component="h5">
								<ListItem button>
									<Typography>Total Fiber: {fiber}g</Typography>
								</ListItem>
							</List>
						</Grid>
					</Grid>
					{addToRoutine ? (
						<div>
							<Grid item xs={12}>
								<TextField
									style={{ width: "100%" }}
									variant="outlined"
									label="Enter Amount"
									value={amount}
									type="number"
									placeholder={weight ? weight.toString() : weight}
									onChange={(event) => handleAmountChange(event)}
								/>
							</Grid>
							<Grid item xs={4} style={{ marginTop: "1rem" }}>
								<Button
									variant="contained"
									disabled={buttonDisabled}
									color="primary"
									onClick={addToRoutine}
								>
									Add to Routine
								</Button>
							</Grid>
						</div>
					) : null}
				</CardContent>
			</Card>
		</div>
	);
}
