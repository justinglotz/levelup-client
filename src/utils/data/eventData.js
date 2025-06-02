import { clientCredentials } from '../client';

const getEvents = (uid) =>
  // eslint-disable-next-line no-new
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events`, {
      headers: {
        Authorization: uid,
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const createEvent = (event) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateEvent = (event) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then((response) => resolve(response))
      .catch(reject);
  });

const getSingleEvent = (eventId) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteEvent = (eventId) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => resolve(response))
      .catch(reject);
  });

const leaveEvent = (eventId, uid, setEvents) => {
  // Make a delete request deleting user and event relationship in database IN EVENTGAMER
  // Backend will read through the rows of the table and give back a true or false for whether the user has joined the event or not
  fetch(`${clientCredentials.databaseURL}/events/${eventId}/leave`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify({}),
  })
    .then(() => getEvents(uid))
    .then(setEvents);
};

const joinEvent = (eventId, uid, setEvents) => {
  // Make a post request to add the user and event relationship in the database
  fetch(`${clientCredentials.databaseURL}/events/${eventId}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify({}),
  })
    .then(() => getEvents(uid))
    .then(setEvents);
};
// eslint-disable-next-line import/prefer-default-export
export { getEvents, createEvent, updateEvent, getSingleEvent, deleteEvent, joinEvent, leaveEvent };
