import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PRDetail() {
  const { id } = useParams();
  const [pr, setPR] = useState(null);
  useEffect(() => {
    axios.get(`/api/prs/${id}/`).then(res => setPR(res.data));
  }, [id]);
  if (!pr) return <div>Loading…</div>;
  return (
    <div style={{ padding: 20 }}>
      <h2>{pr.repo_full_name}#{pr.pr_id}: {pr.title}</h2>
      <p><a href={pr.url} target="_blank">View on GitHub</a></p>
      <h3>AI Analysis:</h3>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{pr.analysis || 'Pending…'}</pre>
    </div>
  );
}
