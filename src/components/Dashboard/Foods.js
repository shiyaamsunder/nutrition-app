import React, { Component } from "react";
import { Link } from "react-router-dom";
import url from "../../config/url";
export default class Foods extends Component {
	constructor(props) {
		super(props);

		this.state = { foods: [], modalIsOpen: false, foodUpdateSuccess: null };
		this.token = localStorage.getItem("authToken");
		this.food = {};
	}

	getAllFoods = () => {
		fetch(url.BASE_URL + url.FOOD_URL, {
			headers: { Authorization: `Bearer ${this.token}` },
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				this.setState({ foods: data.foods });
			})
			.catch((err) => console.log(err));
	};

	componentDidMount = () => {
		this.getAllFoods();
	};

	delete = (id, index) => {
		fetch(url.BASE_URL + url.FOOD_URL + `delete/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${this.token}` },
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.code === 1) {
					let foods = this.state.foods;
					foods.splice(index, 1);
					this.setState({ foods: foods });
				}
			});
	};

	toggleModalState = () => {
		this.setState({ modalIsOpen: !this.state.modalIsOpen });
	};

	setValues = (index) => {
		this.food = this.state.foods[index];
	};

	handleChange = (event, key) => {
		this.food[key] = event.target.value;
	};

	updateFood = (id) => {
		fetch(url.BASE_URL + url.FOOD_URL + `update/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.token}`,
			},
			body: JSON.stringify(this.food),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.code === 1) {
					this.toggleModalState();
					this.setState({ foodUpdateSuccess: true });
				}
			});
	};
	render() {
		return (
			<div
				className="container"
				style={{ marginTop: "1rem", overflowX: "scroll" }}
			>
				<div className="row p-3 mt-2 mb-2">
					<h3 className="mb-3">Foods</h3>
					<Link
						to="/dashboard/foods/add"
						className="btn btn-primary ml-auto col-md-2 d-flex align-items-center justify-content-center"
					>
						Add Food
					</Link>
				</div>
				{this.state.modalIsOpen ? (
					<div
						className="modal-dialog position-fixed"
						style={{ top: "5%", left: "30%", width: "50%", zIndex: 2 }}
						role="document"
					>
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Update Food</h5>
								<button
									type="button"
									className="close"
									onClick={this.toggleModalState}
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<div className="form-group">
									<input
										type="text"
										placeholder="Name"
										className="form-control"
										defaultValue={this.food.name}
										onChange={(event) => this.handleChange(event, "name")}
									/>
								</div>
								<div className="form-group">
									<input
										onChange={(event) => this.handleChange(event, "weight")}
										type="number"
										placeholder="Weight"
										className="form-control"
										defaultValue={this.food.weight}
									/>
								</div>
								<div className="form-group">
									<input
										onChange={(event) => this.handleChange(event, "protien")}
										type="number"
										placeholder="Protien"
										className="form-control"
										defaultValue={this.food.protien}
									/>
								</div>
								<div className="form-group">
									<input
										onChange={(event) => this.handleChange(event, "carbs")}
										type="number"
										placeholder="Carb"
										className="form-control"
										defaultValue={this.food.carbs}
									/>
								</div>
								<div className="form-group">
									<input
										onChange={(event) => this.handleChange(event, "fat")}
										type="number"
										placeholder="Fat"
										className="form-control"
										defaultValue={this.food.fat}
									/>
								</div>
								<div className="form-group">
									<input
										onChange={(event) => this.handleChange(event, "fiber")}
										type="number"
										placeholder="Fiber"
										className="form-control"
										defaultValue={this.food.fiber}
									/>
								</div>
								<div className="form-group">
									<input
										onChange={(event) => this.handleChange(event, "calories")}
										type="number"
										placeholder="Calories"
										className="form-control"
										defaultValue={this.food.calories}
									/>
								</div>
								<div className="form-group">
									<input
										onChange={(event) => this.handleChange(event, "unit")}
										type="text"
										placeholder="Unit"
										className="form-control"
										defaultValue={this.food.unit}
									/>
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={this.toggleModalState}
								>
									Close
								</button>
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => this.updateFood(this.food._id)}
								>
									Save changes
								</button>
							</div>
						</div>
					</div>
				) : null}

				{this.state.foodUpdateSuccess ? (
					<div
						className="alert alert-success"
						onClick={() => {
							this.setState({
								foodUpdateSuccess: !this.state.foodUpdateSuccess,
							});
						}}
					>
						Food updated successfully!
					</div>
				) : null}

				<table className="table table-bordered table-striped">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Weight</th>
							<th>Protien</th>
							<th>Carb</th>
							<th>Fat</th>
							<th>Fibre</th>
							<th>Calories</th>
							<th>Unit</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.state.foods.map((food, index) => {
							return (
								<tr key={food._id}>
									<td>{index + 1}</td>
									<td>{food.name}</td>
									<td>{food.weight}</td>
									<td>{food.protien}</td>
									<td>{food.carbs}</td>
									<td>{food.fat}</td>
									<td>{food.fiber}</td>
									<td>{food.calories}</td>
									<td>{food.unit}</td>
									<td className="d-flex align-items-center justify-content-around">
										<button
											className="btn btn-success"
											onClick={() => {
												this.toggleModalState();
												this.setValues(index);
											}}
										>
											Update
										</button>
										<button
											className="btn btn-danger"
											onClick={() => this.delete(food._id, index)}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
