import React, { useEffect, useState } from "react";
import TagPostsCSS from "./TagPosts.module.css";
import { useParams } from "react-router-dom";
import { useInfiniteLoading } from "hooks/useInfiniteLoading";
import { PostBanner } from "components/PostBanner/PostBanner";
import axios from "axios";

export const TagPosts = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const tag = params.tag;

  const { items, hasMore, loadItems } = useInfiniteLoading({
    getItems: ({ page }) => {
     return axios({
        method: "GET",
        url: `http://localhost:3001/api/viewPosts/tag/${tag}`,
        params: { limit: 10, page: page },
      });
    },
  });
const handleClick = () => {
  loadItems()
}

  return (
    <div>
      {items &&
        items.map((post) => {
          return <PostBanner key={post.id} post={post} />;
        })}
        {hasMore && <button onClick={handleClick}>Load More</button>}
    </div>
  );
};
