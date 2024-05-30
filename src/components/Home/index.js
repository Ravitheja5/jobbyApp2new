import {Redirect} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFindJob = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="home-container">
      <Header />
      <div className="home-description-container">
        <h1 className="main-heading">
          Find The Job That
          <br /> Fits Your Life
        </h1>
        <p className="description">
          Million of people are searching fro jobs, salary <br />
          information.company reviews. Find the job that fits your
          <br /> abilities and potential.
        </p>
        <button className="find-jonbs-button" onClick={onClickFindJob}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}
export default Home
