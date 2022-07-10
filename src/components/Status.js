import React from "react";

export default function Status(props) {
  const statusText = () => {
    switch (props.status) {
      case 0:
        return "New";
      case 1:
        return "Accepted";
      case 2:
        return "Completed";
      case 3:
        return "Cancelled";
      case 4:
        return "Expired";
      default:
        return "Unknown";
    }
  };

  return <span>{statusText()}</span>;
}
