'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateGame, getGameTypes } from '@/utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

function UpdateGameForm({ game }) {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then((data) => setGameTypes(data));
  }, []);

  useEffect(() => {
    if (game) {
      setCurrentGame({
        title: game.title || '',
        maker: game.maker || '',
        numberOfPlayers: game.number_of_players,
        skillLevel: game.skill_level,
        gamerId: game.gamer?.id,
        gameTypeId: game.game_type?.id,
        id: game.id,
      });
    }
  }, [game]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log('name:', name);
    console.log('value:', value);
    console.log('current game:', currentGame);
  };

  console.log('game', game);
  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const updatedGame = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      id: currentGame.id,
    };

    console.log('game being sent for update:', game);

    // Send PUT request to your API
    updateGame(updatedGame).then(() => router.push('/games'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Maker</Form.Label>
        <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Number of Players</Form.Label>
        <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Skill Level</Form.Label>
        <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Game Type</Form.Label>
        <Form.Select name="gameTypeId" aria-label="Default select example" value={currentGame.gameTypeId} onChange={handleChange}>
          <option>Select a Game Type...</option>
          {gameTypes.map((gameType) => (
            <option value={gameType.id}>{gameType.label}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

UpdateGameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
    maker: PropTypes.string.isRequired,
    number_of_players: PropTypes.number.isRequired,
    skill_level: PropTypes.number.isRequired,
    gamer: PropTypes.number.isRequired,
    game_type: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default UpdateGameForm;
