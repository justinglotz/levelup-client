'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UpdateEventForm from '../../../../components/event/updateEventForm';
import { getSingleEvent } from '../../../../utils/data/eventData';

function UpdateEvent({ params }) {
  const [editItem, setEditItem] = useState({});
  const { eventId } = params;

  useEffect(() => {
    getSingleEvent(eventId).then((item) => setEditItem({ ...item, id: Number(eventId) }));
  }, [eventId]);

  return (
    <div>
      <UpdateEventForm event={editItem} />
    </div>
  );
}

UpdateEvent.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};

export default UpdateEvent;
