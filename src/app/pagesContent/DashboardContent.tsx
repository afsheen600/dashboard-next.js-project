"use client";
import React, { useMemo } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Chip,
  LinearProgress,
  Stack,
  IconButton,
  CircularProgress,
  Skeleton,
  Theme,
  useMediaQuery,
} from "@mui/material";
import {
  AttachMoney as RevenueIcon,
  People as UsersIcon,
  ShoppingBag as OrdersIcon,
  TrendingUp as ConversionIcon,
  MoreVert as MoreIcon,
  Inventory as ProductIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import dynamic from "next/dynamic";

const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
  loading: () => <Skeleton variant="text" width={60} height={40} />,
});

const ChartBar = dynamic(
  () => import("../charts/BarChart").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <Box
        sx={{
          height: 220,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={40} thickness={4} />
      </Box>
    ),
  }
);

interface DashboardContentProps {
  isMobile: boolean;
  isTablet: boolean;
  theme: Theme;
  user?: {
    displayName?: string;
  };
  dashboardData?: {
    metrics?: Array<{
      id: number;
      title: string;
      value: number;
      change: string;
      icon: string;
    }>;
    recentActivity?: Array<{
      id: number;
      user: string;
      action: string;
      time: string;
    }>;
    topProducts?: Array<{
      id: number;
      name: string;
      sales: number;
      rating: number;
    }>;
  };
  isLoading?: boolean;
  error?: Error | null;
}

const getIconComponent = (icon: string) => {
  const iconMap = {
    "💰": <RevenueIcon />,
    "👥": <UsersIcon />,
    "🛒": <OrdersIcon />,
    "📈": <ConversionIcon />,
  };

  return iconMap[icon as keyof typeof iconMap] || <RevenueIcon />;
};

