import React from "react";

function SpeechBubble({
  text,
  backgroundColor = "#ffffff",
  borderColor = "#d1d5db",
  textColor = "#000000",
  borderRadius = "16px",
  tailPosition = "bottom" // 'bottom' | 'left' | 'right'
}) {
  const tailStyles = {
    bottom: {
      borderLeft: "12px solid transparent",
      borderRight: "12px solid transparent",
      borderTop: `12px solid ${backgroundColor}`,
      position: "absolute",
      bottom: "-12px",
      left: "32px"
    },
    left: {
      borderTop: "12px solid transparent",
      borderBottom: "12px solid transparent",
      borderRight: `12px solid ${backgroundColor}`,
      position: "absolute",
      left: "-12px",
      top: "16px"
    },
    right: {
      borderTop: "12px solid transparent",
      borderBottom: "12px solid transparent",
      borderLeft: `12px solid ${backgroundColor}`,
      position: "absolute",
      right: "-12px",
      top: "16px"
    }
  };

  return (
    <div
      className="relative shadow-lg"
      style={{
    backgroundColor,
    color: textColor,
    border: `2px solid ${borderColor}`,
    borderRadius,
    padding: "12px 16px",
    display: "inline-block",
    maxWidth: "80%",        // relative to parent
    whiteSpace: "normal",   // wraps only if needed
    wordBreak: "break-word" // break long words like URLs
      }}
    >
      {text}
      {/* <div style={tailStyles[tailPosition]}></div> */}
    </div>
  );
}

export default SpeechBubble;
