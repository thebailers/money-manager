import React, { Component } from 'react'
import TextFieldGroup from './common/TextFieldGroup'
import validateInput from '../../server/shared/validation/login'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  isValid () {
    const { errors, isValid } = validateInput(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  onSubmit (e) {
    e.preventDefault()
    if (this.isValid()) {

    }
  }

  render () {
    const { errors } = this.state
    return (
      <form className="loginform" onSubmit={this.onSubmit}>
        <TextFieldGroup
          error={errors.username}
          label='Username'
          onChange={this.onChange}
          value={this.state.username}
          field='username'
        />

        <TextFieldGroup
          error={errors.password}
          label='Password'
          onChange={this.onChange}
          value={this.state.password}
          field='password'
          type='password'
        />

        <div>
          <button className='btn-primary'>Login</button>
        </div>
      </form>
    )
  }

}

export default LoginForm
