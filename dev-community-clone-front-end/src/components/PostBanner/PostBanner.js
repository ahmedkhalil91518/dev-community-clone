import React, { useEffect } from "react";
import PostBannerCSS from "./PostBanner.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export const PostBanner = ({ post }) => {
  return (
    <Card className={PostBannerCSS.card}>
      {post.coverPicture && (
        <CardMedia
          component="img"
          alt="cover picture"
          image={post.coverPicture}
          className={PostBannerCSS.coverPhoto}
        />
      )}
      <CardContent>
        {post.author && (
          <div className={PostBannerCSS.authorSection}>
            <img
              src={post.author.photo || "https://via.placeholder.com/500"}
              alt="author"
              className={PostBannerCSS.authorPhoto}
            />
            <div>
              <div>{post.author.name}</div>
              <div>{post.created_at.split("T")[0]}</div>
            </div>
          </div>
        )}
        <Link to={`/posts/${post.id}`} className={PostBannerCSS.wrap}>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            className={PostBannerCSS.wrap}
          >
            {post.title}
          </Typography>
        </Link>
        <div className={PostBannerCSS.tags}>
          {post.tags.map((tag) => {
            return (
              <Link to={`/navigate/${tag.value}`} key={tag.value}>
                {" "}
                <span className={PostBannerCSS.tag}>#{tag.value}</span>
              </Link>
            );
          })}
        </div>
        <div className={PostBannerCSS.comments}>
          <div>{post.comments.length} comments</div>
        </div>
      </CardContent>
    </Card>
  );
};
