import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function EventCard({ description, date, time, gameTitle, eventId, onDelete, joined, setEvents }) {
  const router = useRouter();
  const { user } = useAuth();

  const handleEdit = () => {
    router.push(`/events/edit/${eventId}`);
  };

  const handleDelete = () => {
    deleteEvent(eventId).then(onDelete);
  };

  const handleJoin = () => {
    joinEvent(eventId, user.uid, setEvents);
  };

  const handleLeave = () => {
    leaveEvent(eventId, user.uid, setEvents);
  };

  return (
    <Card className="text-center">
      <Card.Header>{description}</Card.Header>
      <Card.Body>
        <Card.Text>Date: {date}</Card.Text>
        <Card.Text>Time: {time}</Card.Text>
        <Card.Text>Game Title: {gameTitle}</Card.Text>
        <Button onClick={handleEdit} className="mx-2">
          Edit
        </Button>
        {joined ? (
          <Button onClick={handleLeave} variant="warning">
            Leave
          </Button>
        ) : (
          <Button onClick={handleJoin} variant="success">
            Join
          </Button>
        )}
        <Button className="mx-2" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  gameTitle: PropTypes.string.isRequired,
  eventId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  joined: PropTypes.bool.isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default EventCard;
