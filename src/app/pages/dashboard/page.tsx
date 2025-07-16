// "use client";
// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "@/app/services/firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   useTheme,
//   useMediaQuery,
//   LinearProgress,
//   Avatar,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Divider,
//   Chip,
//   CircularProgress,
// } from "@mui/material";
// import {
//   CreditCard as CreditCardIcon,
//   ShoppingBag as ShoppingBagIcon,
//   Storefront as StorefrontIcon,
//   People as PeopleIcon,
//   AttachMoney as AttachMoneyIcon,
//   TrendingUp as TrendingUpIcon,
//   Inventory as InventoryIcon,
//   AccessTime as RecentActivityIcon,
//   Star as StarIcon,
//   LocalShipping as ShippingIcon,
// } from "@mui/icons-material";
// import dynamic from "next/dynamic";

// // Dynamic imports with loading states
// const CountUp = dynamic(() => import("react-countup"), {
//   ssr: false,
//   loading: () => <span>0</span>,
// });

// const ChartBar = dynamic(() => import("../../charts/BarChart"), {
//   ssr: false,
//   loading: () => (
//     <Box
//       sx={{
//         height: 300,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <CircularProgress />
//     </Box>
//   ),
// });

// const Dashboard = () => {
//   const router = useRouter();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
//   const [loading, setLoading] = React.useState(true);

//   // Check authentication state on component mount
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         router.push("/login");
//       } else {
//         setLoading(false);
//       }
//     });
//     return () => unsubscribe();
//   }, [router]);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   // Card data
//   const metricCards = [
//     {
//       title: "Total Revenue",
//       value: 12500,
//       prefix: "$",
//       icon: <AttachMoneyIcon />,
//       gradient: "linear-gradient(135deg, #3f51b5, #2196f3)",
//     },
//     {
//       title: "Total Orders",
//       value: 568,
//       icon: <ShoppingBagIcon />,
//       gradient: "linear-gradient(135deg, #4caf50, #8bc34a)",
//     },
//     {
//       title: "Total Customers",
//       value: 1243,
//       icon: <PeopleIcon />,
//       gradient: "linear-gradient(135deg, #ff9800, #ffc107)",
//     },
//     {
//       title: "Growth Rate",
//       value: 12.5,
//       suffix: "%",
//       icon: <TrendingUpIcon />,
//       gradient: "linear-gradient(135deg, #9c27b0, #e91e63)",
//     },
//   ];

//   const secondaryCards = [
//     {
//       title: "Average Order Value",
//       value: 85,
//       prefix: "$",
//       icon: <CreditCardIcon />,
//       gradient: "linear-gradient(135deg, #00bcd4, #009688)",
//     },
//     {
//       title: "Conversion Rate",
//       value: 3.2,
//       suffix: "%",
//       icon: <StorefrontIcon />,
//       gradient: "linear-gradient(135deg, #607d8b, #455a64)",
//     },
//   ];

//   const recentActivities = [
//     {
//       id: 1,
//       user: "John Doe",
//       action: "placed an order",
//       time: "5 min ago",
//       icon: <RecentActivityIcon color="primary" />,
//     },
//     {
//       id: 2,
//       user: "Jane Smith",
//       action: "made a payment",
//       time: "1 hour ago",
//       icon: <AttachMoneyIcon color="success" />,
//     },
//     {
//       id: 3,
//       user: "Robert Johnson",
//       action: "requested return",
//       time: "2 hours ago",
//       icon: <ShippingIcon color="warning" />,
//     },
//   ];

//   const inventoryItems = [
//     {
//       id: 1,
//       name: "Premium Headphones",
//       stock: 45,
//       status: "In Stock",
//       color: "success",
//     },
//     {
//       id: 2,
//       name: "Wireless Keyboard",
//       stock: 12,
//       status: "Low Stock",
//       color: "warning",
//     },
//     {
//       id: 3,
//       name: "Smart Watch",
//       stock: 0,
//       status: "Out of Stock",
//       color: "error",
//     },
//   ];

