import React, { Component } from "react";
import { Link } from "react-router-dom";
import url from "../../config/url";

export default class Activities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activities: [],
			modalIsOpen: false,
			name: "",
			met: "",
			activityUpdateSuccess: null,
		};
		this.activity = {};
		this.token = localStorage.getItem("authToken");
	}

	getAllActivities = () => {
		fetch(url.BASE_URL + url.ACTIVITY_URL, {
			headers: { Authorization: `Bearer ${this.token}` },
		})
			.then((res) => res.json())
			.then((data) => {
				this.setState({ activities: data });
			})
			.catch((err) => console.log(err));
	};
	componentDidMount = () => {
		this.getAllActivities();
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

	toggleModalState = () => {
		this.setState({ modalIsOpen: !this.state.modalIsOpen });
	};

	setValues = (index) => {
		this.activity = this.state.activities[index];
	};

	handleChange = (event, key) => {
		this.activity[key] = event.target.value;
	};

	updateActivity = (id) => {
		fetch(url.BASE_URL + url.ACTIVITY_URL + `update/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.token}`,
			},
			body: JSON.stringify(this.activity),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.code === 1) {
					this.toggleModalState();
					this.setState({ activityUpdateSuccess: true });
				}
			});
	};
	render() {
		return (
			<div style={{ marginTop: "1rem" }}>
				<div className="row p-3 mt-2 mb-2">
					<h3>Activities</h3>
					<Link
						to="/dashboard/activities/add"
						className="btn btn-primary ml-auto col-md-2 d-flex align-items-center justify-content-center"
					>
						Add Activity
					</Link>
				</div>
				{this.state.modalIsOpen === true ? (
					<div
						className="modal-dialog position-fixed"
						style={{ top: "20%", left: "30%", width: "50%", zIndex: 2 }}
						role="document"
					>
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Update Activity</h5>
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
										defaultValue={this.activity.name}
										onChange={(event) => this.handleChange(event, "name")}
									/>
								</div>
								<div className="form-group">
									<input
										onChange={(event) => this.handleChange(event, "met")}
										type="number"
										placeholder="MET"
										className="form-control"
										defaultValue={this.activity.met}
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
									onClick={() => this.updateActivity(this.activity._id)}
								>
									Save changes
								</button>
							</div>
						</div>
					</div>
				) : null}

				{this.state.activityUpdateSuccess ? (
					<div
						className="alert alert-success"
						onClick={() => {
							this.setState({
								activityUpdateSuccess: !this.state.activityUpdateSuccess,
							});
						}}
					>
						Activity updated successfully!
					</div>
				) : null}
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
