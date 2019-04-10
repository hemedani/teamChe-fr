import React from "react";

export default ({ place, changeCenter }) => {
  const onChangeCenter = () => {
    changeCenter(place);
  };
  return (
    <div className="showing-place" onClick={onChangeCenter}>
      {place.display_name}
    </div>
  );
};
