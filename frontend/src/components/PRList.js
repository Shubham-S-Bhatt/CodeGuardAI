import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function PRList() {
  const [prs, setPRs] = useState([]);
  useEffect(() => {
    axios.get('/api/prs/').then(res => setPRs(res.data));
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <h1>Pull Requests</h1>
      <ul>
        {prs.map(pr => (
          <li key={pr.id}>
            <Link to={`/prs/${pr.id}`}>{pr.repo_full_name}#{pr.pr_id}: {pr.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
