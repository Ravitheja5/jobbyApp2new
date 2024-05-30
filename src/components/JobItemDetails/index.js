import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import SkillBox from '../SkillBox'

import Loader from 'react-loader-spinner'

import './index.css'

const initialValues = {
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failue: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {jobDetailes: {}, apiStatus: initialValues.progress}

  componentDidMount() {
    console.log('component did mount')
    this.getData()
  }

  getData = async () => {
    console.log('getData')
    const {match} = this.props
    const {params} = match
    const {id} = params

    console.log(id)

    const url = `https://apis.ccbp.in/jobs/${id}`

    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data1 = await response.json()

      const data = data1.job_details

      const updatedSkills = data.skills.map(object => ({
        imageUrl: object.image_url,
        name: object.name,
      }))

      const updatedData = {
        companyLogoUrl: data.company_logo_url,
        employementType: data.employment_type,
        id: data.id,
        jobDescription: data.job_description,
        location: data.location,
        packagePerAnnum: data.package_per_annum,
        rating: data.rating,
        title: data.title,
        lifeAtCompany: {
          jobDescription: data.life_at_company.description,
          imageUrl: data.life_at_company.image_url,
        },
        skills: [...updatedSkills],
      }

      console.log('data', data)
      console.log('updated data', updatedData)

      this.setState({
        jobDetailes: updatedData,
        apiStatus: initialValues.success,
      })
    } else {
      this.setState({apiStatus: initialValues.failue})
    }
  }

  onClickRetry = () => {
    this.getData()
  }

  renderSuccessView = () => {
    const {jobDetailes} = this.state
    const {
      companyLogoUrl,
      location,
      employementType,
      id,
      jobDescription,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobDetailes
    console.log('job detaile in render', jobDetailes)
    console.log('skillsinrender', jobDetailes.skills)
    console.log('life at company in render', jobDetailes.lifeAtCompany)
    return (
      <div className="bg-container">
        <Header />
        <div className="jobcard-container">
          <div className="icon-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="role-container">
              <p className="role">{title}</p>

              <div className="rating-container">
                <i className="bi bi-star-fill" />

                <p className="rating-number">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-container">
            <div className="location-boxes">
              <i className="bi bi-geo-alt-fill" />

              <p className="location">{location}</p>

              <i className="bi bi-briefcase-fill"></i>

              <p className="location">{employementType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr />
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>

          <div className="skills-container">
            {skills.map(eachObject => (
              <SkillBox skillsData={eachObject} key={eachObject.name} />
            ))}
          </div>

          <div className="life-at-company-container">
            <div className="description-box">
              <h1 className="heading">Life at Company</h1>
              <p className="description">{lifeAtCompany.jobDescription}</p>
            </div>

            <img
              src={lifeAtCompany.imageUrl}
              alt="company image"
              className="company-name"
            />
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <>
      <Header />
      <div className="fail-box">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="ailure view"
          className="fail-image"
        />
        <h1>Oops Something Went Wrong</h1>
        <p>We cannot seen to find the page you are looking for.</p>
        <button
          onClick={this.onClickRetry}
          type="button"
          className="retry-button"
        >
          Retry
        </button>
      </div>
    </>
  )

  renderProgressView = () => (
    <>
      <Header />
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </>
  )

  renderBasedOnTheApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case initialValues.progress:
        return this.renderProgressView()
        break
      case initialValues.success:
        return this.renderSuccessView()
        break
      case initialValues.failue:
        return this.renderFailureView()
    }
  }

  render() {
    {
      return this.renderBasedOnTheApiStatus()
    }
  }
}

export default JobItemDetails
