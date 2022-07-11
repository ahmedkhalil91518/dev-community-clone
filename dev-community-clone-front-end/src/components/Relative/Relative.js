import React, { useEffect, useState } from "react";
import RelativeCSS from "./Relative.module.css";
import { PostBanner } from "components/PostBanner/PostBanner";
import { showAllPosts } from "services/viewPostsService";
const Relative = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    showAllPosts().then(fetchedPosts => {
      setPosts(fetchedPosts)
    })
  }, []);

  return (
    <div className={RelativeCSS.relative}>
      {posts && posts.map((post) => {
        return <PostBanner key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Relative;
