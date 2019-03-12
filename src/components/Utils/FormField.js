import React, { Component } from 'react';
import _ from 'lodash'

export const RenderField = ({ input, label, type, meta: { touched, error, warning }, tak, wrapper, disabled, ltr, removeArray = false, fields, index }) => {
  let classFrom = tak ? 'form-tak taki' : 'form-tak';
  wrapper ? classFrom = classFrom + ` ${wrapper}` : classFrom = classFrom
  ltr ? classFrom = classFrom + ` ltr` : classFrom = classFrom
  return (
    <div className={classFrom}>
      {type !== 'hidden' && <label>{label}</label>}
      {removeArray && <i className='remove-array pinteb-icon icon-close' onClick={() => fields.remove(index)}></i>}
      <input {...input} placeholder={label} type={type} disabled={disabled}/>
      {touched && ((error && <span className='validate'>{error}</span>) || (warning && <span className='warn'>{warning}</span>))}
    </div>
  )
}

export const required = value => value ? undefined : 'این فیلد اجباری است'
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength15 = maxLength(15)
export const number = value => value && isNaN(Number(value)) ? 'باید عدد وارد کنید' : undefined
export const minValue = min => value =>
  value && value < min ? `باید حداقل ${min} کاراکتر باشد` : undefined
export const minValue18 = minValue(18)
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'این ایمیل صحیح نیست' : undefined
export const tooOld = value =>
  value && value > 80 ? 'خیلی سنت زیاده حاجی' : undefined
export const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined

export const phoneMobile = (number) => {
  number = _.parseInt(number)
  if (((_.startsWith(number, 989)) && (number.toString().length === 12)) || ((_.startsWith(number, 9)) && (number.toString().length === 10))) {
    return undefined
  } else { return 'شماره صحیح نیست' }
}