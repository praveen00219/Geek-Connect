import * as React from "react";
import {
  Chip,
  Stack,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePost, dislikePost } from "../slice";

export default function PostCard({ singlePost }) {
  const dispatch = useDispatch();
  const isLiked = useSelector((state) =>
    state.likedPosts.includes(singlePost.id)
  );

  const likeDislikePost = () => {
    if (isLiked) {
      dispatch(dislikePost(singlePost.id));
    } else {
      dispatch(likePost(singlePost.id));
    }
  };

  return (
    <Card sx={{ maxWidth: 520 }}>
      <CardHeader
        avatar={
          <Link to={`/profile/${singlePost.userId}`}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
              {singlePost.userId}
            </Avatar>
          </Link>
        }
        title={
          <Link to={`/profile/${singlePost.userId}`}>
            User {singlePost.userId}
          </Link>
        }
        subheader={new Date(singlePost.publishDate).toDateString()}
      />
      <CardMedia
        component="img"
        image={singlePost.image || singlePost.thumbnail}
        alt="Post"
        onDoubleClick={likeDislikePost}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {singlePost.body}
        </Typography>
        <Stack direction="row" spacing={1} mt={1}>
          {singlePost.tags?.map((tag, idx) => (
            <Link key={idx} to={`/search?q=${tag}`}>
              <Chip
                label={`#${tag}`}
                variant="outlined"
                size="small"
                style={{ textTransform: "capitalize" }}
              />
            </Link>
          ))}
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={likeDislikePost}>
          <FavoriteIcon style={{ color: isLiked ? "red" : "inherit" }} />
        </IconButton>
        <Typography variant="caption" display="block" gutterBottom>
          {singlePost.reactions?.likes ?? 0} Likes
        </Typography>
        <Link to={`/post/${singlePost.id}`} style={{ marginLeft: "auto" }}>
          <IconButton>
            <CommentIcon />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  );
}
