import React, { Component } from "react";
import Activities from "./Activities";

export default class Dashboard extends Component {
	logout() {
		localStorage.removeItem("authStatus");
		localStorage.removeItem("authRole");
		localStorage.removeItem("authToken");
		this.props.history.replace("/login");
	}
	render() {
		return (
			<div className="container" style={{ marginTop: "1rem" }}>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="/dashboard">
						Fit Health
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="/navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<a className="nav-link" href="/dashboard">
									Activities <span className="sr-only">(current)</span>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/food">
									Food items
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/users">
									Users
								</a>
							</li>
							<li className="nav-item">
								<a onClick={() => this.logout()} className="nav-link" href="#">
									Logout
								</a>
							</li>
						</ul>
					</div>
				</nav>

				<Activities />
			</div>
		);
	}
}
