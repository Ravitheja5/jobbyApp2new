import {withRouter, Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
    console.log(Cookies.get('jwt_token'))
  }

  return (
    <nav className="nav-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <div className="box">
        <Link to="/">
          {' '}
          <p className="para">Home</p>{' '}
        </Link>
        <Link to="/jobs">
          {' '}
          <p className="para">Jobs</p>{' '}
        </Link>
      </div>
      <button className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
