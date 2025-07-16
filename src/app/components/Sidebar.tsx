"use client";

import Link from "next/link";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@mui/icons-material/Info";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSidebar } from "../../context/SidebarContext";
import { auth } from "@/app/services/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

interface MenuItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const {
    isOpen,
    toggleSidebar,
  }: {
    isOpen: boolean;
    toggleSidebar: () => void;
  } = useSidebar();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const menuItems: MenuItem[] = [
    { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
    {
      text: "Analytics",
      path: "/pages/dashboard/analytics",
      icon: <AnalyticsIcon />,
    },
    {
      text: "ProductsTable",
      path: "/pages/dashboard/products",
      icon: <ShoppingCartIcon />,
    },
    { text: "Settings", path: "/pages/dashboard/settings", icon: <InfoIcon /> },
  ];

  return (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={toggleSidebar}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 240,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <div>
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <Link
                href={item.path}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <ListItemButton onClick={toggleSidebar}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
      <div>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
