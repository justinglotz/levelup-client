import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

function EventCard({ description, date, time, gameTitle, eventId }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/events/edit/${eventId}`);
  };

  return (
    <Card className="text-center">
      <Card.Header>{description}</Card.Header>
      <Card.Body>
        <Card.Text>Date: {date}</Card.Text>
        <Card.Text>Time: {time}</Card.Text>
        <Card.Text>Game Title: {gameTitle}</Card.Text>
        <Button onClick={handleEdit}>Edit</Button>
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
};

export default EventCard;
