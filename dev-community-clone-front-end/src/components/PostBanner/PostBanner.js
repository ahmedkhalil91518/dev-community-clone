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
          <div>
            <img src={post.author.photo} alt="author" />
          </div>
        )}
        <Typography gutterBottom variant="h4" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
  );
};
