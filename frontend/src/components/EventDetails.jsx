import { useEventsContext } from '../hooks/useEventsContext'
import { useAuthContext } from '../hooks/useAuthContext'
// to make the date appear (we used date fns)
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { FaRegTrashAlt } from 'react-icons/fa'

const EventDetails = ({ event }) => {
  const { dispatch } = useEventsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {

    if (!user) {
      return 
    }
    const response = await fetch('/api/events/' + event._id, {

      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_EVENT', payload: json})
    }


  }
  return (
    <div className="event-details">
      <h4>{event.title}</h4>
      <p><strong>Hours: </strong>{event.hours}</p>
      <p><strong>Load: </strong>{event.load}</p>
      <p>{formatDistanceToNow(new Date(event.createdAt), { addsuffix: true}) + " ago"}</p>
      {user && user.role === "organizer" && (
        <span className="delete-icon" onClick={handleClick}>
          <FaRegTrashAlt />
        </span>
      )}
    </div>
  )
}

export default EventDetails
