import React from 'react';

const MyFiled = ({
  field, 
  form: { touched, errors },
  tak, wrapper, disabled, ltr, label,
  ...props
}) => {
  let classFrom = tak ? 'form-tak taki' : 'form-tak';
  wrapper ? classFrom = classFrom + ` ${wrapper}` : classFrom = classFrom
  ltr ? classFrom = classFrom + ` ltr` : classFrom = classFrom
  return (
  <div className={classFrom}>
    <label>{label}</label>
    <input type="text" {...field} {...props} />
    {touched[field.name] &&
      errors[field.name] && <span className='validate'>{errors[field.name]}</span>}
  </div>
)};

export default MyFiled
