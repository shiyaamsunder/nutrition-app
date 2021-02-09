import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Activities from "./Activities";
import Foods from "./Foods";

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
								<Link className="nav-link" to="/dashboard/activities">
									Activities <span className="sr-only">(current)</span>
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/dashboard/foods">
									Food items
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="dashboard/users">
									Users
								</Link>
							</li>
							<li className="nav-item">
								<Link
									onClick={() => this.logout()}
									className="nav-link"
									to="/login"
								>
									Logout
								</Link>
							</li>
						</ul>
					</div>
				</nav>

				<Switch>
					<Route path="/dashboard" exact component={Activities} />
					<Route path="/dashboard/activities" component={Activities} />
					<Route path="/dashboard/foods" component={Foods} />
				</Switch>
			</div>
		);
	}
}
