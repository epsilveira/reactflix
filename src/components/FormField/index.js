import React from 'react';
import PropTypes from 'prop-types';

function FormField({
  label, type, value, name, onChange,
}) {
  const fieldID = `id_${name}`;
  return (
    <div>
      <label
        htmlFor={fieldID}
      >
        {label}
        <input
          id={fieldID}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

FormField.defaultProps = {
  type: 'text',
  value: '',
  onChange: () => {},
};
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
export default FormField;
