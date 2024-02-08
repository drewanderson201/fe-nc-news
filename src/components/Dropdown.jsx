export default function Dropdown({
  dropdownConfig,
  stateValue,
  setStateValue,
  searchParams,
  setSearchParams,
}) {
  const handleChange = (event) => {
    setStateValue(event.target.value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set(dropdownConfig.id, event.target.value);
    setSearchParams(newParams)
  };

  return (
    <div className="dropdown">
      <label htmlFor={dropdownConfig.id}>{dropdownConfig.label}</label>
      <select
        name={dropdownConfig.id}
        id={dropdownConfig.id}
        value={stateValue}
        onChange={handleChange}
        className="dropdown-select"
      >
        {dropdownConfig.options.map((option) => {
          return (
            <option key={option[1]} value={option[1]} className="dropdown-option">
              {option[0]}
            </option>
          );
        })}
      </select>
    </div>
  );
}
