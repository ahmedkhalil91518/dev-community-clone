import React, { Component } from "react";
import TagsCSS from "./Tags.module.css"
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

export default class CreatableMulti extends Component {
  handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  render() {
    return (
        <div className={TagsCSS.select}>
      <CreatableSelect
        isMulti
        onChange={this.handleChange}
        options={options}
        placeholder="add your tags here"
      /></div>
    );
  }
}
