import './index.css'

// Write your code here
const AppointmentItem = props => {
  const {appointmentItemsList, onlyShowStaredList} = props
  const {title, date, id, isActive} = appointmentItemsList

  const changeImage = isActive
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onFilterStaredAppointment = () => {
    onlyShowStaredList(id)
  }

  return (
    <li className="appointment-list-container">
      <div className="title-date-card-container">
        <div className="card-description-container">
          <p className="card-title-heading">{title}</p>
          <p className="card-date-para">{`Date: ${date}`}</p>
        </div>
        <div className="star-container">
          <button
            className="star-button"
            type="button"
            data-testid="star"
            onClick={onFilterStaredAppointment}
          >
            <img src={changeImage} alt="star" className="star-img-size" />
          </button>
        </div>
      </div>
    </li>
  )
}

export default AppointmentItem
