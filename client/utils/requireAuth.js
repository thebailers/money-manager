import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkAuth } from '../actions/authActions'

export default function (ComposedComponent) {
  class Authenticate extends Component {
    constructor (props) {
      super(props)

      this.state = {
        authorised: false
      }
    }
    componentDidMount () {
      this.props.checkAuth()

      if (!this.props.isAuthenticated) {
        this.context.router.push('/login')
      } else {
        this.setState({ authorised: true })
      }
    }

    componentWillUpdate (nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/login')
      }
    }

    render () {
      if (!this.state.authorised) {
        return <div>Loading...</div>
      }

      return (
        <ComposedComponent {...this.props} />
      )
    }
  }

  const { bool, func, object } = PropTypes

  Authenticate.propTypes = {
    isAuthenticated: bool.isRequired,
    checkAuth: func.isRequired
  }

  Authenticate.contextTypes = {
    router: object.isRequired
  }

  function mapStateToProps (state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps, { checkAuth })(Authenticate)
}
