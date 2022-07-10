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
  // @ts-ignore
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(auth);
    if (auth) {
      // @ts-ignore
      dispatch(getRelative(auth.token));
      console.log(posts);
    }
  }, []);

  return (
    <div className={RelativeCSS.relative}>
      {posts.map((post) => {
        return <PostBanner key={post.id} post={post} />;
      })}
    </div>
  );
};

export default Relative;