//   const topProducts = [
//     {
//       id: 1,
//       name: "Wireless Earbuds",
//       sales: 245,
//       rating: 4.8,
//       icon: <StarIcon color="warning" />,
//     },
//     {
//       id: 2,
//       name: "Bluetooth Speaker",
//       sales: 189,
//       rating: 4.5,
//       icon: <StarIcon color="warning" />,
//     },
//     {
//       id: 3,
//       name: "Phone Case",
//       sales: 156,
//       rating: 4.2,
//       icon: <StarIcon color="warning" />,
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         backgroundColor: theme.palette.background.default,
//         p: isMobile ? 2 : 3,
//         minHeight: "100vh",
//       }}
//     >
//       {/* Welcome Header */}
//       <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
//         Dashboard Overview
//       </Typography>

//       {/* Main Grid Container */}
//       <Grid container spacing={3}>
//         {/* Metric Cards (Top Row) */}
//         {metricCards.map((card, index) => (
//           <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
//             <Card
//               sx={{
//                 height: "100%",
//                 background: card.gradient,
//                 color: "white",
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 transition: "transform 0.3s",
//                 "&:hover": {
//                   transform: "translateY(-5px)",
//                 },
//               }}
//             >
//               <CardContent
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: isMobile ? "center" : "flex-start",
//                   justifyContent: "center",
//                   height: "100%",
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     bgcolor: "rgba(255,255,255,0.2)",
//                     mb: 2,
//                     width: 56,
//                     height: 56,
//                   }}
//                 >
//                   {card.icon}
//                 </Avatar>
//                 <Typography
//                   variant={isMobile ? "h5" : "h4"}
//                   sx={{ fontWeight: 700 }}
//                 >
//                   {card.prefix}
//                   <CountUp delay={0.4} end={card.value} duration={0.6} />
//                   {card.suffix}
//                 </Typography>
//                 <Typography variant="body1" sx={{ opacity: 0.9 }}>
//                   {card.title}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}

//         {/* Secondary Cards (Middle Row) */}
//         <Grid size={{ xs: 12, md: 8 }}>
//           <Grid container spacing={3}>
//             {secondaryCards.map((card, index) => (
//               <Grid size={{ xs: 12, sm: 6 }} key={index}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     background: card.gradient,
//                     color: "white",
//                     borderRadius: 2,
//                   }}
//                 >
//                   <CardContent
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       height: "100%",
//                     }}
//                   >
//                     <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                       <Avatar
//                         sx={{
//                           bgcolor: "rgba(255,255,255,0.2)",
//                           mr: 2,
//                           width: 48,
//                           height: 48,
//                         }}
//                       >
//                         {card.icon}
//                       </Avatar>
//                       <Box>
//                         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                           {card.title}
//                         </Typography>
//                         <Typography variant="h5" sx={{ fontWeight: 700 }}>
//                           {card.prefix}
//                           <CountUp
//                             delay={0.4}
//                             end={card.value}
//                             duration={0.6}
//                           />
//                           {card.suffix}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <LinearProgress
//                       variant="determinate"
//                       value={70}
//                       sx={{
//                         height: 8,
//                         borderRadius: 4,
//                         bgcolor: "rgba(255,255,255,0.2)",
//                         "& .MuiLinearProgress-bar": {
//                           bgcolor: "white",
//                         },
//                       }}
//                     />
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>

