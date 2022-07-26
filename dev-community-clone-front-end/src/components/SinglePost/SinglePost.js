import React, { useEffect, useState ,useCallback} from "react";
import SinglePostCSS from "./SinglePost.module.css";
import { useParams, Link } from "react-router-dom";
import { showSinglePost } from "services/viewPostsService";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor } from "slate";
import CommentsSection from "components/CommentsSection/CommentsSection";

export const SinglePost = () => {
  const [post, setPost] = useState(null);
  const params = useParams();
  const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align };
    switch (element.type) {
      case "block-quote":
        return (
          <blockquote style={style} {...attributes}>
            {children}
          </blockquote>
        );
      case "bulleted-list":
        return (
          <ul style={style} {...attributes}>
            {children}
          </ul>
        );
      case "heading-one":
        return (
          <h1 style={style} {...attributes}>
            {children}
          </h1>
        );
      case "heading-two":
        return (
          <h2 style={style} {...attributes}>
            {children}
          </h2>
        );
      case "list-item":
        return (
          <li style={style} {...attributes}>
            {children}
          </li>
        );
      case "numbered-list":
        return (
          <ol style={style} {...attributes}>
            {children}
          </ol>
        );
      default:
        return (
          <p style={style} {...attributes}>
            {children}
          </p>
        );
    }
  };
  
  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }
  
    if (leaf.code) {
      children = <code>{children}</code>;
    }
  
    if (leaf.italic) {
      children = <em>{children}</em>;
    }
  
    if (leaf.underline) {
      children = <u>{children}</u>;
    }
  
    return <span {...attributes}>{children}</span>;
  };
  // @ts-ignore
  const [editor] = useState(withReact(createEditor()));
  const id = params.id;
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  useEffect(() => {
    showSinglePost(id).then((fetchedPost) => {
      setPost({...fetchedPost.data , content:JSON.parse(fetchedPost.data.content)});
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
          {post.content && (
            <Slate editor={editor} value={post.content}>
              <Editable readOnly renderElement={renderElement}
                  renderLeaf={renderLeaf}/>
            </Slate>
          )}
        </div>
        <CommentsSection />
      </div>
    );
  } else {
    return null;
  }
};
