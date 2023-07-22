import React, { useState, useEffect } from 'react';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import { Link, useParams } from 'react-router-dom';

const NotePage = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState({ body: '' });

  useEffect(() => {
    getNote();
  }, [noteId]);

  const getNote = async () => {
    if (noteId === 'new') return;

    const response = await fetch(`/api/notes/${noteId}/`);
    const data = await response.json();
    setNote(data);
  };

  const createNote = async () => {
    await fetch(`/api/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  };

  const updateNote = async () => {
    await fetch(`/api/notes/${noteId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  };

  const deleteNote = async () => {
    await fetch(`/api/notes/${noteId}/`, {
      method: 'DELETE',
    });
  };

  const handleSubmit = () => {
    if (noteId !== 'new' && note.body === '') {
      deleteNote();
    } else if (noteId !== 'new') {
      updateNote();
    } else if (noteId === 'new' && note.body !== '') {
      createNote();
    }
    window.location.href = '/';
  };

  const handleChange = (event) => {
    setNote({ ...note, body: event.target.value });
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      {note && (
        <div className="note-body">
          <textarea value={note.body} onChange={handleChange}></textarea>
        </div>
      )}
    </div>
  );
};

export default NotePage;
