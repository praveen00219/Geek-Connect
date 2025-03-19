import React from "react";
import { Stack, Button } from "@mui/material";
import PostCard from "./PostCard";
import Spinner from "../assets/logo_dark.png";

const PostList = (props) => {
  // console.log("posts :", props.posts);
  return (
    <Stack spacing={2} mt={4} mb={4} alignItems="center">
      {props.posts?.map((singlePost, idx) => (
        <PostCard key={idx} singlePost={singlePost} />
      ))}
      {props.posts.length === 0 && (
        <img
          src={Spinner}
          alt="Loading..."
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      )}
      <Button variant="text" onClick={props.loadMore}>
        Load More...
      </Button>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Stack>
  );
};

export default PostList;
