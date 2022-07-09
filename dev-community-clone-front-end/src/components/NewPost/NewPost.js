import React, { useCallback, useEffect, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from "slate";
import NewPostCSS from "./NewPost.module.css";
import { Button, Icon, Toolbar } from "./components";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faHeading,
  faCode,
  faQuoteLeft,
  faListNumeric,
  faListDots,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import CoverPicture from "components/CoverPicture/CoverPicture";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Tags from "../Tags/Tags";
import { useDispatch, useSelector } from "react-redux";
import { title, article, remove } from "reducers/newPostReducer";
import { addPost } from "services/postsService";
import { useNavigate } from "react-router-dom";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const NewPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  // @ts-ignore
  const [editor] = useState(withReact(createEditor()));

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(10, "the minimum characters for the title is 10")
      .required("Required"),
  });

  const initialValues = {
    title: "",
  };

  // @ts-ignore
  const fullArticle = useSelector((state) => state.newPost);
  // @ts-ignore
  const auth = useSelector((state) => state.auth);

  const handleSubmit = async (value) => {
    dispatch(title(value.title));
    const slateArticle = JSON.parse(localStorage.getItem("content"));
    dispatch(article(slateArticle));
    console.log(fullArticle);
    const add = await addPost(
      { ...fullArticle, title: value.title, article: slateArticle },
      auth.token
    );
    console.log(add);
    navigate("/");
  };

  useEffect(() => {
    dispatch(remove());
  }, []);

  return (
    <div
      className={
        isTabletOrMobile ? NewPostCSS.containerSmall : NewPostCSS.container
      }
    >
      <h1>Create a Post</h1>
      <div className={NewPostCSS.subContainer}>
        <CoverPicture />
      </div>
      <div className={NewPostCSS.subContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <div>
            {" "}
            <Form>
              <div>
                <Field
                  type="text"
                  name="title"
                  id="exampleFormControlInput0"
                  className={NewPostCSS.field}
                  placeholder="enter your title here"
                />
                <div
                  className={NewPostCSS.error + " " + NewPostCSS.errorContainer}
                >
                  <ErrorMessage name="title" />
                </div>
              </div>
              <Tags />
              <Slate
                editor={editor}
                value={initialValue}
                onChange={(value) => {
                  // Save the value to Local Storage.
                  const content = JSON.stringify(value);
                  localStorage.setItem("content", content);
                }}
              >
                <Toolbar>
                  <MarkButton format="bold" icon="format_bold" />
                  <MarkButton format="italic" icon="format_italic" />
                  <MarkButton format="underline" icon="format_underlined" />
                  <MarkButton format="code" icon="code" />
                  <BlockButton format="heading-one" icon="looks_one" />
                  <BlockButton format="block-quote" icon="format_quote" />
                  <BlockButton
                    format="numbered-list"
                    icon="format_list_numbered"
                  />
                  <BlockButton
                    format="bulleted-list"
                    icon="format_list_bulleted"
                  />
                  <BlockButton format="left" icon="format_align_left" />
                  <BlockButton format="center" icon="format_align_center" />
                  <BlockButton format="right" icon="format_align_right" />
                  <BlockButton format="justify" icon="format_align_justify" />
                </Toolbar>
                <Editable
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  placeholder="Enter your article here"
                  spellCheck
                  onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                      if (isHotkey(hotkey, event)) {
                        event.preventDefault();
                        const mark = HOTKEYS[hotkey];
                        toggleMark(editor, mark);
                      }
                    }
                  }}
                />
              </Slate>{" "}
              <button type="submit" className={NewPostCSS.button}>
                publish
              </button>
            </Form>
          </div>
        </Formik>
      </div>
    </div>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      // @ts-ignore
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      // @ts-ignore
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

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

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon === "looks_one" && (
        <Icon>
          <FontAwesomeIcon icon={faHeading} />
        </Icon>
      )}{" "}
      {icon === "format_quote" && (
        <Icon>
          <FontAwesomeIcon icon={faQuoteLeft} />
        </Icon>
      )}{" "}
      {icon === "format_list_numbered" && (
        <Icon>
          <FontAwesomeIcon icon={faListNumeric} />
        </Icon>
      )}{" "}
      {icon === "format_list_bulleted" && (
        <Icon>
          <FontAwesomeIcon icon={faListDots} />
        </Icon>
      )}{" "}
      {icon === "format_align_left" && (
        <Icon>
          <FontAwesomeIcon icon={faAlignLeft} />
        </Icon>
      )}{" "}
      {icon === "format_align_center" && (
        <Icon>
          <FontAwesomeIcon icon={faAlignCenter} />
        </Icon>
      )}{" "}
      {icon === "format_align_right" && (
        <Icon>
          <FontAwesomeIcon icon={faAlignRight} />
        </Icon>
      )}{" "}
      {icon === "format_align_justify" && (
        <Icon>
          <FontAwesomeIcon icon={faAlignJustify} />
        </Icon>
      )}
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon === "format_bold" && (
        <Icon>
          <FontAwesomeIcon icon={faBold} />
        </Icon>
      )}
      {icon === "format_italic" && (
        <Icon>
          <FontAwesomeIcon icon={faItalic} />
        </Icon>
      )}
      {icon === "format_underlined" && (
        <Icon>
          <FontAwesomeIcon icon={faUnderline} />
        </Icon>
      )}
      {icon === "code" && (
        <Icon>
          <FontAwesomeIcon icon={faCode} />
        </Icon>
      )}
    </Button>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default NewPost;
