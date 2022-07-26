
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchStatsByName } from './statsSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'

const StatsCard = ({stats}) => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchStatsByName(stats.fields.name));
    
    //  }, [dispatch]);

    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
    
    const card = (
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            
            </Typography>
            <Typography variant="h5" component="div">
            {stats.fields.day}
            </Typography>
            <br />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Attendance: {stats.fields.attendance}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Knowledge: {stats.fields.knowledge}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Teamwork: {stats.fields.teamwork}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Tools: {stats.fields.tools}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Sales: {stats.fields.sales}
            </Typography>
            <Typography variant="body2">
              Date: {stats.fields.date}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">See More</Button> */}
          </CardActions>
        </React.Fragment>
      );
  
    return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  )
}

export default StatsCard