//         {/* Returning Customers Card */}
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Card
//             sx={{
//               height: "100%",
//               background: "linear-gradient(135deg, #795548, #5d4037)",
//               color: "white",
//               borderRadius: 2,
//             }}
//           >
//             <CardContent
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 height: "100%",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                 <Avatar
//                   sx={{
//                     bgcolor: "rgba(255,255,255,0.2)",
//                     mr: 2,
//                     width: 48,
//                     height: 48,
//                   }}
//                 >
//                   <PeopleIcon />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                     Returning Customers
//                   </Typography>
//                   <Typography variant="h5" sx={{ fontWeight: 700 }}>
//                     <CountUp delay={0.4} end={42} duration={0.6} />%
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box
//                 sx={{ flexGrow: 1, display: "flex", alignItems: "flex-end" }}
//               >
//                 <Typography variant="caption" sx={{ opacity: 0.8 }}>
//                   +12% from last month
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Sales Chart */}
//         <Grid size={{ xs: 12, md: 8 }}>
//           <Card
//             sx={{
//               height: isMobile ? 400 : 450,
//               borderRadius: 2,
//             }}
//           >
//             <CardContent sx={{ height: "100%" }}>
//               <Typography variant="h6" gutterBottom>
//                 Sales Overview
//               </Typography>
//               <Box sx={{ height: "calc(100% - 40px)" }}>
//                 <ChartBar />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Top Products */}
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Card
//             sx={{
//               height: isMobile ? 400 : 450,
//               borderRadius: 2,
//             }}
//           >
//             <CardContent sx={{ height: "100%" }}>
//               <Typography variant="h6" gutterBottom>
//                 Top Products
//               </Typography>
//               <List sx={{ overflow: "auto", maxHeight: "calc(100% - 40px)" }}>
//                 {topProducts.map((product) => (
//                   <React.Fragment key={product.id}>
//                     <ListItem>
//                       <ListItemAvatar>
//                         <Avatar>
//                           <InventoryIcon />
//                         </Avatar>
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={product.name}
//                         secondary={`${product.sales} sales • Rating: ${product.rating}`}
//                       />
//                       {product.icon}
//                     </ListItem>
//                     <Divider variant="inset" component="li" />
//                   </React.Fragment>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Recent Activity */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Card sx={{ borderRadius: 2 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Recent Activity
//               </Typography>
//               <List sx={{ overflow: "auto", maxHeight: 300 }}>
//                 {recentActivities.map((activity) => (
//                   <React.Fragment key={activity.id}>
//                     <ListItem>
//                       <ListItemAvatar>
//                         <Avatar>{activity.icon}</Avatar>
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={`${activity.user} ${activity.action}`}
//                         secondary={activity.time}
//                       />
//                     </ListItem>
//                     <Divider variant="inset" component="li" />
//                   </React.Fragment>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Inventory Status */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Card sx={{ borderRadius: 2 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Inventory Status
//               </Typography>
//               <List sx={{ overflow: "auto", maxHeight: 300 }}>
//                 {inventoryItems.map((item) => (
//                   <React.Fragment key={item.id}>
//                     <ListItem>
//                       <ListItemText
//                         primary={item.name}
//                         secondary={`Stock: ${item.stock}`}
//                       />
//                       <Chip
//                         label={item.status}
//                         color={item.color as "success" | "warning" | "error"}
//                         size="small"
//                       />
//                     </ListItem>
//                     <Divider variant="inset" component="li" />
//                   </React.Fragment>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;

// app/dashboard/page.tsx
// app/dashboard/page.tsx
// app/dashboard/page.tsx
// app/dashboard/page.tsx or wherever your server route is

import ClientDashboardWrapper from "@/app/pages/dashboard/DashboardWrapper";

async function getDashboardData() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    metrics: [
      { id: 1, title: "Revenue", value: 12500, change: "+12%", icon: "💰" },
      { id: 2, title: "Users", value: 2431, change: "+8%", icon: "👥" },
      { id: 3, title: "Orders", value: 856, change: "+5%", icon: "🛒" },
      { id: 4, title: "Conversion", value: 3.2, change: "+0.8%", icon: "📈" },
    ],
    recentActivity: [
      {
        id: 1,
        user: "John Doe",
        action: "placed order #1234",
        time: "5 min ago",
      },
      {
        id: 2,
        user: "Jane Smith",
        action: "completed payment",
        time: "1 hour ago",
      },
      {
        id: 3,
        user: "Alex Johnson",
        action: "requested refund",
        time: "2 hours ago",
      },
    ],
    topProducts: [
      { id: 1, name: "Wireless Earbuds", sales: 245, rating: 4.8 },
      { id: 2, name: "Smart Watch", sales: 189, rating: 4.5 },
      { id: 3, name: "Bluetooth Speaker", sales: 156, rating: 4.2 },
    ],
  };
}

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();

  return <ClientDashboardWrapper dashboardData={dashboardData} />;
}
