import {withRouter, Link} from 'react-router-dom'

import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'

const JobCard = props => {
  const {object} = props
  const {
    companyLogourl,
    employementType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = object

  return (
    <Link to={`/jobs/${id}`}>
      {' '}
      <li className="jobcard-container">
        <div className="icon-container">
          <img
            src={companyLogourl}
            alt="company logo"
            className="company-logo"
          />
          <div className="role-container">
            <p className="role">{title}</p>

            <div className="rating-container">
              <i className="bi bi-star-fill"></i>

              <p className="rating-number">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-container">
          <div className="location-boxes">
            <i className="bi bi-geo-alt-fill"></i>

            <p className="location">{location}</p>

            <i className="bi bi-briefcase-fill"></i>

            <p className="location">{employementType}</p>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default withRouter(JobCard)
