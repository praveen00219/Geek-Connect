import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CommentList from "../components/CommentList";
import PostDetail from "../components/PostDetail";
import { dummyapi } from "../util";

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const postResponse = await dummyapi.get(`/posts/${id}`); // Corrected for DummyJSON
        setDetail(postResponse.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    })();

    (async () => {
      try {
        const commentResponse = await dummyapi.get(`/comments/post/${id}`); // Corrected for DummyJSON
        setComments(commentResponse.data.comments); // Use `comments` instead of `data`
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    })();
  }, [id]);

  return (
    <Container style={{ maxWidth: "520px" }}>
      <Stack mt={4} gap={4}>
        <PostDetail detail={detail} />
        <Typography variant="h6">
          {detail?.body} {/* Updated from text → body */}
          <Typography variant="caption">
            {" "}
            -{" "}
            <Link to={`/profile/${detail?.user?.id}`}>
              {detail?.user?.firstName} {detail?.user?.lastName}
            </Link>
          </Typography>
        </Typography>
        <CommentList commentList={comments} />
      </Stack>
    </Container>
  );
};

export default Detail;
