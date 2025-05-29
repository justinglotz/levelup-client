import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { deleteGame } from '../../utils/data/gameData';

function GameCard({
  title, //
  maker,
  numberOfPlayers,
  skillLevel,
  gameId,
  onDelete,
}) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/games/edit/${gameId}`);
  };

  const handleDelete = () => {
    deleteGame(gameId).then(onDelete);
  };
  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
        <Button onClick={handleEdit}>Edit</Button>
        <Button className="mx-2" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
    </Card>
  );
}

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  gameId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GameCard;
