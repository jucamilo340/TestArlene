import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { Axios } from "../../config/axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import auth from "../../Helpers/auth";
import { LOGIN_USER } from "../../constants/index";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://wallpapercave.com/wp/wp3082259.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#202123",
    color: "white",
  },
}));

const Login = () => {
  const classes = useStyles();
  let history = useHistory();

  // use formik to validate the form data
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    //validate the fields
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "The password must be a minimum of 6 characters")
        .required("The Password is required"),
      email: Yup.string().email().required("The email is required"),
    }),
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      //Request Login user
      Axios.post(LOGIN_USER, data)
        .then((res) => {
          Swal.fire("User Login Successfully", "", "success");
          auth.setUser(data);
          auth.setToken(res.data.token);
          //  redirect to the home page
          history.push("/");
        })
        .catch((err) => {
          console.log(err.response);
          Swal.fire(err.response.data.error, "", "error");
        });
    },
  });

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                helperText={formik.touched.email && formik.errors.email}
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                helperText={formik.touched.password && formik.errors.password}
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs></Grid>
              </Grid>
              <Box mt={5}></Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
