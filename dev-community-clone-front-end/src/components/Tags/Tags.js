import React, { Component, useEffect, useState } from "react";
import TagsCSS from "./Tags.module.css";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { tags } from "reducers/newPostReducer";
import { showAllTags } from "services/tagsService";

const Tags = () => {
  const dispatch = useDispatch();
  const [allTags, setAllTags] = useState([]);
  const handleChange = (newValue, actionMeta) => {
    dispatch(tags(newValue));
  };

  // @ts-ignore
  const oldTags = useSelector((state) => state.newPost.tags);
    // @ts-ignore
  const data = useSelector((state) => state.newPost);
  useEffect(() => {
    showAllTags().then((fetchedTags) => {
      setAllTags(fetchedTags);
    });
    console.log(oldTags);
    console.log(data);
  }, []);

  return (
    <div className={TagsCSS.selectContainer}>
      <CreatableSelect
        defaultValue={oldTags}
        isMulti
        onChange={handleChange}
        options={allTags}
        placeholder="add your tags here"
      />
    </div>
  );
};

export default Tags;
