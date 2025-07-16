// import { useState } from "react";
// import {
//   Box,
//   Tabs,
//   Tab,
//   Typography,
//   TextField,
//   Button,
//   Switch,
//   FormControlLabel,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   useTheme,
//   useMediaQuery,
//   Divider,
//   Card,
//   CardHeader,
//   CardContent,
//   Avatar,
//   IconButton,
//   Stack,
// } from "@mui/material";
// import {
//   Store as StoreIcon,
//   Payment as PaymentIcon,
//   Notifications as NotificationsIcon,
//   Security as SecurityIcon,
//   Save,
//   Refresh,
//   Add,
// } from "@mui/icons-material";

// function CustomTabPanel({
//   children,
//   value,
//   index,
// }: {
//   children: React.ReactNode;
//   value: number;
//   index: number;
// }) {
//   return (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && <Box sx={{ p: { xs: 1, sm: 2 } }}>{children}</Box>}
//     </div>
//   );
// }

// export default function ShopSettings() {
//   const theme = useTheme();
//   const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));

//   const [value, setValue] = useState(0);
//   const [storeInfo, setStoreInfo] = useState({
//     name: "Mobile World",
//     email: "contact@mobileworld.com",
//     phone: "+1234567890",
//     address: "123 Main St, City",
//   });

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   const handleStoreInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
//   };

//   const tabIcons = [
//     <StoreIcon key="store" />,
//     <PaymentIcon key="payment" />,
//     <NotificationsIcon key="notifications" />,
//     <SecurityIcon key="security" />,
//   ];

//   return (
//     <Card
//       sx={{
//         width: "100%",
//         maxWidth: "1200px",
//         mx: "auto",
//         my: { xs: 0, sm: 2, md: 4 },
//         borderRadius: { xs: 0, sm: 3 },
//         boxShadow: { xs: "none", sm: theme.shadows[4] },
//         minHeight: { xs: "100vh", sm: "auto" },
//       }}
//     >
//       <CardHeader
//         title={
//           <Typography variant={isXSmall ? "h6" : "h5"} fontWeight="bold">
//             Shop Settings
//           </Typography>
//         }
//         subheader="Manage your store configuration"
//         avatar={
//           <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
//             <StoreIcon />
//           </Avatar>
//         }
//         action={
//           <IconButton size={isXSmall ? "small" : "medium"}>
//             <Refresh fontSize={isXSmall ? "small" : "medium"} />
//           </IconButton>
//         }
//         sx={{
//           px: { xs: 2, sm: 3 },
//           pt: { xs: 2, sm: 3 },
//           pb: { xs: 1, sm: 2 },
//         }}
//       />

//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           variant={isXSmall ? "scrollable" : "standard"}
//           scrollButtons="auto"
//           allowScrollButtonsMobile
//           sx={{
//             px: { xs: 1, sm: 3 },
//             "& .MuiTab-root": {
//               minWidth: "auto",
//               fontSize: isXSmall ? "0.7rem" : "0.875rem",
//               py: 1,
//               gap: 0.5,
//               textTransform: "none",
//               minHeight: "48px",
//             },
//           }}
//         >
//           {["Store Info", "Payment", "Notifications", "Security"].map(
//             (label, index) => (
//               <Tab
//                 key={label}
//                 label={isXSmall ? label.split(" ")[0] : label}
//                 icon={tabIcons[index]}
//                 iconPosition={isXSmall ? "top" : "start"}
//                 sx={{ minHeight: "auto" }}
//               />
//             )
//           )}
//         </Tabs>
//       </Box>

//       <CardContent sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//         {/* Store Info Panel */}
//         <CustomTabPanel value={value} index={0}>
//           <Box
//             sx={{
//               display: "grid",
//               gap: { xs: 2, sm: 3 },
//               gridTemplateColumns: {
//                 xs: "1fr",
//                 sm: "1fr",
//                 md: "1fr 1fr",
//               },
//             }}
//           >
//             <TextField
//               fullWidth
//               label="Store Name"
//               name="name"
//               value={storeInfo.name}
//               onChange={handleStoreInfoChange}
//               size={isXSmall ? "small" : "medium"}
//               variant="outlined"
//             />
//             <TextField
//               fullWidth
//               label="Email"
//               name="email"
//               value={storeInfo.email}
//               onChange={handleStoreInfoChange}
//               size={isXSmall ? "small" : "medium"}
//               variant="outlined"
//             />
//             <TextField
//               fullWidth
//               label="Phone"
//               name="phone"
//               value={storeInfo.phone}
//               onChange={handleStoreInfoChange}
//               size={isXSmall ? "small" : "medium"}
//               variant="outlined"
//             />
//             <TextField
//               fullWidth
//               label="Address"
//               name="address"
//               value={storeInfo.address}
//               onChange={handleStoreInfoChange}
//               size={isXSmall ? "small" : "medium"}
//               multiline
//               rows={isXSmall ? 2 : 3}
//               variant="outlined"
//               sx={{ gridColumn: { xs: "auto", md: "1 / -1" } }}
//             />
//             <Button
//               variant="contained"
//               size={isXSmall ? "small" : "medium"}
//               startIcon={<Save fontSize={isXSmall ? "small" : "medium"} />}
//               sx={{
//                 gridColumn: { xs: "auto", md: "1 / -1" },
//                 mt: 1,
//                 py: { xs: 1, sm: 1.5 },
//               }}
//             >
//               Save Store Info
//             </Button>
//           </Box>
//         </CustomTabPanel>

