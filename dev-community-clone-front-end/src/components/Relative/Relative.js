import React, { useEffect, useState } from "react";
import RelativeCSS from "./Relative.module.css";
import { PostBanner } from "components/PostBanner/PostBanner";
import { useInfiniteLoading } from "hooks/useInfiniteLoading";
import axios from "axios";
const Relative = () => {
  const { items, hasMore, loadItems } = useInfiniteLoading({
    getItems: ({ page }) => {
      return axios({
        method: "GET",
        url: "http://localhost:3001/api/viewPosts",
        params: { limit: 10, page: page },
      });
    },
  });
  const handleClick = () => {
    loadItems();
  };
  return (
    <div className={RelativeCSS.relative}>
      {items &&
        items.map((post) => {
          return <PostBanner key={post.id} post={post} />;
        })}
      {hasMore && <button onClick={handleClick}>Load More</button>}
    </div>
  );
};

export default Relative;
