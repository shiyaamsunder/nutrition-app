import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Index from "./components/Customer/Index";
import RouteGuard from "./components/RouteGuard";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />

					{/* after login routes */}
					<RouteGuard path="/dashboard" component={Dashboard} />
					<RouteGuard path="/index" component={Index} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
