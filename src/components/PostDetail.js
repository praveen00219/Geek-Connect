import React from "react";
import { Paper, LinearProgress } from "@mui/material";

const PostDetail = ({ detail }) => {
  if (!detail) return <LinearProgress />; // Improved loading check

  return (
    <Paper elevation={5}>
      <img
        src={detail?.image || detail?.thumbnail} // Fixed image field
        alt="Post"
        style={{ width: "100%", borderRadius: "5px", height: "100%" }}
      />
    </Paper>
  );
};

export default PostDetail;
