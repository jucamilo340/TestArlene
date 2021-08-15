import React, { useState, useEffect } from "react";
import Header from "./Layers/Header";
import Loader from "./Utils/Loader";
import { Axios } from "../config/axios";
import { GET_USERS } from "../constants/index";
//Material ui
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import left from "../assets/left.svg";
import rigth from "../assets/rigth.svg";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Home = () => {
  const classes = useStyles();
  //UseStates
  const [users, setusers] = useState([]);
  const [error, seterror] = useState("");
  const [page, setpage] = useState(1);
  const [Totalpage, setTotalpage] = useState();

  //Function to get users registers
  const getUsers = (page) => {
    if (users !== 0) {
      setusers([]);
    }
    Axios.get(GET_USERS + page)
      .then((res) => {
        setpage(res.data.page);
        setTotalpage(res.data.total_pages);
        setTimeout(() => {
          setusers(res.data.data);
        }, 500);
      })
      .catch((err) => {
        seterror(err.response.data.error);
      });
  };
  useEffect(() => {
    getUsers(page);
  }, []);
  return (
    <>
      <Header />
      {error === "" ? (
        <>
          {users.length !== 0 ? (
            <div className="body">
              <TableContainer component={Paper}>
                <Table
                  className={classes.table}
                  stickyHeader
                  aria-label="sticky table"
                >
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">id</StyledTableCell>
                      <StyledTableCell align="center">Avatar</StyledTableCell>
                      <StyledTableCell align="center">Email</StyledTableCell>
                      <StyledTableCell align="center">
                        Fisrt Name
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Last Name
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <StyledTableRow key={user.id}>
                        <StyledTableCell align="center">
                          {user.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <img src={user.avatar} alt="" />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.email}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.first_name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {user.last_name}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div className="PaginationContent">
                <div className="pagination">
                  <img
                    src={left}
                    alt=""
                    onClick={() => {
                      if (page >= Totalpage) {
                        getUsers(page - 1);
                      }
                    }}
                  />
                  <h1>
                    Page {page} of {Totalpage}
                  </h1>
                  <img
                    src={rigth}
                    alt=""
                    onClick={() => {
                      if (page < Totalpage) {
                        getUsers(page + 1);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <div className="errorContent">
          <h1 className="errorMessage">{error}</h1>
        </div>
      )}
    </>
  );
};

export default Home;
