import React, { Component } from "react";
import url from "../../config/url";

export default class Activities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: [],
		};

		this.token = localStorage.getItem("authToken");
	}

	componentDidMount = () => {
		fetch(url.BASE_URL + url.ACTIVITY_URL, {
			headers: { Authorization: `Bearer ${this.token}` },
		})
			.then((res) => res.json())
			.then((data) => {
				this.setState({ activities: data });
			})
			.catch((err) => console.log(err));
	};

	delete = (id, index) => {
		fetch(url.BASE_URL + url.ACTIVITY_URL + `delete/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${this.token}` },
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.code === 1) {
					let activities = this.state.activities;
					activities.splice(index, 1);
					this.setState({ activities: activities });
				}
			});
	};
	render() {
		return (
			<div style={{ marginTop: "1rem" }}>
				<h2>Activities</h2>
				<table className="table table-bordered table-striped">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>MET</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.state.activities.map((activity, index) => {
							return (
								<tr key={activity._id}>
									<td>{index + 1}</td>
									<td>{activity.name}</td>
									<td>{activity.met}</td>
									<td className="d-flex align-items-center justify-content-around">
										<button className="btn btn-success">Update</button>
										<button
											className="btn btn-danger"
											onClick={() => this.delete(activity._id, index)}
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
