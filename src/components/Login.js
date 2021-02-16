import React, { Component } from "react";
import { Link } from "react-router-dom";
import url from "../config/url";

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loginSuccess: null,
		};
		this.user = {};
		this.fields = {};
	}

	readInput(event, key) {
		this.user[key] = event.target.value;
		this.fields[key] = event.target;
	}

	login() {
		fetch(url.BASE_URL + url.LOGIN_URL, {
			method: "POST",
			body: JSON.stringify(this.user),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.code === 0) {
					this.setState({ loginSuccess: false });
				} else {
					localStorage.setItem("authToken", data.token);
					localStorage.setItem("authRole", data.userInfo.role);
					localStorage.setItem("authStatus", true);
					localStorage.setItem("user_id", data.userInfo._id);

					if (data.userInfo.role === "customer") {
						this.props.history.replace("/index");
					} else if (data.userInfo.role === "admin") {
						this.props.history.replace("/dashboard");
					}
				}
			})
			.catch((err) => console.log(err));
	}
	render() {
		return (
			<div
				className="container border rounded p-3"
				style={{ marginTop: "3rem" }}
			>
				<h1>Login Page</h1>
				<div className="container-fluid mt-4 w-75 p-3">
					{this.state.loginSuccess === false ? (
						<div className="alert alert-danger">Wrong username or password</div>
					) : null}
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
					<div className="d-flex align-items-center justify-content-between p-2  ml-auto">
						<button onClick={() => this.login()} className="btn btn-primary">
							Login
						</button>
						<div className="d-flex flex-column align-items-center  ">
							Don't have an account? <Link to="/register">Register here.</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
