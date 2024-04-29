const CustomDropdown = (props) => {
  const defaultValue = props.defaultValue;
  const dropdownValues = ["Recents", "All"];
  const dropDownDetails = [];
  const OnSelect = (e) => {
    props.onAllSelect(e.target.value);
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
