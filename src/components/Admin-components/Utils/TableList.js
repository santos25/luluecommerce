import React, { useState } from "react";

import {
  Box,
  Avatar,
  Table,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Paper,
  TablePagination,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  table: {
    minWidth: 650,
  },
}));

const TableList = ({ datas, columns, renderButtons }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    // console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value));
  };

  return (
    <Grid container>
      <Grid xs={12} item>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column, i) => (
                  <TableCell key={i} align={column.align}>
                    {column.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? datas.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : datas
              ).map((data, index) => (
                <TableRow key={index}>
                  {Object.keys(data).map((column, index) =>
                    data[column].image ? (
                      <TableCell key={index} component="th" scope="row">
                        <Avatar
                          className={classes.large}
                          alt=""
                          src={data[column].value}
                        />
                      </TableCell>
                    ) : (
                      <TableCell key={index} align="right">
                        {data[column].value}
                      </TableCell>
                    )
                  )}
                  {renderButtons && (
                    <TableCell>
                      <Box>{renderButtons(index)}</Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={datas.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default TableList;
