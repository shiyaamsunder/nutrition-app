import React, { Component } from "react";
import { Link } from "react-router-dom";
import url from "../../config/url";

export default class Users extends Component {
	constructor(props) {
		super(props);

		this.state = { users: [], foodUpdateSuccess: null };
		this.token = localStorage.getItem("authToken");
		this.user = {};
	}

	getAllUsers = () => {
		fetch(url.BASE_URL + url.USER_URL, {
			headers: { Authorization: `Bearer ${this.token}` },
		})
			.then((res) => res.json())
			.then((data) => {
				this.setState({ users: data.users });
			})
			.catch((err) => console.log(err));
	};

	componentDidMount = () => {
		this.getAllUsers();
	};

	toggleApprove = (index) => {
		let users = this.state.users;
		let user = users[index];
		let id = user._id;
		user.approved = !user.approved;

		fetch(url.BASE_URL + url.USER_URL + `update/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.token}`,
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.code === 1) {
					users[index] = user;
					this.setState({
						users: users,
					});
					console.log("updated");
				}
			});

		console.log(user);
	};

	render() {
		return (
			<div
				className="container"
				style={{ marginTop: "1rem", overflowX: "scroll" }}
			>
				<div className="row p-3 mt-2 mb-2">
					<h3 className="mb-3">Users</h3>
					<Link
						to="/dashboard/users/add"
						className="btn btn-primary ml-auto col-md-2 d-flex align-items-center justify-content-center"
					>
						Add User
					</Link>
				</div>

				<table className="table table-bordered table-striped">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Weight</th>
							<th>Country</th>
							<th>Age</th>
							<th>Role</th>
							<th>Email</th>
							<th>Approved</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.state.users.map((user, index) => {
							return (
								<tr key={user._id}>
									<td>{index + 1}</td>
									<td>{user.name}</td>
									<td>{user.weight}</td>
									<td>{user.country}</td>
									<td>{user.age}</td>
									<td>{user.role}</td>
									<td>{user.email}</td>
									<td>{user.approved ? "Yes" : "No"}</td>
									<td>
										{user.approved === true ? (
											<button
												className="btn btn-danger"
												style={{ width: "110px" }}
												onClick={() => this.toggleApprove(index)}
											>
												Unapprove
											</button>
										) : (
											<button
												className="btn btn-success "
												style={{ width: "110px" }}
												onClick={() => this.toggleApprove(index)}
											>
												Approve
											</button>
										)}
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
