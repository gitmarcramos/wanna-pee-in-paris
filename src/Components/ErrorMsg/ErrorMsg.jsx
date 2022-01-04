import React from "react";
import "./ErrorMsg.css";

export default function ErrorMsg(props) {
  return <span className="error-message body-min">{props.msg}</span>;
}
