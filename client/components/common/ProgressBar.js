import React from 'react'

const ProgressBar = ({ percentage }) => {
  const progressBarStyle = {
    width: `${percentage}%` || '0'
  }
  return (
    <div className='progress-bar'>
      <span className='progress' style={progressBarStyle}></span>
    </div>
  )
}

ProgressBar.propTypes = {
  percentage: React.PropTypes.string
}

export default ProgressBar
