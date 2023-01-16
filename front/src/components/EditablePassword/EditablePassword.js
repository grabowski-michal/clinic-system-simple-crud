import React, { useState } from 'react';
import styles from './EditablePassword.module.css';
import $ from 'jquery';
import bcrypt from 'bcryptjs';

const EditablePassword = (props) => {

  const [mode, setMode] = useState(false);
  const [value, setValue] = useState(props.value);
  const [newValue, setNewValue] = useState('');
  const [repeatNewValue, setRepeatNewValue] = useState('');

  const changeValue = (e) => {
    setValue(e.target.value);
    e.target.setCustomValidity("");
  }
  
  const changeNewValue = (e) => {
    setNewValue(e.target.value);
    e.target.setCustomValidity("");
  }

  const changeRepeatValue = (e) => {
    setRepeatNewValue(e.target.value);
    e.target.setCustomValidity("");
  }

  const validatePassword = () => {
    let passwordField = $("#" + props.name)[0];
    let newPasswordField = $("#" + props.name + "_new")[0];
    let repeatNewPasswordField = $("#" + props.name + "_repeat")[0];
    if (!$("#" + props.name)[0].checkValidity()) {
      $("#" + props.name)[0].reportValidity();
      return false;
    } else {
      let errors = {};
  
      const atLeastOneAlphabeticalLowerChar = new RegExp("^(?=.*[a-z])");
      const atLeastOneAlphabeticalUpperChar = new RegExp("^(?=.*[A-Z])");
      const atLeastOneNumericChar = new RegExp("^(?=.*[0-9])");
      const atLeastOneSpecialChar = new RegExp("^(?=.*[!@#$%^&*])");
      const atLeastEightChars = new RegExp("^(?=.{8,})");

      if (!bcrypt.compareSync(passwordField.value, props.value)) {
        errors.password = "Wrong current password";
        passwordField.setCustomValidity(errors.password);
        passwordField.reportValidity();
      } else if (!atLeastOneAlphabeticalLowerChar.test(newPasswordField.value)) {
        errors.password = "Password needs to contain at least one lowercase alphabetical character";
        newPasswordField.setCustomValidity(errors.password);
        newPasswordField.reportValidity();
  
      } else if (!atLeastOneAlphabeticalUpperChar.test(newPasswordField.value)) {
        errors.password = "Password needs to contain at least one uppercase alphabetical character";
        newPasswordField.setCustomValidity(errors.password);
        newPasswordField.reportValidity();
  
      } else if (!atLeastOneNumericChar.test(newPasswordField.value)) {
        errors.password = "Password needs to contain at least one numeric character";
        newPasswordField.setCustomValidity(errors.password);
        newPasswordField.reportValidity();
  
      } else if (!atLeastOneSpecialChar.test(newPasswordField.value)) {
        errors.password = "Password needs to contain at least one special character";
        newPasswordField.setCustomValidity(errors.password);
        newPasswordField.reportValidity();
  
      } else if (!atLeastEightChars.test(newPasswordField.value)) {
        errors.password = "Password needs to have at least 8 characters";
        newPasswordField.setCustomValidity(errors.password);
        newPasswordField.reportValidity();
  
      } else if (newPasswordField.value !== repeatNewPasswordField.value) {
        errors.password = "Passwords are not the same";
        repeatNewPasswordField.setCustomValidity(errors.password);
        repeatNewPasswordField.reportValidity();
      } else if (bcrypt.compareSync(newPasswordField.value, props.value)) {
        errors.password = "New password cannot be the same as old password";
        newPasswordField.setCustomValidity(errors.password);
        newPasswordField.reportValidity();
      } else {
        repeatNewPasswordField.setCustomValidity("");
        repeatNewPasswordField.reportValidity();
      }
  
      if (JSON.stringify(errors) === '{}') return true;
      else return false;
    }
  }

  const input = (name, value) => {
    return (
      <div style={{width:"500px"}}>
        <span style={{ display: props.display, marginBottom: props.marginBottom, marginTop: props.marginTop ? props.marginTop : "initial" }}>
          { 'Current ' + props.label }:&nbsp;
        </span>
        <input id={name} type={props.type} defaultValue='' onInput={changeValue} required={props.required}></input> <br/>
        <span style={{ display: props.display, marginBottom: props.marginBottom, marginTop: props.marginTop ? props.marginTop : "initial" }}>
          { 'New ' + props.label }:&nbsp;
        </span>
        <input id={name + "_new"} type={props.type} defaultValue='' onInput={changeNewValue} required={props.required}></input> <br/>
        <span style={{ display: props.display, marginBottom: props.marginBottom, marginTop: props.marginTop ? props.marginTop : "initial" }}>
          { 'Repeat New ' + props.label }:&nbsp;
        </span>
        <input id={name + "_repeat"} type={props.type} defaultValue='' onInput={changeRepeatValue} required={props.required}></input>
      </div>
    );
  }

  const accept = async (event) => {
    if (validatePassword()) {
      let passwordField = $("#" + props.name)[0];
      let newPasswordField = $("#" + props.name + "_new")[0];
      let res = await props.alterData(props.name, {
        oldPassword: passwordField.value,
        newPassword: newPasswordField.value
      });
      console.log(res);
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
  
  return (
  <div className={styles.EditablePassword} style={{ marginTop: "20px"}}>
    <p style={{ display: (mode ? 'none' : props.display), marginBottom: props.marginBottom, marginTop: props.marginTop ? props.marginTop : "initial" }}>
      { (mode ? '' : props.label + ":") }&nbsp;
    </p>
    <div data-user={props.name} style={{ display: "inline-block", color: "black", marginBottom: 0 }}>
        {
        mode ? input(props.name, props.value) : 
        '***'
        }
    </div>
    &nbsp;<i style={{ display: (mode || props.notEditable) ? "none" : "initial" }} className="fa fa-edit" onClick={(e) => editMode(e)}></i>
    <i style={{ display: mode ? "initial" : "none", color: "green", marginRight: "10px" }} className="fa fa-check" onClick={(e) => accept(e)}></i>
    <i style={{ display: mode ? "initial" : "none", color: "red" }} className="fa fa-times" onClick={(e) => cancel(e)}></i>
  </div>
  )
};

export default EditablePassword;
