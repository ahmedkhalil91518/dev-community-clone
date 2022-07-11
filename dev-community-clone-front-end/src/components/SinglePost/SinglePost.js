import React, { useEffect, useState } from "react";
import SinglePostCSS from "./SinglePost.module.css";
import { useParams } from "react-router-dom";
import { showSinglePost } from "services/viewPostsService";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor } from "slate";

export const SinglePost = () => {
  const [post, setPost] = useState(null);
  const params = useParams();
  // @ts-ignore
  const [editor] = useState(withReact(createEditor()));
  const id = params.id;

  useEffect(() => {
    showSinglePost(id).then((fetchedPost) => {
      setPost(fetchedPost);
      console.log(fetchedPost);
    });
  }, []);
  if (post) {
    return (
      <Slate editor={editor} value={JSON.parse(post.content)}>
        <Editable readOnly />
      </Slate>
    );
  } else {
    return null;
  }
};
