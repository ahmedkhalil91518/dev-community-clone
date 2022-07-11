import React, { useEffect, useState } from "react";
import SinglePostCSS from "./SinglePost.module.css";
import { useParams } from "react-router-dom";
import { showSinglePost } from "services/viewPostsService";

export const SinglePost = () => {
  const [post, setPost] = useState(null);
  const params = useParams();

  const id = params.id;

  useEffect(() => {
    showSinglePost(id).then((fetchedPost) => {
      setPost(fetchedPost);
      console.log(fetchedPost);
    });
  }, []);

  return <div>{id}</div>;
};
