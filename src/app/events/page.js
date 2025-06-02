'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import EventCard from '../../components/event/eventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEvents(user.uid).then((data) => setEvents(data));
  }, [user.uid]);

  const onDelete = () => {
    getEvents().then((data) => setEvents(data));
  };

  return (
    <article className="events">
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard description={event.description} date={event.date} time={event.time} gameTitle={event.game.title} eventId={event.id} onDelete={onDelete} joined={event.joined} setEvents={setEvents} />
        </section>
      ))}
    </article>
  );
}

export default Home;
