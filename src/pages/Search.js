// import { dummyapi } from "../util";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, LinearProgress } from "@mui/material";
import PostList from "../components/PostList";
import SearchBasicCard from "../components/SearchBasicCard";
import axios from "axios"; // Replace dummyapi with direct axios request

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (reset = false) => {
    if (!searchParams.has("q")) {
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/posts/search?q=${searchParams.get(
          "q"
        )}&limit=10&skip=${reset ? 0 : pageNumber * 10}`
      );
      setPosts((prev) =>
        reset ? response.data.posts : [...prev, ...response.data.posts]
      );
      setPageNumber((prev) => (reset ? 1 : prev + 1));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPosts([]);
    fetchPosts(true);
  }, [searchParams, navigate]);

  return (
    <Container fixed>
      <SearchBasicCard query={searchParams.get("q")} />
      {loading && posts.length === 0 ? (
        <LinearProgress style={{ margin: "1.5rem 0.75rem" }} />
      ) : (
        <PostList posts={posts} loadMore={() => fetchPosts(false)} />
      )}
    </Container>
  );
};

export default Search;
