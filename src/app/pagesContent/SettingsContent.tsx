"use client";
import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import {
  Store as StoreIcon,
  Payment as PaymentIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Save,
  Refresh,
  Add,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface SettingsContentProps {
  isMobile: boolean;
}

function CustomTabPanel({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

const SettingsContent = ({ isMobile }: SettingsContentProps) => {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery("(max-width:400px)");
  const [value, setValue] = useState(0);
  const [storeInfo, setStoreInfo] = useState({
    name: "Mobile World",
    email: "contact@mobileworld.com",
    phone: "+1234567890",
    address: "123 Main St, City",
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleStoreInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
  };

  const tabIcons = [
    <StoreIcon key="store" fontSize={isSmallMobile ? "small" : "medium"} />,
    <PaymentIcon key="payment" fontSize={isSmallMobile ? "small" : "medium"} />,
    <NotificationsIcon
      key="notifications"
      fontSize={isSmallMobile ? "small" : "medium"}
    />,
    <SecurityIcon
      key="security"
      fontSize={isSmallMobile ? "small" : "medium"}
    />,
  ];

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        my: 0,
        borderRadius: 0,
        boxShadow: "none",
        minHeight: "100vh",
      }}
    >
      <CardHeader
        title={
          <Typography
            variant={isSmallMobile ? "h6" : "h5"}
            fontWeight="bold"
            fontSize={isSmallMobile ? "1.1rem" : "1.5rem"}
          >
            Shop Settings
          </Typography>
        }
        subheader={
          <Typography
            variant="subtitle2"
            fontSize={isSmallMobile ? "0.7rem" : "0.875rem"}
          >
            Manage your store configuration
          </Typography>
        }
        avatar={
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: isSmallMobile ? 32 : 40,
              height: isSmallMobile ? 32 : 40,
            }}
          >
            <StoreIcon fontSize={isSmallMobile ? "small" : "medium"} />
          </Avatar>
        }
        action={
          <IconButton size={isSmallMobile ? "small" : "medium"}>
            <Refresh fontSize={isSmallMobile ? "small" : "medium"} />
          </IconButton>
        }
        sx={{
          px: 2,
          pt: 2,
          pb: 1,
          "& .MuiCardHeader-content": {
            overflow: "hidden",
          },
          "& .MuiCardHeader-title": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }}
      />

      <Box sx={{ borderBottom: 1, borderColor: "divider", px: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              minWidth: "auto",
              fontSize: isSmallMobile ? "0.6rem" : "0.75rem",
              px: isSmallMobile ? 0.5 : 1,
              py: 0.5,
              gap: 0.5,
              textTransform: "none",
              minHeight: "40px",
            },
          }}
        >
          {["Store Info", "Payment", "Notifications", "Security"].map(
            (label, index) => (
              <Tab
                key={label}
                label={isSmallMobile ? label.split(" ")[0] : label}
                icon={tabIcons[index]}
                iconPosition={isSmallMobile ? "top" : "start"}
                sx={{
                  minHeight: "auto",
                  minWidth: isSmallMobile ? 60 : "auto",
                }}
              />
            )
          )}
        </Tabs>
      </Box>

      <CardContent sx={{ p: 1 }}>
        {/* Store Info Panel */}
        <CustomTabPanel value={value} index={0}>
          <Box
            sx={{
              display: "grid",
              gap: 1.5,
              gridTemplateColumns: "1fr",
            }}
          >
            <TextField
              fullWidth
              label="Store Name"
              name="name"
              value={storeInfo.name}
              onChange={handleStoreInfoChange}
              size="small"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={storeInfo.email}
              onChange={handleStoreInfoChange}
              size="small"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={storeInfo.phone}
              onChange={handleStoreInfoChange}
              size="small"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={storeInfo.address}
              onChange={handleStoreInfoChange}
              size="small"
              multiline
              rows={2}
              variant="outlined"
            />
            <Button
              variant="contained"
              size="small"
              startIcon={<Save fontSize="small" />}
              sx={{
                mt: 0.5,
                py: 1,
                fontSize: "0.75rem",
              }}
            >
              Save Store Info
            </Button>
          </Box>
        </CustomTabPanel>

        {/* Payment Panel */}
        <CustomTabPanel value={value} index={1}>
          <Stack spacing={1.5}>
            <Typography variant="h6" fontWeight="medium" fontSize="1rem">
              Payment Settings
            </Typography>
            <Divider />

            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "0.875rem" }}>
                Primary Payment Method
              </InputLabel>
              <Select
                label="Primary Payment Method"
                defaultValue="cod"
                sx={{ fontSize: "0.875rem" }}
              >
                <MenuItem value="stripe" sx={{ fontSize: "0.875rem" }}>
                  Credit Card (Stripe)
                </MenuItem>
                <MenuItem value="paypal" sx={{ fontSize: "0.875rem" }}>
                  PayPal
                </MenuItem>
                <MenuItem value="cod" sx={{ fontSize: "0.875rem" }}>
                  Cash on Delivery
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: "0.875rem" }}>
                Default Currency
              </InputLabel>
              <Select
                label="Default Currency"
                defaultValue="usd"
                sx={{ fontSize: "0.875rem" }}
              >
                <MenuItem value="usd" sx={{ fontSize: "0.875rem" }}>
                  USD ($)
                </MenuItem>
                <MenuItem value="eur" sx={{ fontSize: "0.875rem" }}>
                  EUR (€)
                </MenuItem>
                <MenuItem value="gbp" sx={{ fontSize: "0.875rem" }}>
                  GBP (£)
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              size="small"
              startIcon={<Save fontSize="small" />}
              sx={{
                mt: 0.5,
                py: 1,
                fontSize: "0.75rem",
              }}
            >
              Update Payment Settings
            </Button>
          </Stack>
        </CustomTabPanel>

        {/* Notifications Panel */}
        <CustomTabPanel value={value} index={2}>
          <Stack spacing={1.5}>
            <Typography variant="h6" fontWeight="medium" fontSize="1rem">
              Notification Preferences
            </Typography>
            <Divider />

            <Box>
              <FormControlLabel
                control={<Switch color="primary" defaultChecked size="small" />}
                label="Email Notifications"
                sx={{ mb: 0.5 }}
                componentsProps={{
                  typography: { fontSize: "0.875rem" },
                }}
              />
              <FormControlLabel
                control={<Switch color="primary" size="small" />}
                label="SMS Notifications"
                sx={{ mb: 0.5 }}
                componentsProps={{
                  typography: { fontSize: "0.875rem" },
                }}
              />
              <FormControlLabel
                control={<Switch color="primary" defaultChecked size="small" />}
                label="Low Stock Alerts"
                componentsProps={{
                  typography: { fontSize: "0.875rem" },
                }}
              />
            </Box>

            <TextField
              fullWidth
              label="Admin Email"
              defaultValue="admin@mobileworld.com"
              size="small"
            />

            <Button
              variant="contained"
              size="small"
              startIcon={<Save fontSize="small" />}
              sx={{
                py: 1,
                fontSize: "0.75rem",
              }}
            >
              Save Notification Settings
            </Button>
          </Stack>
        </CustomTabPanel>

        {/* Security Panel */}
        <CustomTabPanel value={value} index={3}>
          <Stack spacing={1.5}>
            <Typography variant="h6" fontWeight="medium" fontSize="1rem">
              Security Settings
            </Typography>
            <Divider />

            <Box
              sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "1fr",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  py: 1,
                  fontSize: "0.75rem",
                }}
              >
                Change Password
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  py: 1,
                  fontSize: "0.75rem",
                }}
              >
                Enable Two-Factor Auth
              </Button>
            </Box>

            <FormControlLabel
              control={<Switch color="primary" defaultChecked size="small" />}
              label="Auto logout after 30 minutes"
              componentsProps={{
                typography: { fontSize: "0.875rem" },
              }}
            />

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <TextField
                fullWidth
                label="Add New Admin"
                placeholder="Enter admin email"
                size="small"
              />
              <Button
                variant="contained"
                startIcon={<Add fontSize="small" />}
                sx={{
                  whiteSpace: "nowrap",
                  minWidth: "100%",
                  py: 1,
                  fontSize: "0.75rem",
                }}
              >
                Add Admin
              </Button>
            </Box>
          </Stack>
        </CustomTabPanel>
      </CardContent>
    </Card>
  );
};

export default SettingsContent;