const DashboardContent: React.FC<DashboardContentProps> = ({
  isMobile,
  isTablet,
  theme,
  user,
  dashboardData,
  isLoading = false,
  error = null,
}) => {
  const isSmallMobile = useMediaQuery("(max-width:400px)");

  const safeData = useMemo(
    () => ({
      metrics: dashboardData?.metrics || [],
      recentActivity: dashboardData?.recentActivity || [],
      topProducts: dashboardData?.topProducts || [],
    }),
    [dashboardData]
  );

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          Failed to load dashboard data
        </Typography>
        <Typography color="text.secondary">{error.message}</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ p: isSmallMobile ? 1 : 3 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={56}
          sx={{ mb: 2 }}
        />
        <Grid container spacing={2}>
          {[...Array(4)].map((_, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
              <Skeleton variant="rectangular" width="100%" height={120} />
            </Grid>
          ))}
          <Grid size={{ xs: 12, md: 8 }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={isSmallMobile ? 300 : 480}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={isSmallMobile ? 300 : 480}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f3f4f6 0%, #e0e7ef 100%)",
        p: isSmallMobile ? 1 : { sm: 2, md: 3, lg: 5 },
        minHeight: "100vh",
      }}
    >
      {/* Welcome Header */}
      <Box sx={{ mb: isSmallMobile ? 2 : 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            fontSize: isSmallMobile ? "1.5rem" : isMobile ? "2rem" : "2.5rem",
          }}
        >
          Dashboard Overview
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          fontSize={isSmallMobile ? "0.875rem" : "1rem"}
        >
          Welcome back, <b>{user?.displayName || "Admin"}</b>
        </Typography>
      </Box>
      <Grid container spacing={isSmallMobile ? 1 : 2}>
        {/* Metric Cards */}
        {safeData.metrics.map((metric) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={metric.id}>
            <Card
              elevation={isSmallMobile ? 2 : 6}
              sx={{
                height: "100%",
                background: "linear-gradient(135deg, #fff 60%, #e0e7ef 100%)",
                borderRadius: 2,
                boxShadow: isSmallMobile ? theme.shadows[1] : theme.shadows[4],
                transition: isSmallMobile
                  ? "none"
                  : "transform 0.3s, box-shadow 0.3s",
                "&:hover": isSmallMobile
                  ? {}
                  : {
                      transform: "translateY(-6px) scale(1.03)",
                      boxShadow: theme.shadows[8],
                    },
              }}
            >
              <CardContent sx={{ p: isSmallMobile ? 1.5 : 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      mr: 1,
                      width: isSmallMobile ? 40 : 56,
                      height: isSmallMobile ? 40 : 56,
                      boxShadow: isSmallMobile ? 1 : 2,
                    }}
                  >
                    {getIconComponent(metric.icon)}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      fontSize={isSmallMobile ? "0.75rem" : "0.875rem"}
                    >
                      {metric.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      fontSize={isSmallMobile ? "1.25rem" : "1.5rem"}
                    >
                      {metric.title === "Revenue" ? "$" : ""}
                      <CountUp
                        end={metric.value}
                        duration={1.5}
                        decimals={metric.title === "Conversion" ? 1 : 0}
                      />
                      {metric.title === "Conversion" ? "%" : ""}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="caption"
                  fontSize={isSmallMobile ? "0.65rem" : "0.75rem"}
                  color={
                    metric.change.startsWith("+")
                      ? "success.main"
                      : metric.change.startsWith("-")
                      ? "error.main"
                      : "text.secondary"
                  }
                >
                  {metric.change} from last month
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{
                    mt: 1,
                    height: isSmallMobile ? 4 : 8,
                    borderRadius: 2,
                    bgcolor: theme.palette.action.hover,
                    "& .MuiLinearProgress-bar": {
                      bgcolor: theme.palette.success.main,
                      borderRadius: 2,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Sales Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card
            elevation={isSmallMobile ? 2 : 6}
            sx={{
              height: isSmallMobile ? 280 : isMobile ? 350 : 480,
              borderRadius: 2,
              bgcolor: "#fff",
              boxShadow: isSmallMobile ? theme.shadows[1] : theme.shadows[4],
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: isSmallMobile ? 1 : 2,
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
                  variant="h6"
                  fontWeight={600}
                  fontSize={isSmallMobile ? "1rem" : "1.25rem"}
                >
                  Sales Overview
                </Typography>
                <IconButton size="small">
                  <MoreIcon fontSize={isSmallMobile ? "small" : "medium"} />
                </IconButton>
              </Box>
              <Box sx={{ flex: 1 }}>
                <ChartBar />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={isSmallMobile ? 2 : 6}
            sx={{
              height: isSmallMobile ? 280 : isMobile ? 350 : 480,
              borderRadius: 2,
              bgcolor: "#fff",
              boxShadow: isSmallMobile ? theme.shadows[1] : theme.shadows[4],
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: isSmallMobile ? 1 : 2,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                fontSize={isSmallMobile ? "1rem" : "1.25rem"}
              >
                Recent Activity
              </Typography>
              <List sx={{ flex: 1, overflow: "auto", p: 0 }}>
                {safeData.recentActivity.map((activity) => (
                  <React.Fragment key={activity.id}>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <ListItemAvatar
                        sx={{ minWidth: isSmallMobile ? 36 : 48 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: theme.palette.primary.light,
                            color: theme.palette.primary.contrastText,
                            width: isSmallMobile ? 32 : 36,
                            height: isSmallMobile ? 32 : 36,
                          }}
                        >
                          {activity.user.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.user}
                        primaryTypographyProps={{
                          fontWeight: "medium",
                          fontSize: isSmallMobile ? "0.75rem" : "0.875rem",
                        }}
                        secondary={
                          <Box
                            component="span"
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                fontSize: isSmallMobile ? "0.65rem" : "0.75rem",
                              }}
                            >
                              {activity.action}
                            </span>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              fontSize={isSmallMobile ? "0.6rem" : "0.7rem"}
                            >
                              {activity.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" sx={{ my: 0.5 }} />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Products */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            elevation={isSmallMobile ? 2 : 6}
            sx={{
              borderRadius: 2,
              bgcolor: "#fff",
              boxShadow: isSmallMobile ? theme.shadows[1] : theme.shadows[4],
            }}
          >
            <CardContent sx={{ p: isSmallMobile ? 1 : 2 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                fontSize={isSmallMobile ? "1rem" : "1.25rem"}
              >
                Top Products
              </Typography>
              <List sx={{ maxHeight: 300, overflow: "auto", p: 0 }}>
                {safeData.topProducts.map((product) => (
                  <React.Fragment key={product.id}>
                    <ListItem
                      secondaryAction={
                        <Chip
                          label={`${product.sales} sales`}
                          size="small"
                          color="primary"
                          sx={{
                            fontSize: isSmallMobile ? "0.6rem" : "0.75rem",
                            height: isSmallMobile ? 20 : 24,
                          }}
                        />
                      }
                      sx={{ py: 0.5 }}
                    >
                      <ListItemAvatar
                        sx={{ minWidth: isSmallMobile ? 36 : 48 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: theme.palette.primary.light,
                            width: isSmallMobile ? 32 : 36,
                            height: isSmallMobile ? 32 : 36,
                          }}
                        >
                          <ProductIcon
                            fontSize={isSmallMobile ? "small" : "medium"}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.name}
                        secondary={
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                          >
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                sx={{
                                  color:
                                    i < Math.floor(product.rating)
                                      ? theme.palette.warning.main
                                      : theme.palette.action.disabled,
                                  fontSize: isSmallMobile ? "0.75rem" : "1rem",
                                }}
                              />
                            ))}
                            <Typography
                              variant="caption"
                              fontSize={isSmallMobile ? "0.6rem" : "0.7rem"}
                            >
                              ({product.rating.toFixed(1)})
                            </Typography>
                          </Stack>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            elevation={isSmallMobile ? 2 : 6}
            sx={{
              borderRadius: 2,
              bgcolor: "#fff",
              boxShadow: isSmallMobile ? theme.shadows[1] : theme.shadows[4],
            }}
          >
            <CardContent sx={{ p: isSmallMobile ? 1 : 2 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                fontSize={isSmallMobile ? "1rem" : "1.25rem"}
              >
                Quick Stats
              </Typography>
              <Grid container spacing={isSmallMobile ? 1 : 2}>
                {[
                  { label: "New Customers", value: 42, change: "+5" },
                  { label: "Pending Orders", value: 18, change: "-2" },
                  { label: "Refund Requests", value: 5, change: "+1" },
                  { label: "Active Promotions", value: 3, change: "0" },
                ].map((stat, index) => (
                  <Grid size={{ xs: 6 }} key={index}>
                    <Box
                      sx={{
                        p: isSmallMobile ? 1 : 1.5,
                        borderRadius: 1,
                        bgcolor: theme.palette.action.hover,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        fontSize={isSmallMobile ? "0.65rem" : "0.75rem"}
                      >
                        {stat.label}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "baseline" }}>
                        <Typography
                          variant="h6"
                          sx={{ mr: 0.5 }}
                          fontSize={isSmallMobile ? "0.875rem" : "1rem"}
                        >
                          {stat.value}
                        </Typography>
                        <Typography
                          variant="caption"
                          fontSize={isSmallMobile ? "0.6rem" : "0.7rem"}
                          color={
                            stat.change.startsWith("+")
                              ? "success.main"
                              : stat.change.startsWith("-")
                              ? "error.main"
                              : "text.secondary"
                          }
                        >
                          {stat.change}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
