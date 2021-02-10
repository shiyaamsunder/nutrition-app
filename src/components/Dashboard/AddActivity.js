import React, { Component } from "react";
import url from "../../config/url";

export default class AddActivity extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activityAdded: null,
			buttonDisabled: true,
		};
		this.activity = {};
		this.fields = {};
		this.token = localStorage.getItem("authToken");
	}

	readInput = (event, key) => {
		this.activity[key] = event.target.value;
		this.fields[key] = event.target;
		this.setState({ buttonDisabled: false });
	};

	addActivity = () => {
		fetch(url.BASE_URL + url.ACTIVITY_URL + "create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.token}`,
			},
			body: JSON.stringify(this.activity),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.code == 1) {
					this.setState({ activityAdded: true });
					this.clearForm();
				}
			})
			.catch((err) => console.log(err));
	};

	clearForm = () => {
		this.fields.name.value = "";
		this.fields.met.value = "";
	};

	render() {
		return (
			<div style={{ marginTop: "1rem" }}>
				<div className="row p-3 mt-2 mb-2">
					<h3 className="mb-3">Add Activity</h3>
				</div>
				<div className="container w-75">
					{this.state.activityAdded ? (
						<div className="alert alert-success">
							Activity Added Successfully!
						</div>
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
							onChange={(event) => this.readInput(event, "met")}
							type="number"
							placeholder="MET"
							className="form-control"
						/>
					</div>
					<div className="row p-3">
						<button
							onClick={this.clearForm}
							className="btn btn-secondary col-md-2  ml-auto mr-3"
							disabled={this.state.buttonDisabled}
						>
							Clear
						</button>
						<button
							onClick={this.addActivity}
							className="btn btn-primary col-md-2"
						>
							Add
						</button>
					</div>
				</div>
			</div>
		);
	}
}
