import React, { Component } from "react";
import url from "../../config/url";
export default class Foods extends Component {
	constructor(props) {
		super(props);

		this.state = { foods: [] };
		this.token = localStorage.getItem("authToken");
	}

	componentDidMount = () => {
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

	render() {
		return (
			<div style={{ marginTop: "1rem" }}>
				<h2>Foods</h2>
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
										<button className="btn btn-success">Update</button>
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
