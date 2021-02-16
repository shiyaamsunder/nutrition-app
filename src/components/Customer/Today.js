import { Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import url from "../../config/url";
import Food from "./Food";
import FoodCard from "./FoodCard";
import StatCard from "./StatCard";

class Today extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userFoods: [],
		};
		this.token = localStorage.getItem("authToken");
	}

	componentDidMount = () => {
		// to get user's food for today's date
		let user_id = localStorage.getItem("user_id");
		fetch(
			url.BASE_URL +
				url.USER_URL +
				`userfood/${user_id}/${new Date().toDateString()}`,
			{
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				let tempFoods = data.userfoods.map((userfood) => {
					userfood.food.protien = (
						(userfood.food.protien * userfood.weight) /
						userfood.food.weight
					).toFixed(2);
					userfood.food.carbs = (
						(userfood.food.carbs * userfood.weight) /
						userfood.food.weight
					).toFixed(2);
					userfood.food.calories = (
						(userfood.food.calories * userfood.weight) /
						userfood.food.weight
					).toFixed(2);
					userfood.food.fat = (
						(userfood.food.fat * userfood.weight) /
						userfood.food.weight
					).toFixed(2);
					userfood.food.fiber = (
						(userfood.food.fiber * userfood.weight) /
						userfood.food.weight
					).toFixed(2);

					return userfood;
				});

				this.setState({ userFoods: tempFoods });
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<>
				<Typography variant="h4">Today's Stat</Typography>
				<Grid
					alignItems="flex-start"
					justify="center"
					spacing={3}
					direction="row"
					container
				>
					<Grid item md={5} sm={12}>
						<StatCard />
					</Grid>
					<Grid item md={7} sm={12}>
						<Food />
					</Grid>
				</Grid>
				<Grid container alignItems="center" justify="space-evenly" spacing={3}>
					{this.state.userFoods.map((userfood) => {
						return (
							<Grid item md={4} sm={6} key={userfood.food._id}>
								<FoodCard food={userfood.food} userWeight={userfood.weight} />
							</Grid>
						);
					})}
				</Grid>
			</>
		);
	}
}

export default Today;
