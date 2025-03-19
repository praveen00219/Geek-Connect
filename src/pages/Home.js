import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import PostList from "../components/PostList";
import { dummyapi } from "../util";
import HomeBasicCard from "../components/HomeBasicCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const limit = 10; // Set limit per page for DummyJSON

  const loadMore = async () => {
    try {
      const response = await dummyapi.get(
        `/posts?limit=${limit}&skip=${pageNumber * limit}`
      );
      const postsArr = response?.data?.posts ?? [];
      setPosts((oldPosts) => [...oldPosts, ...postsArr]);
      setPageNumber((page) => page + 1);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await dummyapi.get(`/posts?limit=${limit}`);
        const data = response.data.posts;
        setPosts(data);
        setPageNumber(1);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    })();
  }, []);

  return (
    <Container fixed>
      <HomeBasicCard />
      <PostList posts={posts} loadMore={loadMore} />
    </Container>
  );
};

export default Home;
