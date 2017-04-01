import React, { Component } from 'react'

class ArchivedData extends Component {
  render () {
    return (
      <div>
        Placeholder: time to add in the data for {this.props.params.month} {this.props.params.year}
      </div>
    )
  }
}

ArchivedData.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default ArchivedData
