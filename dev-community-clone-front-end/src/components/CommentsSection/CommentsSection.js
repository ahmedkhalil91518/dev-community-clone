import React from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { useSelector } from "react-redux";
import { addComment } from "services/commentsService";
import { useParams } from "react-router-dom";
const CommentsSection = () => {
  const user = useSelector((state) => {
    // @ts-ignore
    return state.auth;
  });
  const params = useParams();
  const PostId = params.id;
  console.log(user);
  const data = [
    /* 
    {
      userId: '02b',
      comId: '017',
      fullName: 'Lily',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'I think you have a point🤔',
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      replies: []
    } */
  ];
  return (
    <CommentSection
      currentUser={{
        currentUserId: user._id,
        currentUserImg: user.photo,
        currentUserProfile: `http://localhost:3000/users/${
          user.email.split("@")[0]
        }`,
        currentUserFullName: user.name,
      }}
      logIn={{
        loginLink: "http://localhost:3001/",
        signupLink: "http://localhost:3001/",
      }}
      commentData={data}
      onSubmitAction={(SubmittedData) => {
        addComment({ ...SubmittedData, parentPost: PostId }, user.token).then(
          (x) => console.log(x)
        );
      }}
      currentData={(data) => {
        console.log("current data", data);
      }}
    />
  );
};

export default CommentsSection;
