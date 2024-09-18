// import DropdownOptions from "../constants/DropdownOptions";

// const CustomDropdownk = (props) => {
//   const defaultValue = props.defaultValue;
//   const dropdownValues = DropdownOptions[props.constName];
//   const dropDownDetails = [];
//   const OnSelect = (e) => {
//     props.onSelect(e.target.value);
//   }
//   for (let i = 0; i < dropdownValues.length; i++) {
//     dropDownDetails.push(
//       <option value={dropdownValues[i]}>{dropdownValues[i]}</option>
//     );
//   }
//   return (
//     <select name={defaultValue} id={defaultValue} onChange={OnSelect}>
//       {dropDownDetails}
//     </select>
//   );
// };

// // export default CustomDropdownk;

import React from "react";
import DropdownOptions from "../constants/DropdownOptions";

const CustomDropdown = ({ defaultValue, constName, onSelect }) => {
  const dropdownValues = DropdownOptions[constName] || [];

  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => onSelect(e.target.value)}
    >
      {dropdownValues.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default CustomDropdown;
