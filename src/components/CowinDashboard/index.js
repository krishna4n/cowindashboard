import {Component} from 'react'
import {Loader} from 'react-loader-spinner'
import './index.css'

class DashBoard extends Component {
  state = {vaccinationDetails: [], loadingStatus: 'INITIAL'}

  getStatus = {
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

  componentDidMount() {
    this.getApiData()
  }

  failedView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  getLoadingStatus = () => {
    const {loadingStatus} = this.state

    switch (loadingStatus) {
      case this.getStatus.loading:
        this.loadingView()
        break
      case this.getStatus.failure:
        this.failedView()
        break
      case this.getStatus.success:
        this.successView()
        break

      default:
        break
    }
  }

  successView = () => <div className="temp">fjdklsajfkldsjakfjdsa</div>

  getApiData = async () => {
    this.setState({
      loadingStatus: this.getLoadingStatus.loading,
    })
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(covidVaccinationDataApiUrl)
    if (response.ok) {
      const data = await response.json()
      this.setState({
        loadingStatus: this.getLoadingStatus.success,
        vaccinationDetails: {
          last7daysVaccination: data.last_7_days_vaccination,
          vaccinationByAge: data.vaccination_by_age,
          vaccinationByGender: data.vaccination_by_gender,
        },
      })
    } else {
      this.setState({
        loadingStatus: this.getLoadingStatus.failure,
      })
    }
  }

  render() {
    const {vaccinationDetails} = this.state
    console.log(vaccinationDetails)
    return (
      <div className="dashboard-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png "
            alt="websie logo"
            className="logo"
          />
          <h1 className="logo-name">Co-Win</h1>
        </div>
        <h1 className="dashboard-heading">CoWin Vaccination in India</h1>
        {this.getLoadingStatus()}
      </div>
    )
  }
}

export default DashBoard
