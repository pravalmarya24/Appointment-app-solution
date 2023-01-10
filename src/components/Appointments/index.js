import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

// Write your code here
class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', isTrue: false}

  onAddTitle = event => {
    console.log(event.target.value)
    this.setState({title: event.target.value})
  }

  onAddDate = event => {
    console.log(event.target.value)
    this.setState({date: event.target.value})
  }

  onlyShowStaredList = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isActive: !each.isActive}
        }
        return each
      }),
    }))
  }

  onStarredFilteredList = () => {
    const {appointmentList, isTrue} = this.state
    const filteredList = appointmentList.filter(each => each.isActive === true)
    const displayList = !isTrue ? filteredList : appointmentList
    console.log(displayList)

    this.setState({appointmentList: displayList})
  }

  addAppointmentList = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointmentListAdd = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isActive: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointmentListAdd],
      title: '',
      date: '',
    }))
  }

  render() {
    const {appointmentList, title, date} = this.state
    return (
      <div className="appointment-bg-container">
        <div className="form-card-container">
          <div className="form-image-container">
            <form className="form-container" onSubmit={this.addAppointmentList}>
              <h1 className="appointment-heading">Add Appointment</h1>
              <label className="label-title" htmlFor="inputEleId">
                Title
              </label>
              <br />
              <input
                type="text"
                placeholder="Title"
                className="title-input-ele"
                id="inputEleId"
                onChange={this.onAddTitle}
                value={title}
              />
              <br />
              <label className="label-date" htmlFor="inputDateEle">
                Date
              </label>
              <br />
              <input
                type="date"
                className="date-input-ele"
                id="inputDateEle"
                onChange={this.onAddDate}
                value={date}
              />
              <br />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <div className="appointment-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-img-size"
              />
            </div>
          </div>
          <hr className="horizon-line" />
          <div className="appointment-stared-container">
            <h1 className="appointment-para">Appointments</h1>
            <button
              className="star-btn"
              type="button"
              onClick={this.onStarredFilteredList}
            >
              Starred
            </button>
          </div>
          <ul className="unordered-list">
            {appointmentList.map(eachAppList => (
              <AppointmentItem
                appointmentItemsList={eachAppList}
                key={eachAppList.id}
                onlyShowStaredList={this.onlyShowStaredList}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
