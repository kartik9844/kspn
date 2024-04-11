import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { resolveMethod, getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { contract,client } from "../_app";
import { useRouter } from 'next/router';

export default function Smartlist() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const { data, isLoading } = useReadContract({ 
    contract, 
    method: resolveMethod("listCertificates"), 
    params: [] 
  });

  useEffect(() => {
    if (data) {
      const [serialNumbers, fullNames, hashes] = data;
      setRows(serialNumbers);
    }
  }, [data]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const [serialNumbers, fullNames, hashes] = data;
  console.log(serialNumbers)
  return (
    <Paper sx={{ width: "85%", overflow: "hidden", padding: "12px" }} className="absolute top-[0px] left-[209px]">
      <Divider />
      <Box height={0} />
      <Stack direction="row" spacing={2} className="my-0.0 mb-0.0">
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={rows}
          sx={{ width: 300 }}
          onChange={(e, v) => filterData(v)}
          getOptionLabel={(rows) => rows.name || ""}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Search Products" />
          )}
        /> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
        {/* <Button variant="contained" endIcon={<AddCircleIcon />}>
          Add
        </Button> */}
      </Stack>

      <Box height={50} />

      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Serial Numbers
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Name
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Hash
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={index}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/keonics/khashc?certificateHash=${hashes[index]}`)}
              >
                <TableCell align="left">{serialNumbers[index].toString()}</TableCell>
                <TableCell align="left">{fullNames[index]}</TableCell>
                <TableCell align="left">{hashes[index]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}