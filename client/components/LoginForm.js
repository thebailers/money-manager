import React, { Component } from 'react'
import TextFieldGroup from './common/TextFieldGroup'
import validateInput from '../../server/shared/validation/login'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import { addFlashMessage } from '../actions/flashMessages'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false
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
      this.setState({ errors: {}, isLoading: true })
      this.props.login(this.state)
        .then(
          (res) => {
            this.props.addFlashMessage({
              type: 'success',
              text: 'Welcome back!'
            })
            this.context.router.push('/')
          },
          (err) => this.setState({ errors: err.data.errors, isLoading: false })
        )
    }
  }

  render () {
    const { errors, isLoading } = this.state
    return (
      <form className="loginform" onSubmit={this.onSubmit}>

        {errors.form && <div className='alert error'>{errors.form}</div>}

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
          <button className='button large orange login' disabled={isLoading}>Login</button>
        </div>
      </form>
    )
  }

}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { login, addFlashMessage })(LoginForm)
