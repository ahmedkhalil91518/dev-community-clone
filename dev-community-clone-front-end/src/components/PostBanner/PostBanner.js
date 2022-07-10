import React, { useEffect } from "react";
import PostBannerCSS from "./PostBanner.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const PostBanner = ({ post }) => {
  useEffect(() => {
    console.log(post);
  }, []);

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
            <img src={post.author.photo} alt="author"  className={PostBannerCSS.authorPhoto}/>
            <div><div>{post.author.name}</div><div>{post.created_at.split("T")[0]}</div></div>
          </div>
        )}
        <Typography gutterBottom variant="h4" component="div" className={PostBannerCSS.wrap} >
          {post.title}
        </Typography>
        <div>
          {post.tags.map((tag) => {
            return <span className={PostBannerCSS.tag}>#{tag.value}</span>
          })}
        </div>
        <div  className={PostBannerCSS.comments}><div>{post.comments.length} comments</div></div>
      </CardContent>
    </Card>
  );
};
