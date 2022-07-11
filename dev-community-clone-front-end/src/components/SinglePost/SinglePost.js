import React, { useEffect, useState } from "react";
import SinglePostCSS from "./SinglePost.module.css";
import { useParams, Link } from "react-router-dom";
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
      <div className={SinglePostCSS.container}>
        {post.coverPicture && (
          <img
            src={post.coverPicture}
            alt="cover"
            className={SinglePostCSS.cover}
          />
        )}
        <div className={SinglePostCSS.subContainer}>
          {post.author && (
            <div className={SinglePostCSS.authorSection}>
              <img
                src={post.author.photo || "https://via.placeholder.com/500"}
                alt="author"
                className={SinglePostCSS.authorPhoto}
              />
              <div>
                <div className={SinglePostCSS.author}>{post.author.name}</div>
                <div>posted at {post.created_at.split("T")[0]}</div>
              </div>
            </div>
          )}
          <h1 className={SinglePostCSS.title}>{post.title}</h1>
          <div className={SinglePostCSS.tagsContainer}>
            {post.tags.map((tag) => {
              return (
                <Link to={`/tags/${tag.value}`} key={tag.value}>
                  <span className={SinglePostCSS.tag}>#{tag.value}</span>
                </Link>
              );
            })}
          </div>
          {JSON.parse(post.content) && (
            <Slate editor={editor} value={JSON.parse(post.content)}>
              <Editable readOnly />
            </Slate>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