//         {/* Payment Panel */}
//         <CustomTabPanel value={value} index={1}>
//           <Stack spacing={{ xs: 2, sm: 3 }}>
//             <Typography variant="h6" fontWeight="medium">
//               Payment Settings
//             </Typography>
//             <Divider />

//             <FormControl fullWidth size={isXSmall ? "small" : "medium"}>
//               <InputLabel>Primary Payment Method</InputLabel>
//               <Select label="Primary Payment Method" defaultValue="cod">
//                 <MenuItem value="stripe">Credit Card (Stripe)</MenuItem>
//                 <MenuItem value="paypal">PayPal</MenuItem>
//                 <MenuItem value="cod">Cash on Delivery</MenuItem>
//               </Select>
//             </FormControl>

//             <FormControl fullWidth size={isXSmall ? "small" : "medium"}>
//               <InputLabel>Default Currency</InputLabel>
//               <Select label="Default Currency" defaultValue="usd">
//                 <MenuItem value="usd">USD ($)</MenuItem>
//                 <MenuItem value="eur">EUR (€)</MenuItem>
//                 <MenuItem value="gbp">GBP (£)</MenuItem>
//               </Select>
//             </FormControl>

//             <Button
//               variant="contained"
//               size={isXSmall ? "small" : "medium"}
//               startIcon={<Save fontSize={isXSmall ? "small" : "medium"} />}
//               sx={{
//                 mt: 1,
//                 py: { xs: 1, sm: 1.5 },
//               }}
//             >
//               Update Payment Settings
//             </Button>
//           </Stack>
//         </CustomTabPanel>

//         {/* Notifications Panel */}
//         <CustomTabPanel value={value} index={2}>
//           <Stack spacing={{ xs: 2, sm: 3 }}>
//             <Typography variant="h6" fontWeight="medium">
//               Notification Preferences
//             </Typography>
//             <Divider />

//             <Box>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     color="primary"
//                     defaultChecked
//                     size={isXSmall ? "small" : "medium"}
//                   />
//                 }
//                 label="Email Notifications"
//                 sx={{ mb: 1 }}
//               />
//               <FormControlLabel
//                 control={
//                   <Switch
//                     color="primary"
//                     size={isXSmall ? "small" : "medium"}
//                   />
//                 }
//                 label="SMS Notifications"
//                 sx={{ mb: 1 }}
//               />
//               <FormControlLabel
//                 control={
//                   <Switch
//                     color="primary"
//                     defaultChecked
//                     size={isXSmall ? "small" : "medium"}
//                   />
//                 }
//                 label="Low Stock Alerts"
//               />
//             </Box>

//             <TextField
//               fullWidth
//               label="Admin Email"
//               defaultValue="admin@mobileworld.com"
//               size={isXSmall ? "small" : "medium"}
//             />

//             <Button
//               variant="contained"
//               size={isXSmall ? "small" : "medium"}
//               startIcon={<Save fontSize={isXSmall ? "small" : "medium"} />}
//               sx={{ py: { xs: 1, sm: 1.5 } }}
//             >
//               Save Notification Settings
//             </Button>
//           </Stack>
//         </CustomTabPanel>

//         {/* Security Panel */}
//         <CustomTabPanel value={value} index={3}>
//           <Stack spacing={{ xs: 2, sm: 3 }}>
//             <Typography variant="h6" fontWeight="medium">
//               Security Settings
//             </Typography>
//             <Divider />

//             <Box
//               sx={{
//                 display: "grid",
//                 gap: { xs: 1, sm: 2 },
//                 gridTemplateColumns: {
//                   xs: "1fr",
//                   sm: "1fr 1fr",
//                 },
//               }}
//             >
//               <Button
//                 variant="outlined"
//                 size={isXSmall ? "small" : "medium"}
//                 sx={{ py: { xs: 1, sm: 1.5 } }}
//               >
//                 Change Password
//               </Button>
//               <Button
//                 variant="outlined"
//                 size={isXSmall ? "small" : "medium"}
//                 sx={{ py: { xs: 1, sm: 1.5 } }}
//               >
//                 Enable Two-Factor Auth
//               </Button>
//             </Box>

//             <FormControlLabel
//               control={
//                 <Switch
//                   color="primary"
//                   defaultChecked
//                   size={isXSmall ? "small" : "medium"}
//                 />
//               }
//               label="Auto logout after 30 minutes"
//             />

//             <Box
//               sx={{
//                 display: "flex",
//                 gap: { xs: 1, sm: 2 },
//                 flexDirection: { xs: "column", sm: "row" },
//                 alignItems: { xs: "stretch", sm: "center" },
//               }}
//             >
//               <TextField
//                 fullWidth
//                 label="Add New Admin"
//                 placeholder="Enter admin email"
//                 size={isXSmall ? "small" : "medium"}
//               />
//               <Button
//                 variant="contained"
//                 startIcon={<Add fontSize={isXSmall ? "small" : "medium"} />}
//                 sx={{
//                   whiteSpace: "nowrap",
//                   minWidth: { xs: "100%", sm: "auto" },
//                 }}
//               >
//                 Add Admin
//               </Button>
//             </Box>
//           </Stack>
//         </CustomTabPanel>
//       </CardContent>
//     </Card>
//   );
// }

// app/settings/page.tsx

// app/pages/settings/page.tsx (SSR)
// app/settings/page.tsx
import dynamic from "next/dynamic";

// Dynamically load the client component
const SettingsPageClient = dynamic(() => import("./SettingsWrapper"), {
  ssr: true,
  loading: () => <div>Loading Settings...</div>,
});

export default function SettingsPage() {
  return <SettingsPageClient />;
}
