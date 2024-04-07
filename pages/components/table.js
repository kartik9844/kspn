import { useEffect, useState } from "react";
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
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function LTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([
    { serialNo: 1, fullName: "John Doe", hash: "abc123" },
    { serialNo: 2, fullName: "Jane Smith", hash: "def456" },
    { serialNo: 3, fullName: "Mike Johnson", hash: "ghi789" },
    { serialNo: 4, fullName: "Emily Davis", hash: "jkl012" },
    { serialNo: 5, fullName: "Chris Wilson", hash: "mno345" },
    { serialNo: 6, fullName: "Sarah Brown", hash: "pqr678" },
    { serialNo: 7, fullName: "Tom Thompson", hash: "stu901" },
    { serialNo: 8, fullName: "Laura Miller", hash: "vwx234" },
    { serialNo: 9, fullName: "Kevin Clark", hash: "yz1234" },
    { serialNo: 10, fullName: "Jessica White", hash: "5678ab" },
  ]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {rows.length > 0 && (
        <Paper sx={{ width: "85%", overflow: "hidden", padding: "12px" }}>
          <Divider />
          <Box height={10} />
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Licence List
            </Typography>
          </Stack>
          <Box height={10} />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Serial No
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Full Name
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: "100px" }}>
                    Hash
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.serialNo} // Ensure this key matches a unique identifier from your data
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell align="left">{row.serialNo}</TableCell>
                      <TableCell align="left">{row.fullName}</TableCell>
                      <TableCell align="left">{row.hash}</TableCell>
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
      )}
    </>
  );
}
