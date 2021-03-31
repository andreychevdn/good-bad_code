import { useState } from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { User } from "./components/user";
import { useUsers } from "../../customHooks/useUsers";
import { AppAlert } from "../../components/alert";
import { useStyles } from "./styles";

export const Users = () => {
  const classes = useStyles();
  const [searcherValue, setSearcherValue] = useState("");
  const users = useUsers(searcherValue);

  const handlerSearcher = (event) => {
    setSearcherValue(event.target.value);
  };

  return (
    <Container className={classes.root}>
      <Paper className={classes.header}>
        <Typography variant="h5" align="center">
          GitHub Searcher
        </Typography>
        <Box display="flex" justifyContent="center">
          <TextField
            variant="outlined"
            placeholder="Search for Users"
            size="small"
            onChange={handlerSearcher}
          />
        </Box>
      </Paper>
      {users.alert.isVisible ? <AppAlert /> : null}
      {users.isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress className={classes.loader} />
        </Box>
      ) : searcherValue ? (
        <Paper className={classes.wrap}>
          <Typography>Users found: {users.numberUsers}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>User login</TableCell>
                <TableCell colSpan={2} align="center">
                  Repositories count
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.data.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <User login={user.login} avatar={user.avatar_url} />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      ) : null}
    </Container>
  );
};
