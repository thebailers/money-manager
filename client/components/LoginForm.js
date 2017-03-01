import React, { Component } from 'react'
import TextFieldGroup from './common/TextFieldGroup'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()
  }

  render () {
    return (
      <form className="loginform" onSubmit={this.onSubmit}>
        <TextFieldGroup
          label='Username'
          onChange={this.onChange}
          value={this.state.username}
          field='username'
        />

        <TextFieldGroup
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
