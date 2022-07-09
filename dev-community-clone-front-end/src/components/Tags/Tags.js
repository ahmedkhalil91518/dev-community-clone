import React, { Component } from "react";
import TagsCSS from "./Tags.module.css";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { tags } from "reducers/newPostReducer";

const options = [];

const Tags = () => {
  const dispatch = useDispatch();

  const handleChange = (newValue, actionMeta) => {
    dispatch(tags(newValue));
  };
  return (
    <div className={TagsCSS.selectContainer}>
      <CreatableSelect
        isMulti
        onChange={handleChange}
        options={options}
        placeholder="add your tags here"
      />
    </div>
  );
};

export default Tags;
