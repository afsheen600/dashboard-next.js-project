// import {
//   Grid,
//   Typography,
//   Card,
//   CardContent,
//   useTheme,
//   useMediaQuery,
//   Container,
// } from "@mui/material";
// import GeoChart from "../../../charts/GeoChart";
// import PieChart from "../../../charts/PieChart";
// import HbarChart from "../../../charts/HbarChart";
// import CountUp from "react-countup";

// const Analytics: React.FC = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Container maxWidth="xl" sx={{ py: 3 }}>
//       <Grid container spacing={3}>
//         {/* Stats Cards */}
//         <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//           <Card
//             sx={{
//               background:
//                 "linear-gradient(135deg,rgb(75, 86, 147),rgb(87, 153, 207))",
//               color: "white",
//               borderRadius: 3,
//               boxShadow: 3,
//               height: "100%",
//               minHeight: isMobile ? "auto" : 160,
//               textAlign: "center",
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Visitors
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 <CountUp delay={0.4} end={3200} duration={0.6} />
//               </Typography>
//               <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                 Since Last Week
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//           <Card
//             sx={{
//               background:
//                 "linear-gradient(135deg,rgb(92, 140, 93),rgb(111, 147, 71))",
//               color: "white",
//               borderRadius: 3,
//               boxShadow: 3,
//               height: "100%",
//               minHeight: isMobile ? "auto" : 160,
//               textAlign: "center",
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Customers
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 <CountUp delay={0.4} end={1800} duration={0.6} />
//               </Typography>
//               <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                 Since Last Week
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//           <Card
//             sx={{
//               background:
//                 "linear-gradient(135deg,rgb(230, 195, 143),rgb(229, 207, 138))",
//               color: "white",
//               borderRadius: 3,
//               boxShadow: 3,
//               height: "100%",
//               minHeight: isMobile ? "auto" : 160,
//               textAlign: "center",
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Orders
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 <CountUp delay={0.4} end={3000} duration={0.5} />
//               </Typography>
//               <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                 Since Last Week
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//           <Card
//             sx={{
//               borderRadius: 3,
//               boxShadow: 3,
//               height: "100%",
//               minHeight: isMobile ? "auto" : 160,
//             }}
//           >
//             <CardContent sx={{ height: "100%" }}>
//               <PieChart />
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Charts Section */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Card
//             sx={{
//               borderRadius: 3,
//               boxShadow: 3,
//               height: "100%",
//               minHeight: 400,
//             }}
//           >
//             <CardContent sx={{ height: "100%", width: "100%" }}>
//               <Typography variant="h6" gutterBottom>
//                 Geographical Distribution
//               </Typography>
//               <GeoChart />
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid size={{ xs: 12, md: 4 }}>
//           <Card
//             sx={{
//               borderRadius: 3,
//               boxShadow: 3,
//               height: "100%",
//               minHeight: 400,
//             }}
//           >
//             <CardContent sx={{ height: "100%" }}>
//               <Typography variant="h6" gutterBottom>
//                 Sales by Category
//               </Typography>
//               <HbarChart />
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Analytics;

// app/analytics/page.tsx
// app/analytics/page.tsx

import { Container, Box, Typography } from "@mui/material";
import { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamically import the client-side AnalyticsContent component
const AnalyticsContent = dynamic(
  () => import("@/app/pagesContent/AnalyticsContent"),
  {
    ssr: true,
    loading: () => <Typography>Loading analytics...</Typography>,
  }
);

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "Real-time analytics and insights for your business",
};

export default function AnalyticsPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        pt: 2,
        pb: 6,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Analytics Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Real-time insights and performance metrics
          </Typography>
        </Box>

        {/* Render the client-side analytics content */}
        <AnalyticsContent isMobile={false} />
      </Container>
    </Box>
  );
}
