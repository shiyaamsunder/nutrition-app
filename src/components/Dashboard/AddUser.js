import React, { Component } from "react";
import { Link } from "react-router-dom";
import url from "../../config/url";

export default class AddUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userAdded: null,
			buttonDisabled: true,
			passwordMatch: null,
		};
		this.user = { approved: false };
		this.fields = {};
		this.token = localStorage.getItem("authToken");
	}

	readInput = (event, key) => {
		this.user[key] = event.target.value;
		this.fields[key] = event.target;
		this.setState({ buttonDisabled: false });

		if (key === "cpassword") {
			if (
				this.user.cpassword !== undefined &&
				this.user.password !== undefined &&
				this.user.cpassword === this.user.password
			) {
				this.setState({ passwordMatch: true });
			} else {
				this.setState({ passwordMatch: false });
			}
		}
	};

	addUser = () => {
		if (this.state.passwordMatch === true) {
			delete this.user.cpassword;
			fetch(url.BASE_URL + url.REGISTRATION_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.token}`,
				},
				body: JSON.stringify(this.user),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.code == 1) {
						this.setState({ userAdded: true });
						this.clearForm();
					}
				})
				.catch((err) => console.log(err));
			console.log(this.user);
		}
	};

	clearForm = () => {
		let keys = Object.keys(this.fields);
		keys.forEach((key) => {
			this.fields[key].value = "";
		});

		if (this.checkbox.checked !== undefined) {
			this.checkbox.checked = false;
		}
	};

	readCheckBox = (event) => {
		this.checkbox = event.target;
		this.user.approved = event.target.checked;
	};

	render() {
		return (
			<div style={{ marginTop: "0.5rem" }}>
				<div className="row p-3  mb-1">
					<h3 className="mb-3">Add User</h3>
					<Link
						to="/dashboard/users"
						className="btn btn-primary ml-auto col-md-2 d-flex align-items-center justify-content-center"
					>
						View Users
					</Link>
				</div>
				<div className="container w-75">
					{this.state.userAdded ? (
						<div className="alert alert-success">User Added Successfully!</div>
					) : null}
					<div className="form-group mt-3">
						<input
							type="text"
							placeholder="Name"
							className="form-control"
							onChange={(event) => this.readInput(event, "name")}
						/>
					</div>
					<div className="form-group mt-3">
						<input
							type="text"
							placeholder="Email"
							className="form-control"
							onChange={(event) => this.readInput(event, "email")}
						/>
					</div>
					<div className="form-group mt-3">
						<input
							type="password"
							placeholder="Password"
							className="form-control"
							onChange={(event) => this.readInput(event, "password")}
						/>
					</div>
					<div className="form-group mt-3">
						<input
							type="password"
							placeholder="Confirm Password"
							className="form-control"
							onChange={(event) => this.readInput(event, "cpassword")}
						/>
					</div>
					{this.state.passwordMatch === false ? (
						<div className="alert alert-danger">Passwords dont match</div>
					) : null}
					<div className="form-group mt-3">
						<input
							type="number"
							placeholder="Age"
							className="form-control"
							onChange={(event) => this.readInput(event, "age")}
						/>
					</div>
					<div className="form-group mt-3">
						<input
							type="text"
							placeholder="Country"
							className="form-control"
							onChange={(event) => this.readInput(event, "country")}
						/>
					</div>
					<div className="form-group mt-3">
						<input
							type="number"
							placeholder="Weight"
							className="form-control"
							onChange={(event) => this.readInput(event, "weight")}
						/>
					</div>

					<div className="form-group mt-3">
						<select
							onChange={(event) => this.readInput(event, "role")}
							className="form-control"
							name="role"
						>
							<option value="">Select Role</option>
							<option value="customer">Customer</option>
							<option value="admin">Admin</option>
						</select>
					</div>

					<div className="form-group form-check ml-1">
						<input
							type="checkbox"
							placeholder="Approved"
							className="form-check-input"
							onChange={(event) => this.readCheckBox(event, "approved")}
						/>
						<label className="form-check-label" htmlFor="approved">
							Approved
						</label>
					</div>
					<div className="row p-3">
						<button
							onClick={this.clearForm}
							className="btn btn-secondary col-md-2  ml-auto mr-3"
							disabled={this.state.buttonDisabled}
						>
							Clear
						</button>
						<button onClick={this.addUser} className="btn btn-primary col-md-2">
							Add
						</button>
					</div>
				</div>
			</div>
		);
	}
}
