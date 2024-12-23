import { useEffect, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { TerrorEvent } from '../../../interface/TerrorEvent';

interface Props {
    data: any
}



const TerrorEventList = ({ data }: Props) => {
  const [terrorEvents, setTerrorEvents] = useState<TerrorEvent[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTerrorEvents(data);
  }, [data]);


  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Terror Events
      </Typography>
        <Box>
          {terrorEvents.map((event: any) => (
            <Box key={event.eventid} sx={{ marginBottom: '10px' }}>
              <Typography variant="body1">Event ID: {event.eventid}</Typography>
              <Typography variant="body2">Summary: {event.summary}</Typography>
            </Box>
          ))}
        </Box>
      {/* כפתורי פג'ניישן */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography sx={{ margin: '0 10px', alignSelf: 'center' }}>
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
    </Box>
  );
};

export default TerrorEventList;
