import { Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import url from "../../../config/url";
import Food from "./Food";
import FoodCard from "./FoodCard";
import StatCard from "./StatCard";

import { v4 as uuid } from "uuid";

class Today extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userFoods: [],
			total: {
				calories: 0,
				carbs: 0,
				protien: 0,
				fat: 0,
				fiber: 0,
				weight: 0,
				unit: "g",
			},
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
				this.calculateTotal();
			})
			.catch((err) => console.log(err));
	};

	handleChange = (nextState) => {
		this.setState({ userFoods: nextState });
	};

	calculateTotal = () => {
		let total = {
			calories: 0,
			carbs: 0.0,
			protien: 0,
			fat: 0,
			fiber: 0,
			weight: 0,
			unit: "g",
		};

		this.state.userFoods.map((userfood) => {
			total.protien += Number(userfood.food.protien);
			total.carbs += Number(userfood.food.carbs);
			total.fat += Number(userfood.food.fat);
			total.fiber += Number(userfood.food.fiber);
			total.calories += Number(userfood.food.calories);

			console.log(Number(userfood.food.carbs));
		});
		this.setState({ total: total });
	};

	render() {
		return (
			<>
				{console.log(this.state.userFoods)}
				<Typography variant="h4">Today's Stat</Typography>
				<Grid
					alignItems="flex-start"
					justify="center"
					spacing={3}
					direction="row"
					container
				>
					<Grid item md={5} sm={12}>
						<StatCard total_values={this.state.total} />
					</Grid>
					<Grid item md={7} sm={12}>
						<Food
							handleChange={this.handleChange}
							userFoods={this.state.userFoods}
							calculateTotal={this.calculateTotal}
						/>
					</Grid>
				</Grid>
				<Grid container alignItems="center" justify="flex-start" spacing={3}>
					{this.state.userFoods.map((userfood) => {
						return (
							<Grid item md={4} sm={6} key={uuid()}>
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
