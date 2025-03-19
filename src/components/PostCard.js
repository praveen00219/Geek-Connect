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
import axios from "axios";

export default function PostCard({ singlePost }) {
  const dispatch = useDispatch();
  const isLiked = useSelector((state) =>
    state.likedPosts.includes(singlePost.id)
  );

  const [userName, setUserName] = React.useState(singlePost.user?.name || "");
  const [loading, setLoading] = React.useState(false);

  const likeDislikePost = () => {
    if (isLiked) {
      dispatch(dislikePost(singlePost.id));
    } else {
      dispatch(likePost(singlePost.id));
    }
  };

  // 🎨 Fallbacks for User Data
  const userAvatar =
    singlePost.user?.avatar ||
    `https://i.pravatar.cc/150?u=${singlePost.userId}`;

  // 📸 Fallback for Post Image
  const imageSrc =
    singlePost.image ||
    singlePost.thumbnail ||
    `https://picsum.photos/500/300?random=${singlePost.id}`;

  // console.log("single post :", singlePost);

  // Fetch User Name if Missing
  React.useEffect(() => {
    if (!userName) {
      setLoading(true);
      axios
        .get(`https://dummyjson.com/users/${singlePost.userId}`)
        .then((response) => {
          setUserName(response.data.firstName + " " + response.data.lastName);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          setUserName("Unknown User");
          setLoading(false);
        });
    }
  }, [singlePost.userId, userName]);
  return (
    <Card sx={{ maxWidth: 520 }}>
      <CardHeader
        avatar={
          <Link to={`/profile/${singlePost.userId}`}>
            <Avatar
              src={userAvatar}
              sx={{ bgcolor: red[500] }}
              aria-label="user"
            >
              {!singlePost.user?.avatar && userName.charAt(0).toUpperCase()}
            </Avatar>
          </Link>
        }
        title={
          <Link to={`/profile/${singlePost.userId}`}>
            {loading ? "Loading..." : userName}
          </Link>
        }
        subheader={new Date(singlePost.publishDate).toDateString()}
      />
      <CardMedia
        component="img"
        image={imageSrc}
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
          {singlePost.reactions?.likes + (isLiked ? 1 : 0)} Likes
        </Typography>
        <Link to={`/post/${singlePost.id}`} style={{ marginLeft: "auto" }}>
          <small style={{ marginRight: "15px" }}>
            {singlePost.views} Views
          </small>
          <IconButton>
            <CommentIcon />
          </IconButton>
          <small>Comments</small>
        </Link>
      </CardActions>
    </Card>
  );
}
