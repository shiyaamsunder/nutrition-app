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
import url from "../../config/url";
import FoodCard from "./FoodCard";

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

export default function Food() {
	const classes = useStyles();
	const [foods, setFoods] = useState([]);
	const [amount, setAmount] = useState("");
	const [foodQuery, setFoodQuery] = useState("");
	const [foodResults, setFoodResults] = useState([]);
	const [currentFood, setCurrentFood] = useState({});
	const [currentFoodCopy, setCurrentFoodCopy] = useState({});
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const token = localStorage.getItem("authToken");

	useEffect(() => {
		// to get the food data
		fetch(url.BASE_URL + url.FOOD_URL, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setFoods(data.foods);
				setCurrentFood(data.foods[0]);
				setCurrentFoodCopy(data.foods[0]);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		const searchFoods = foods.filter((food) => {
			return food.name.toLowerCase().includes(foodQuery);
		});
		foodQuery.length === 0 ? setFoodResults([]) : setFoodResults(searchFoods);
	}, [foodQuery]);

	const handleInputChange = (event) => {
		setFoodQuery(event.target.value);
	};

	const selectFood = (food) => {
		setFoodResults([]);
		setFoodQuery("");
		setAmount("");
		setCurrentFood(food);
		setCurrentFoodCopy(food);
	};

	const handleAmountChange = (event) => {
		let inputAmount = event.target.value;
		let convertedInputAmount = Number(event.target.value);
		setAmount(inputAmount);

		if (inputAmount !== "") {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
		if (convertedInputAmount !== 0) {
			let newFood = currentFood;
			newFood = {
				...newFood,
				protien: (
					(currentFood.protien * convertedInputAmount) /
					currentFood.weight
				).toFixed(2),
				fat: (
					(currentFood.fat * convertedInputAmount) /
					currentFood.weight
				).toFixed(2),
				fiber: (
					(currentFood.fiber * convertedInputAmount) /
					currentFood.weight
				).toFixed(2),
				carbs: (
					(currentFood.carbs * convertedInputAmount) /
					currentFood.weight
				).toFixed(2),
				calories: (
					(currentFood.calories * convertedInputAmount) /
					currentFood.weight
				).toFixed(2),
				weight: convertedInputAmount,
			};

			setCurrentFood(newFood);
		} else {
			setCurrentFood(currentFoodCopy);
		}
	};
	const addToRoutine = () => {
		setAmount("");
		const userFood = {};
		userFood.user = localStorage.getItem("user_id");
		userFood.food = currentFood._id;
		userFood.date = new Date().toDateString();
		userFood.weight = currentFood.weight;
		userFood.unit = currentFood.unit;

		fetch(url.BASE_URL + url.USER_URL + "userfood", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(userFood),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setButtonDisabled(true);
				setAmount("");
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className={classes.root}>
			<Grid container direction="column" alignItems="center" justify="center">
				<TextField
					className={classes.search}
					id="standard-basic"
					label="Search Food"
					value={foodQuery}
					onChange={(event) => {
						handleInputChange(event);
					}}
					variant="outlined"
				/>
			</Grid>
			<Card
				style={{
					position: "absolute",
					width: "587px",
					backgroundColor: "white",
					zIndex: 2,
					padding: 0,
				}}
			>
				{foodResults.map((food) => {
					return (
						<CardContent
							onClick={() => selectFood(food)}
							style={{ padding: 0 }}
							key={food._id}
						>
							<List>
								<ListItem button>
									<ListItemText>{food.name}</ListItemText>
								</ListItem>
							</List>
							<Divider />
						</CardContent>
					);
				})}
			</Card>

			<FoodCard
				food={currentFood}
				buttonDisabled={buttonDisabled}
				handleAmountChange={handleAmountChange}
				addToRoutine={addToRoutine}
				amount={amount}
			/>
		</div>
	);
}
