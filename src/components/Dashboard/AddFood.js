import React, { Component } from "react";
import { Link } from "react-router-dom";
import url from "../../config/url";

export default class AddFood extends Component {
	constructor(props) {
		super(props);

		this.state = {
			foodAdded: null,
			buttonDisabled: true,
		};
		this.food = {};
		this.fields = {};
		this.token = localStorage.getItem("authToken");
	}

	readInput = (event, key) => {
		this.food[key] = event.target.value;
		this.fields[key] = event.target;
		this.setState({ buttonDisabled: false });
	};

	addFood = () => {
		fetch(url.BASE_URL + url.FOOD_URL + "create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.token}`,
			},
			body: JSON.stringify(this.food),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.code == 1) {
					this.setState({ foodAdded: true });
					this.clearForm();
				}
			})
			.catch((err) => console.log(err));
	};

	clearForm = () => {
		this.fields.name.value = "";
		this.fields.weight.value = "";
		this.fields.fat.value = "";
		this.fields.protien.value = "";
		this.fields.carbs.value = "";
		this.fields.fiber.value = "";
		this.fields.unit.value = "";
		this.fields.calories.value = "";
	};
	render() {
		return (
			<div style={{ marginTop: "1rem" }}>
				<div className="row p-3 mt-2 mb-2">
					<h3 className="mb-3">Add Food</h3>
					<Link
						to="/dashboard/foods"
						className="btn btn-primary ml-auto col-md-2 d-flex align-items-center justify-content-center"
					>
						View Foods
					</Link>
				</div>
				<div className="container w-75">
					{this.state.foodAdded ? (
						<div className="alert alert-success">Food Added Successfully!</div>
					) : null}
					<div className="form-group">
						<input
							onChange={(event) => this.readInput(event, "name")}
							type="text"
							placeholder="Name"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<input
							onChange={(event) => this.readInput(event, "weight")}
							type="number"
							placeholder="Weight"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<input
							onChange={(event) => this.readInput(event, "protien")}
							type="number"
							placeholder="Protien"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<input
							onChange={(event) => this.readInput(event, "carbs")}
							type="number"
							placeholder="Carb"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<input
							onChange={(event) => this.readInput(event, "fat")}
							type="number"
							placeholder="Fat"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<input
							onChange={(event) => this.readInput(event, "fiber")}
							type="number"
							placeholder="Fibre"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<input
							onChange={(event) => this.readInput(event, "calories")}
							type="number"
							placeholder="Calories"
							className="form-control"
						/>
					</div>
					<div className="form-group">
						<input
							onChange={(event) => this.readInput(event, "unit")}
							type="text"
							placeholder="Unit"
							className="form-control"
						/>
					</div>
					<div className="row p-3">
						<button
							onClick={this.clearForm}
							className="btn btn-secondary col-md-2 ml-auto mr-3"
							disabled={this.state.buttonDisabled}
						>
							Clear
						</button>
						<button
							onClick={this.addFood}
							className="btn btn-primary col-md-2 "
						>
							Add
						</button>
					</div>
				</div>
			</div>
		);
	}
}
