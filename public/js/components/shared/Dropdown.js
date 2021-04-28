import React from 'react';
import classnames from 'classnames';

const Dropdown = ({ field, label, error, onChange, selections, placeholder, lowercase }) => {

  const options = selections.map((select) => {
    return <option key={select.id} value={lowercase ? select.value.toLowerCase() : select.value}>{select.value}</option>
  });

  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label className="container-label">{label}</label>
      <select
        onChange={onChange}
        name={field}
        className="form-control"
        defaultValue={""}
      >
        <option value="" disabled>{placeholder}</option>
        {options}
      </select>
      {error && <span className="help-block">{error}</span>}
    </div>
  );
};

export default Dropdown;