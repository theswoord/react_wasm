import React from "react";

function ProfileCard({
  imageSrc,
  title,
  bubbleBackground = "#ffffff",
  bubbleBorder = "#d1d5db",
  bubbleTextColor = "#000000",
}) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Bubble ABOVE the image */}
      {title && (
        <div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-2xl shadow-md"
          style={{
            backgroundColor: bubbleBackground,
            border: `2px solid ${bubbleBorder}`,
            color: bubbleTextColor,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>
      )}

      {/* Profile Image */}
      <div
        className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg"
      >
        <img
          src={imageSrc}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default ProfileCard;
