"use client";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Container,
  useTheme,
  Box,
} from "@mui/material";
import dynamic from "next/dynamic";

// Dynamically import charts with SSR disabled

const GeoChart = dynamic(() => import("../charts/GeoChart"), {
  ssr: false,
  loading: () => (
    <Box
      height={400}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Loading map...
    </Box>
  ),
});

const PieChart = dynamic(() => import("../charts/PieChart"), {
  ssr: false,
  loading: () => (
    <Box
      height={160}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Loading pie chart...
    </Box>
  ),
});

const HbarChart = dynamic(() => import("../charts/HbarChart"), {
  ssr: false,
  loading: () => (
    <Box
      height={400}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      Loading bar chart...
    </Box>
  ),
});

const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
  loading: () => <span>0</span>,
});

interface AnalyticsContentProps {
  isMobile: boolean;
}

const AnalyticsContent = ({ isMobile }: AnalyticsContentProps) => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              background:
                "linear-gradient(135deg, rgb(75, 86, 147), rgb(87, 153, 207))",
              color: "white",
              borderRadius: 3,
              boxShadow: 3,
              height: "100%",
              minHeight: isMobile ? "auto" : 160,
              textAlign: "center",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Visitors
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                <CountUp delay={0.4} end={3200} duration={0.6} />
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Since Last Week
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              background:
                "linear-gradient(135deg, rgb(92, 140, 93), rgb(111, 147, 71))",
              color: "white",
              borderRadius: 3,
              boxShadow: 3,
              height: "100%",
              minHeight: isMobile ? "auto" : 160,
              textAlign: "center",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customers
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                <CountUp delay={0.4} end={1800} duration={0.6} />
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Since Last Week
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              background:
                "linear-gradient(135deg, rgb(230, 195, 143), rgb(229, 207, 138))",
              color: theme.palette.getContrastText(
                theme.palette.background.paper
              ),
              borderRadius: 3,
              boxShadow: 3,
              height: "100%",
              minHeight: isMobile ? "auto" : 160,
              textAlign: "center",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Orders
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                <CountUp delay={0.4} end={3000} duration={0.5} />
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Since Last Week
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              height: "100%",
              minHeight: isMobile ? "auto" : 160,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <PieChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Charts Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              height: "100%",
              minHeight: 400,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ height: "100%", width: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Geographical Distribution
              </Typography>
              <GeoChart />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              height: "100%",
              minHeight: 400,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Sales by Category
              </Typography>
              <HbarChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalyticsContent;
