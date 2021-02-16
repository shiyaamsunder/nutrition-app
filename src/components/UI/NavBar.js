import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import {
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import { History, Today } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	list: {
		width: 250,
	},
}));

export default function NavBar(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const history = useHistory();

	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	const logout = () => {
		localStorage.removeItem("authStatus");
		localStorage.removeItem("authRole");
		localStorage.removeItem("authToken");
		localStorage.removeItem("user_id");

		history.replace("/login");
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={handleDrawerOpen}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						FitHealth
					</Typography>
					<Button onClick={logout} color="inherit">
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Drawer anchor={"left"} open={open} onClose={handleDrawerClose}>
				<List onClick={handleDrawerClose} className={classes.list}>
					<Link to="/index">
						<ListItem button>
							<ListItemIcon>
								<Today />
							</ListItemIcon>
							<ListItemText>Today</ListItemText>
						</ListItem>
					</Link>
					<Divider />
					<Link to="/index/activity">
						<ListItem button>
							<ListItemIcon>
								<History />
							</ListItemIcon>
							<ListItemText>Activity</ListItemText>
						</ListItem>
					</Link>
				</List>
			</Drawer>
		</div>
	);
}
