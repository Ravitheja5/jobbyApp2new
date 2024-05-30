import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  fail: 'FAIL',
}
class Login extends Component {
  state = {
    apiStatus: constants.initial,
    inputUserValue: '',
    inputPasswordValue: '',
    errorMessage: '',
  }

  onChangeUserName = event => {
    this.setState({inputUserValue: event.target.value})
  }

  onChangePassword = event => {
    this.setState({inputPasswordValue: event.target.value})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {inputUserValue, inputPasswordValue} = this.state
    const userDetails = {
      username: inputUserValue,
      password: inputPasswordValue,
    }

    const logInUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(logInUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      console.log(Cookies.get('jwt_token'))
      this.setState({apiStatus: constants.success})
      const {history} = this.props

      history.replace('/')
    } else {
      console.log(response)
      this.setState({
        apiStatus: constants.fail,
        errorMessage: 'Username is not found',
      })
    }
  }

  render() {
    const {inputUserValue, inputPasswordValue, apiStatus, errorMessage} =
      this.state
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label className="label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            className="user-input"
            placeholder="Username"
            id="username"
            onChange={this.onChangeUserName}
            value={inputUserValue}
          />

          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            className="user-input"
            placeholder="Password"
            id="password"
            onChange={this.onChangePassword}
            value={inputPasswordValue}
          />

          {apiStatus === constants.fail && (
            <p className="error_msg">{errorMessage}</p>
          )}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
