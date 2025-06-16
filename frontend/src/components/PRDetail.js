import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container, Typography, Box, CircularProgress,
  Button, Card, CardContent
} from '@mui/material';
import { html as Diff2Html } from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';

export default function PRDetail() {
  const { id } = useParams();
  const [pr, setPr] = useState(null);
  const [diffHtml, setDiffHtml] = useState('');

  useEffect(() => {
    // 1) fetch PR metadata
    axios.get(`/api/prs/${id}/`)
      .then(res => {
        setPr(res.data);
        // 2) fetch raw diff from GitHub
        return axios.get(res.data.diff_url, {
          headers: { Accept: 'application/vnd.github.v3.diff' }
        });
      })
      .then(res => {
        // 3) render diff HTML
        const html = Diff2Html.getPrettyHtml(res.data, {
          inputFormat: 'diff',
          showFiles: true,
          matching: 'lines'
        });
        setDiffHtml(html);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!pr) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Button
        component={RouterLink}
        to="/"
        variant="outlined"
        sx={{ mb: 2 }}
      >
        Back to PRs
      </Button>
      <Typography variant="h4" gutterBottom>
        {pr.repo_full_name}#{pr.pr_id}: {pr.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        <a href={pr.url} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </Typography>

      {/* Diff Viewer */}
      <Box
        sx={{ mt: 4 }}
        dangerouslySetInnerHTML={{ __html: diffHtml }}
      />

      {/* AI Analysis */}
      <Card variant="outlined" sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            AI Suggestions
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            {pr.analysis || 'Analysis pending…'}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
