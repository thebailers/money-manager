import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const TextFieldGroup = ({ label, field, value, error, type, onChange }) => {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label className='control-label'>{label}</label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        name={field}
        className='form-control'
      />
      {error && <span className='hint'>{error}</span>}
    </div>
  )
}

const { string, func } = PropTypes

TextFieldGroup.propTypes = {
  field: string.isRequired,
  value: string.isRequired,
  label: string.isRequired,
  error: string,
  type: string.isRequired,
  onChange: func.isRequired
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
