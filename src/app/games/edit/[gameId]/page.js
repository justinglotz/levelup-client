'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UpdateGameForm from '../../../../components/game/updateGameForm';
import { getSingleGame } from '../../../../utils/data/gameData';

function UpdateGame({ params }) {
  const [editItem, setEditItem] = useState({});
  const { gameId } = params;

  useEffect(() => {
    getSingleGame(gameId).then((item) => setEditItem({ ...item, id: Number(gameId) }));
  }, [gameId]);

  return (
    <div>
      <UpdateGameForm game={editItem} />
    </div>
  );
}

UpdateGame.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};

export default UpdateGame;
