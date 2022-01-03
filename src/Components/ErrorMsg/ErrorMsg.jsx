import React from "react";
import "./ErrorMsg.css";

export default function ErrorMsg(props) {
  return <span className="error-message">{props.msg}</span>;
}
