import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container, Grid, Card, CardContent,
  Typography, CardActions, Button, CircularProgress
} from '@mui/material';

export default function PRList() {
  const [prs, setPRs] = useState(null);

  useEffect(() => {
    axios.get('/api/prs/')
      .then(res => setPRs(res.data))
      .catch(() => setPRs([]));
  }, []);

  if (prs === null) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Pull Requests</Typography>
      <Grid container spacing={2}>
        {prs.map(pr => (
          <Grid item xs={12} sm={6} md={4} key={pr.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">
                  {pr.repo_full_name}#{pr.pr_id}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {pr.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(pr.created_at).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={RouterLink}
                  to={`/prs/${pr.id}`}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
