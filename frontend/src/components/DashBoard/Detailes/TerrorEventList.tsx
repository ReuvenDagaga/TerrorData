import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { TerrorEvent } from "../../../interface/TerrorEvent";
import { deleteEvent, editEvent, getData } from "../../../services/dataService";

interface Props {
  data: TerrorEventListProps;
}

interface TerrorEventListProps {
  currentPage: number;
  terrorEvents: TerrorEvent[];
  totalPages: number;
  totalTerrorEvents: number;
}

const TerrorEventList = ({ data }: Props) => {
  const [terrorEvents, setTerrorEvents] = useState<TerrorEventListProps>();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<TerrorEvent | null>(null);

  const [editedEvent, setEditedEvent] = useState<TerrorEvent | null>(null);

  const handleClick = async () => {
    const data = await getData(
      `http://localhost:3222/api/getLimitTerrorEvents?page=${currentPage}&limit=50`
    );
    setTerrorEvents(data);
  };

  useEffect(() => {
    if (data) {
      setTerrorEvents(data);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    }
  }, [data]);

  const handlePageChange = async (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      await handleClick();
    }
  };

  const handleOpenEditDialog = (event: TerrorEvent) => {
    setSelectedEvent(event);
    setEditedEvent({ ...event });
    setOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = (event: TerrorEvent) => {
    setSelectedEvent(event);
    setOpenDeleteDialog(true);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent._id);
      handleCloseDialog();
    }
  };

  const handleEditEvent = () => {
    if (editedEvent) {
      console.log(editedEvent);
      
      editEvent(editedEvent);
      handleCloseDialog();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedEvent) {
      setEditedEvent({
        ...editedEvent,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setSelectedEvent(null);
    setEditedEvent(null);
  };

  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Terror Events
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f1f1f1",
        }}
      >
        {terrorEvents?.terrorEvents?.length ? (
          terrorEvents.terrorEvents.map((event, index) => (
            <Card
              key={index}
              sx={{
                width: "100%",
                backgroundColor: "#f5f5f5",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                height: "100px",
                flexShrink: 0,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Event ID: {event.eventid}
                </Typography>
                <Typography variant="body1">City: {event.city}</Typography>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  overflowY: "auto",
                  maxHeight: "150px",
                }}
              >
                <Typography variant="body2" gutterBottom>
                  Summary: {event.summary}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenEditDialog(event)}
                  sx={{ flex: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleOpenDeleteDialog(event)}
                  sx={{ flex: 1 }}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          ))
        ) : (
          <Typography>No events to display</Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography sx={{ margin: "0 10px", alignSelf: "center" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Box>

      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          {editedEvent && (
            <>
              <TextField
                label="Event ID"
                value={editedEvent.eventid}
                onChange={handleInputChange}
                name="eventid"
                fullWidth
                margin="normal"
                disabled
              />
              <TextField
                label="Year"
                value={editedEvent.iyear}
                onChange={handleInputChange}
                name="iyear"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Month"
                value={editedEvent.imonth}
                onChange={handleInputChange}
                name="imonth"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Day"
                value={editedEvent.iday}
                onChange={handleInputChange}
                name="iday"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Country"
                value={editedEvent.country_txt}
                onChange={handleInputChange}
                name="country_txt"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Region"
                value={editedEvent.region_txt}
                onChange={handleInputChange}
                name="region_txt"
                fullWidth
                margin="normal"
              />
              <TextField
                label="City"
                value={editedEvent.city}
                onChange={handleInputChange}
                name="city"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Latitude"
                value={editedEvent.latitude}
                onChange={handleInputChange}
                name="latitude"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Longitude"
                value={editedEvent.longitude}
                onChange={handleInputChange}
                name="longitude"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Attack Type"
                value={editedEvent.attacktype1_txt}
                onChange={handleInputChange}
                name="attacktype1_txt"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Target Type"
                value={editedEvent.targtype1_txt}
                onChange={handleInputChange}
                name="targtype1_txt"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Target"
                value={editedEvent.target1}
                onChange={handleInputChange}
                name="target1"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Group Name"
                value={editedEvent.gname}
                onChange={handleInputChange}
                name="gname"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Weapon Type"
                value={editedEvent.weaptype1_txt}
                onChange={handleInputChange}
                name="weaptype1_txt"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Number of Kills"
                value={editedEvent.nkill}
                onChange={handleInputChange}
                name="nkill"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Number of Wounds"
                value={editedEvent.nwound}
                onChange={handleInputChange}
                name="nwound"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Number of Perpetrators"
                value={editedEvent.nperps}
                onChange={handleInputChange}
                name="nperps"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Summary"
                value={editedEvent.summary}
                onChange={handleInputChange}
                name="summary"
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleEditEvent}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
        <DialogTitle>Are you sure you want to delete this event?</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteEvent}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TerrorEventList;
