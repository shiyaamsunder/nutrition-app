import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Activities from "./Activities";
import AddActivity from "./AddActivity";
import AddFood from "./AddFood";
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
					<Link className="navbar-brand" to="/dashboard">
						Fit Health
					</Link>
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
									Activities
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
					<Route path="/dashboard/activities" exact component={Activities} />
					<Route path="/dashboard/foods" exact component={Foods} />
					<Route path="/dashboard/activities/add" component={AddActivity} />
					<Route path="/dashboard/foods/add" component={AddFood} />
				</Switch>
			</div>
		);
	}
}
