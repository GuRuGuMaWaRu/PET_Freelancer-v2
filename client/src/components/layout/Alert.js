import React, { useEffect } from "react";
import PropTypes from "prop-types";

import {
  StyledAlert,
  StyledCloseIcon,
  StyledTypeIcon
} from "../styles/alertSyles";

const Alert = ({ alert, state, duration, removeAlert }) => {
  useEffect(() => {
    setTimeout(() => removeAlert(alert.id), 6000);
    // eslint-disable-next-line
  }, []);

  return (
    <StyledAlert state={state} duration={duration}>
      {alert.type === "info" ? (
        <StyledTypeIcon icon="info-circle"></StyledTypeIcon>
      ) : (
        <StyledTypeIcon icon="exclamation-circle"></StyledTypeIcon>
      )}
      <p>{alert.msg}</p>
      <StyledCloseIcon
        onClick={() => removeAlert(alert.id)}
        state={state}
        duration={duration}
        icon="times-circle"
      ></StyledCloseIcon>
    </StyledAlert>
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  removeAlert: PropTypes.func.isRequired
};

export default Alert;
