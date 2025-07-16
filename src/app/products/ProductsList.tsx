"use client";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "@/app/services/firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Modal from "@mui/material/Modal";
import AddProduct from "./AddProduct";
import { useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "80%", md: "600px" },
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: 2,
  p: { xs: 2, sm: 4 },
  maxHeight: "90vh",
  overflowY: "auto",
};

import type { Product } from "./AddProduct";

export default function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallMobile = useMediaQuery("(max-width:400px)");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);
  const [rows, setRows] = useState<Product[]>([]);
  const [allRows, setAllRows] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Product | null>(null);

  const empCollectionRef = collection(db, "products");

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (page > 0 && page >= Math.ceil(rows.length / rowsPerPage)) {
      setPage(Math.max(0, Math.ceil(rows.length / rowsPerPage) - 1));
    }
  }, [rows, rowsPerPage, page]);

  const getUsers = async () => {
    try {
      setLoading(true);
      const data = await getDocs(empCollectionRef);
      const products = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setRows(products);
      setAllRows(products);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      showSnackbar("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setCurrentProduct(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id: string) => {
    try {
      const userDoc = doc(db, "products", id);
      await deleteDoc(userDoc);
      showSnackbar("Product deleted successfully", "success");
      getUsers();
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to delete product", "error");
    }
  };

  const filterData = (v: Product | null) => {
    if (v) {
      setRows([v]);
      setPage(0);
    } else {
      setRows(allRows);
      setPage(0);
    }
  };

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    row: Product
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEditFromMenu = () => {
    if (selectedRow) {
      handleEditProduct(selectedRow);
    }
    handleMenuClose();
  };

  const handleDeleteFromMenu = () => {
    if (selectedRow) {
      deleteUser(selectedRow.id);
    }
    handleMenuClose();
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddProduct
              open={open}
              onClose={handleClose}
              onSave={async () => {
                await getUsers();
                handleClose();
              }}
              loading={loading}
              productToEdit={currentProduct}
            />
          </Box>
        </Modal>
      </div>

      <Box sx={{ padding: { xs: 0.3, sm: 3 } }}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
            elevation={6}
            variant="filled"
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            padding: { xs: 1, sm: 2 },
            borderRadius: 3,
            boxShadow: theme.shadows[4],
            background:
              theme.palette.mode === "dark"
                ? theme.palette.background.default
                : "#f9f9f9",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
              }}
            >
              Products List
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                width: isMobile ? "100%" : "auto",
                flexDirection: isMobile ? "column-reverse" : "row",
              }}
            >
              {isMobile ? (
                <>
                  {searchOpen && (
                    <Autocomplete
                      disablePortal
                      id="search-products-mobile"
                      options={rows}
                      sx={{ width: "100%" }}
                      onChange={(e, v) => filterData(v)}
                      getOptionLabel={(row) => row.name || ""}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          label="Search Products"
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  )}
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="Search">
                      <IconButton
                        onClick={toggleSearch}
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          color: "white",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.dark,
                          },
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>
                    <Button
                      variant="contained"
                      startIcon={<AddCircleIcon />}
                      onClick={handleOpen}
                      fullWidth={isMobile}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark,
                          transform: "translateY(-2px)",
                          boxShadow: theme.shadows[4],
                        },
                        transition: "all 0.3s ease",
                        flexGrow: 1,
                      }}
                    >
                      {isMobile ? "Add" : "Add Product"}
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Autocomplete
                    disablePortal
                    id="search-products"
                    options={rows}
                    sx={{ width: 300 }}
                    onChange={(e, v) => filterData(v)}
                    getOptionLabel={(row) => row.name || ""}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Search Products"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <SearchIcon
                              sx={{ mr: 1, color: theme.palette.action.active }}
                            />
                          ),
                        }}
                      />
                    )}
                  />
                  <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={handleOpen}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.dark,
                        transform: "translateY(-2px)",
                        boxShadow: theme.shadows[4],
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Add Product
                  </Button>
                </>
              )}
            </Box>
          </Box>

          <Divider
            sx={{
              marginBottom: 3,
              borderColor: theme.palette.divider,
              borderBottomWidth: 2,
            }}
          />

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 200,
                padding: 4,
              }}
            >
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : error ? (
            <Alert
              severity="error"
              sx={{
                marginBottom: 2,
                borderRadius: 2,
              }}
              variant="outlined"
            >
              {error}
            </Alert>
          ) : rows.length === 0 ? (
            <Alert
              severity="info"
              sx={{
                marginBottom: 2,
                borderRadius: 2,
              }}
              variant="outlined"
            >
              No products found. Add a product to get started.
            </Alert>
          ) : (
            <>
              <TableContainer
                sx={{
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  size={isMobile ? "small" : "medium"}
                >
                  {!isMobile && (
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? theme.palette.grey[800]
                                : theme.palette.grey[200],
                          }}
                        >
                          Name
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? theme.palette.grey[800]
                                : theme.palette.grey[200],
                          }}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? theme.palette.grey[800]
                                : theme.palette.grey[200],
                          }}
                        >
                          Category
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? theme.palette.grey[800]
                                : theme.palette.grey[200],
                          }}
                        >
                          Date
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            fontWeight: "bold",
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? theme.palette.grey[800]
                                : theme.palette.grey[200],
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <TableRow
                          hover
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            "&:hover": {
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? theme.palette.grey[800]
                                  : theme.palette.grey[100],
                            },
                          }}
                        >
                          {isMobile ? (
                            <TableCell
                              align="left"
                              sx={{
                                py: 1,
                                display: "block",
                                borderBottom: "none",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  mb: 1,
                                }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  fontWeight="bold"
                                >
                                  {row.name}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={(e) => handleMenuOpen(e, row)}
                                >
                                  <MoreVertIcon fontSize="small" />
                                </IconButton>
                              </Box>
                              <Box sx={{ mb: 1 }}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <strong>Price:</strong> ${row.price}
                                </Typography>
                              </Box>
                              <Box sx={{ mb: 1 }}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <strong>Category:</strong> {row.category}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <strong>Date:</strong>{" "}
                                  {row.date &&
                                    new Date(row.date).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </TableCell>
                          ) : (
                            <>
                              <TableCell align="left" sx={{ py: 2 }}>
                                {row.name}
                              </TableCell>
                              <TableCell align="left" sx={{ py: 2 }}>
                                ${row.price}
                              </TableCell>
                              <TableCell align="left" sx={{ py: 2 }}>
                                {row.category}
                              </TableCell>
                              <TableCell align="left" sx={{ py: 2 }}>
                                {row.date &&
                                  new Date(row.date).toLocaleDateString()}
                              </TableCell>
                              <TableCell align="left" sx={{ py: 2 }}>
                                <Stack direction="row" spacing={1}>
                                  <Tooltip title="Edit">
                                    <IconButton
                                      onClick={() => handleEditProduct(row)}
                                      size="small"
                                      color="primary"
                                      sx={{
                                        backgroundColor:
                                          theme.palette.primary.light,
                                        color: "white",
                                        "&:hover": {
                                          backgroundColor:
                                            theme.palette.primary.main,
                                        },
                                      }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete">
                                    <IconButton
                                      onClick={() => deleteUser(row.id)}
                                      size="small"
                                      color="error"
                                      sx={{
                                        backgroundColor:
                                          theme.palette.error.light,
                                        color: "white",
                                        "&:hover": {
                                          backgroundColor:
                                            theme.palette.error.main,
                                        },
                                      }}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleEditFromMenu}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDeleteFromMenu}>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" color="error" />
                  </ListItemIcon>
                  <ListItemText sx={{ color: theme.palette.error.main }}>
                    Delete
                  </ListItemText>
                </MenuItem>
              </Menu>

              <TablePagination
                rowsPerPageOptions={isSmallMobile ? [5, 10] : [5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  marginTop: 2,
                  "& .MuiTablePagination-toolbar": {
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                  },
                  "& .MuiTablePagination-actions": {
                    marginLeft: isMobile ? 0 : "auto",
                  },
                }}
                labelRowsPerPage={isSmallMobile ? "Rows:" : "Rows per page:"}
              />
            </>
          )}
        </Paper>
      </Box>
    </>
  );
}
