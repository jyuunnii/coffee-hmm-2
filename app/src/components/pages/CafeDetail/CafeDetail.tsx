import React from "react";

type CafeDetailProps = {
  hidden: "visible" | "hidden";
};

const CafeDetail = ({ hidden }: CafeDetailProps) => {
  return (
    <div
      style={{
        visibility: hidden,
      }}
    >
      tooltip msg
    </div>
  );
};

export default CafeDetail;
