'use client';

import EventForm from '../../../components/event/eventForm';
import { useAuth } from '../../../utils/context/authContext';

function NewEvent() {
  const { user } = useAuth();
  return (
    <div>
      <h2>Register New Event</h2>
      <EventForm user={user} />
    </div>
  );
}

export default NewEvent;
