'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '@/utils/data/gameData';
import { updateEvent } from '@/utils/data/eventData';

function UpdateEventForm({ event }) {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    description: '',
    date: '',
    time: '',
    gameId: '',
  });
  const router = useRouter();

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, [currentEvent]);

  useEffect(() => {
    if (event) {
      setCurrentEvent({
        description: event.description || '',
        date: event.date || '',
        time: event.time || '',
        gameId: event.game?.id || '',
        id: event.id,
        organizer: event.organizer,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const updatedEvent = {
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      game: Number(currentEvent.gameId),
      id: currentEvent.id,
      organizer: currentEvent.organizer.id,
    };
    console.log('Updated event:', updatedEvent);
    // Send PUT request to your API
    updateEvent(updatedEvent).then(() => router.push('/events'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control name="date" required value={currentEvent.date} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Time</Form.Label>
        <Form.Control name="time" required value={currentEvent.time} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Game</Form.Label>
        <Form.Select name="gameId" value={currentEvent.gameId} aria-label="Default select example" onChange={handleChange}>
          <option>Select a Game...</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

UpdateEventForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  event: PropTypes.shape({
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    game: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    organizer: PropTypes.number.isRequired,
  }),
};

export default UpdateEventForm;
