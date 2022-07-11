import React, { useEffect, useState } from "react";
import TagPostsCSS from "./TagPosts.module.css";
import { useParams } from "react-router-dom";
import { showTagPosts } from "services/viewPostsService";
import { PostBanner } from "components/PostBanner/PostBanner";

export const TagPosts = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const tag = params.tag;

  useEffect(() => {
    showTagPosts(tag).then((posts) => {
      setPosts(posts);
    });
  },[]);

  return (
    <div>
      {posts &&
        posts.map((post) => {
          return <PostBanner key={post.id} post={post} />;
        })}
    </div>
  );
};
