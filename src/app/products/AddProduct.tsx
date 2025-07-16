"use client";
import { useState, useEffect } from "react";
import {
  IconButton,
  Typography,
  Grid,
  Box,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Swal from "sweetalert2";
import { db } from "@/app/services/firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  date: string;
}

interface AddFormProps {
  open: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
  onSave: () => Promise<void>;
  loading: boolean;
}

const AddProduct = ({
  open,
  onClose,
  productToEdit,
  onSave,
  loading,
}: AddFormProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState<string>("");

  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || "");
      setPrice(productToEdit.price || 0);
      setCategory(productToEdit.category || "");
      setDate(productToEdit.date ? productToEdit.date.slice(0, 10) : "");
    } else {
      resetForm();
    }
  }, [productToEdit, open]);

  const resetForm = () => {
    setName("");
    setPrice(0);
    setCategory("");
    setDate(new Date().toISOString().slice(0, 10)); // Default to today
  };

  const handleSubmit = async () => {
    if (!name || !category || price <= 0 || !date) {
      Swal.fire("Error!", "Please fill all fields correctly", "error");
      return;
    }

    const productData = {
      name,
      price,
      category,
      date: new Date(date).toISOString(), // Always save as ISO string
    };

    try {
      if (productToEdit?.id) {
        // Update existing product
        const productDoc = doc(db, "products", productToEdit.id);
        await updateDoc(productDoc, productData);
        Swal.fire("Success!", "Product updated successfully!", "success");
      } else {
        // Add new product
        await addDoc(productsCollectionRef, productData);
        Swal.fire("Success!", "Product added successfully!", "success");
      }
      await onSave();
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      Swal.fire("Error!", "Failed to save product", "error");
    }
  };

  const categories = [
    { value: "Mobile", label: "Mobile" },
    { value: "Laptop", label: "Laptop" },
    { value: "Tablet", label: "Tablet" },
    { value: "Accessories", label: "Accessories" },
  ];

  return (
    <Box sx={{ position: "relative", px: 1 }}>
      <Typography variant="h6">
        {productToEdit ? "Edit Product" : "Add Product"}
      </Typography>
      <IconButton
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={onClose}
        disabled={loading}
      >
        <CloseIcon />
      </IconButton>

      <Box height={20} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            fullWidth
            size="small"
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            value={price}
            fullWidth
            size="small"
            onChange={(e) => setPrice(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
            required
            disabled={loading}
            inputProps={{ min: 0 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            label="Category"
            variant="outlined"
            value={category}
            fullWidth
            size="small"
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={loading}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            value={date}
            fullWidth
            size="small"
            onChange={(e) => setDate(e.target.value)}
            required
            disabled={loading}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box textAlign="center">
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Processing..." : productToEdit ? "Update" : "Submit"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddProduct;
