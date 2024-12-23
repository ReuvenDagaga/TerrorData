import { Container } from "@mui/material";
import { AddTerrorEvent } from "./addTerrorEvent";

export default function CrudSpace() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: "8vh",
        width: "100%",
        background: "rgba(119, 139, 212, 0.5)",
      }}
    >
      <AddTerrorEvent /> 
      <AddTerrorEvent />
      <AddTerrorEvent />
      <AddTerrorEvent />
    </Container>
  );
}
