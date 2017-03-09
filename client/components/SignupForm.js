import React, { Component } from 'react'
import TextFieldGroup from './common/TextFieldGroup'
import validateInput from '../../server/shared/validation/register'
import { connect } from 'react-redux'
import { register } from '../actions/authActions'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      repeatedPassword: '',
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

      const { firstname, lastname, username, email, password } = this.state
      const user = { firstname, lastname, username, email, password }

      this.props.register(user)
        .then(
          (res) => {
            this.props.addFlashMessage({
              type: 'success',
              text: 'Success!'
            })
            this.context.router.push('/login')
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
          error={errors.firstname}
          label='First Name'
          onChange={this.onChange}
          value={this.state.firstname}
          field='firstname'
        />

        <TextFieldGroup
          error={errors.lastname}
          label='Last Name'
          onChange={this.onChange}
          value={this.state.lastname}
          field='lastname'
        />

        <TextFieldGroup
          error={errors.username}
          label='Username'
          onChange={this.onChange}
          value={this.state.username}
          field='username'
        />

        <TextFieldGroup
          error={errors.email}
          label='Email'
          onChange={this.onChange}
          value={this.state.email}
          field='email'
        />

        <TextFieldGroup
          error={errors.password}
          label='Password'
          onChange={this.onChange}
          value={this.state.password}
          field='password'
          type='password'
        />
        <TextFieldGroup
          error={errors.repeatedPassword}
          label='Repeat Password'
          onChange={this.onChange}
          value={this.state.repeatedPassword}
          field='repeatedPassword'
          type='password'
        />

        <div>
          <button className='button large orange login' disabled={isLoading}>Sign Up</button>
        </div>
      </form>
    )
  }

}

LoginForm.propTypes = {
  register: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(null, { register })(LoginForm)
