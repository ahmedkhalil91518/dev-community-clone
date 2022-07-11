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

  useEffect(() => {
    showAllTags().then((fetchedTags) => {
      setAllTags(fetchedTags);
    });
  }, []);

  return (
    <div className={TagsCSS.selectContainer}>
      <CreatableSelect
        isMulti
        onChange={handleChange}
        options={allTags}
        placeholder="add your tags here"
      />
    </div>
  );
};

export default Tags;
