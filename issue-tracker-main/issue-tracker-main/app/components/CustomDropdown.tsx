import DropdownOptions from "../constants/DropdownOptions";

const CustomDropdown = (props) => {
  const defaultValue = props.defaultValue;
  const dropdownValues = DropdownOptions[props.constName];
  const dropDownDetails = [];
  const OnSelect = (e) => {
    props.onSelect(e.target.value);
  }
  for (let i = 0; i < dropdownValues.length; i++) {
    dropDownDetails.push(
      <option value={dropdownValues[i]}>{dropdownValues[i]}</option>
    );
  }
  return (
    <select name={defaultValue} id={defaultValue} onChange={OnSelect}>
      {dropDownDetails}
    </select>
  );
};

export default CustomDropdown;
