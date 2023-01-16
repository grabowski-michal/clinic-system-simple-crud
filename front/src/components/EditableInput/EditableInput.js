import React, { useState } from 'react';
import styles from './EditableInput.module.css';
import $ from 'jquery';

const EditableInput = (props) => {

  const [mode, setMode] = useState(false);
  const [value, setValue] = useState(props.value);

  const changeValue = (e) => {
    setValue(e.target.value);
  }

  const input = (name, value) => {
    return <input id={name.replace(".", "-")} type={props.type} defaultValue={value} onInput={changeValue} required={props.required}></input>;
  }

  const accept = async (event) => {
    let name = props.name;
    if (name.indexOf(".") != -1) {
      name = name.replace(".", "-");
    }
    if (!$("#" + name)[0].checkValidity()) {
      $("#" + name)[0].reportValidity();
    } else {
      let res = await props.alterData(props.name, value);
      if (res.data || res.status === 200) {
        setMode(false);
      }
    }
  }

  const cancel = (event) => {
    setMode(false);
    setValue(props.value);
  }

  const editMode = (event) => {
    setMode(!mode);
  }
  
  if (!props.icon) {
    return (
    <div className={styles.EditableInput}>
      <p style={{ display: props.display, marginBottom: props.marginBottom, marginTop: props.marginTop ? props.marginTop : "initial" }}>
        { props.label }:&nbsp;
      </p>
      <p data-user={props.name} style={{ display: "inline-block", color: "black", marginBottom: 0 }}>
         {
          mode ? input(props.name, props.value) : 
          props.value
         }
      </p>
      &nbsp;<i style={{ display: (mode || props.notEditable) ? "none" : "initial" }} className="fa fa-edit" onClick={(e) => editMode(e)}></i>
      <i style={{ display: mode ? "initial" : "none", color: "green", marginRight: "10px" }} className="fa fa-check" onClick={(e) => accept(e)}></i>
      <i style={{ display: mode ? "initial" : "none", color: "red" }} className="fa fa-times" onClick={(e) => cancel(e)}></i>
    </div>
    )
  } else {
    return (
      <p><i className={"fa " + props.icon}></i> {props.label}: 
      <span style={{ color: "black" }}>&nbsp;
      {
        mode ? input(props.name, props.value) : 
        props.value
      }
      &nbsp;<i style={{ display: (mode || props.notEditable) ? "none" : "initial" }} className="fa fa-edit" onClick={(e) => editMode(e)}></i>
      <i style={{ display: mode ? "initial" : "none", color: "green", marginRight: "10px" }} className="fa fa-check" onClick={(e) => accept(e)}></i>
      <i style={{ display: mode ? "initial" : "none", color: "red" }} className="fa fa-times" onClick={(e) => cancel(e)}></i></span>
      </p>
    );
  }
};

export default EditableInput;
