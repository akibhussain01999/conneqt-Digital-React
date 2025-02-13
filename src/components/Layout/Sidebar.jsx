import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Toolbar, Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import AlarmOnOutlinedIcon from "@mui/icons-material/AlarmOnOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import "./Sidebar.css";

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const menuItems = [
    { text: "Notes", icon: <NoteAddOutlinedIcon />, route: "/notes" },
    { text: "Reminders", icon: <AlarmOnOutlinedIcon />, route: "/reminders" },
    { text: "Edit labels", icon: <CategoryOutlinedIcon />, route: "/edit-labels" },
    { text: "Archive", icon: <InventoryOutlinedIcon />, route: "/archive" },
    { text: "Trash", icon: <DeleteSweepOutlinedIcon />, route: "/trash" },
  ];

  const handleNavigation = (index, route) => {
    setSelectedIndex(index);
    navigate(route);
  };

  return (
    <Drawer variant="permanent" className="sidebar">
      <Box className="sidebar-container">
        <Toolbar />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={item.text}
              selected={selectedIndex === index}
              onClick={() => handleNavigation(index, item.route)}
              className={selectedIndex === index ? "selected-item" : "list-item"}
            >
              <ListItemIcon className={selectedIndex === index ? "selected-icon" : "icon"}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} className="text" />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
