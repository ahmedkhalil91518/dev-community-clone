import React, { useEffect } from "react";
import RelativeCSS from "./Relative.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getRelative } from "reducers/showPostsReducer";
import { PostBanner } from "components/PostBanner/PostBanner";
const Relative = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const posts = useSelector((state) => state.showPosts);

  useEffect(() => {
    console.log(posts);
      // @ts-ignore
      dispatch(getRelative());
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
