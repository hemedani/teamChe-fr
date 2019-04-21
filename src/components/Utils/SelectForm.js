import React from "react";
import Select from "react-select";

const customStyles = {
  clearIndicator: style => ({ ...style }),
  menuList: style => ({ ...style }),
  container: style => ({ ...style, height: "2rem" }),
  control: style => ({ ...style, height: "2rem" }),
  input: style => ({ ...style, height: "2rem" }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "gray"
  }),
  menu: style => ({ ...style, zIndex: 999999 })
};

export default ({ itrator, returnLabel, returnValue, state, handeStateSelect, label, stateKey, err }) => {
  const handleChange = e => handeStateSelect(e, stateKey, err);
  return (
    <div className="form-tak triad">
      <label>{label}</label>
      <Select
        styles={customStyles}
        name="state"
        rtl={true}
        placeholder={`یک ${label} انتخاب کنید`}
        onChange={handleChange}
        options={itrator}
        value={itrator.filter(({ _id }) => _id === state)}
        getOptionLabel={returnLabel}
        getOptionValue={returnValue}
        // defaultMenuIsOpen={true}
      />
    </div>
  );
};
