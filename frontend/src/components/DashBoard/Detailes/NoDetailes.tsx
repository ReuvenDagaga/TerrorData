import { Box, Typography } from "@mui/material";

export default function NoDetailes() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "65vh",
        background: "rgba(119, 139, 212, 0.23)",
        marginBottom: "20px",
        width: "100%",
      }}
    >
      <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
        No Data
      </Typography>
    </Box>
  );
}
