import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: "2vh",
      background: "rgba(119, 139, 212, 0.5)"
    }}>
      Created By Reuven Dagaga 0506879985

    </Box>
  )
}