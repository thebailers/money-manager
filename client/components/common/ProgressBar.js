import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const ProgressBar = ({ percentage, current, annotated, limit }) => {
  // CSS width percentage for the current value
  const progressBarStyle = {
    width: `${percentage}%` || '0'
  }

  const currentLocStyle = {
    left: `${percentage}%` || '0'
  }

  // Setup the progress bar annotations if desired
  let cur
  let li

  if (annotated) {
    cur = <span className='current' style={currentLocStyle}>{current}</span>
    li = <span className='limit'><span className='anchor'>{limit}</span></span>
  }

  return (
    <div className={classnames('progress-bar', annotated ? 'annotated' : '')}>
      <span className='progress' style={progressBarStyle}></span>
      {annotated ? cur : ''}
      {annotated ? li : ''}
    </div>
  )
}

const { number, string, bool, oneOfType } = PropTypes

ProgressBar.propTypes = {
  percentage: number,
  current: oneOfType([string, number]),
  limit: oneOfType([string, number]),
  annotated: bool
}

export default ProgressBar
