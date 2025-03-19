import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import ProfileDetail from "../components/ProfileDetail";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${id}`);
        setDetail(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://dummyjson.com/posts?userId=${id}&limit=10&skip=0`
        );
        setPosts(response.data.posts);
        setPageNumber(1);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
      setLoading(false);
    };

    fetchUser();
    fetchPosts();
  }, [id]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/posts?userId=${id}&limit=10&skip=${
          pageNumber * 10
        }`
      );
      setPosts((oldPosts) => [...oldPosts, ...response.data.posts]);
      setPageNumber((page) => page + 1);
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <ProfileDetail detail={detail} />
      <hr />
      <Typography variant="h6" align="center" mt={4}>
        All Posts
      </Typography>
      <PostList posts={posts} loadMore={loadMore} loading={loading} />
    </Container>
  );
};

export default Profile;
