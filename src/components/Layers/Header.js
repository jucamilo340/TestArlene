import React from "react";
//Material ui
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
//images
import Logo from "../../assets/logo.svg";
import { useHistory } from "react-router-dom";
//Authentication
import auth from "./../../Helpers/auth";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#202123",
    color: "white",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "#fff",
  },
  nav: {
    display: "flex",
    flexDirection: "row",
  },
}));

const Header = () => {
  const classes = useStyles();
  //User logged in
  var User = auth.getUser();
  let history = useHistory();

  //function to close session
  const logOut = () => {
    auth.signOut();
    history.push("/Login");
  };
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar  className="header">
        <img src={Logo} style={{ width: "4rem" }} alt=""/>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          ARLENE TEST
        </Typography>
        <nav className={classes.nav}>
          <Avatar alt="Remy Sharp"  />
          <Typography
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            Welcome {User.email}
          </Typography>
        </nav>
        <Button
          color="primary"
          variant="outlined"
          className={classes.link}
          onClick={() => logOut()}
        >
          log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
