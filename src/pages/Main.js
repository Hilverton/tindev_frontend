import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import api from './../services/api';

import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';
import like from '../assets/like.svg';
import itsAMatch from '../assets/itsamatch.png';

import  './Main.css';

import Header from './../components/Header';

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  //useEffect faz chamada à api; Boa prática não colocar funcionalidades diferentes em uma mesma função
  useEffect(() => {
    //boa prática recomendada pelo react
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: { 
          user: match.params.id 
        }
      })

      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io(api, {
      //parametros adicionais
      query: { user: match.params.id }
    });
    socket.on('match', dev => {
      setMatchDev(dev);
    })
  }, [match.params.id]);

  async function handleLike(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id },
    });

    setUsers(users.filter(user => user._id !== id));
  }

  async function handleDislike(id) {
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id },
    });

    setUsers(users.filter(user => user._id !== id));
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      <Header user={match.params.id} />
      {
        users.length > 0 ? (
          <ul>
            {
              users.map(user => (
                <li key={user._id}>
                  <img src={user.avatar} alt={user.name} />
                  <footer>
                    <strong>{user.name}</strong>
                    <p>{user.bio}</p>
                  </footer>
                  <div className="buttons">
                    <button type="button" onClick={() => handleDislike(user._id)}>
                      <img src={dislike} alt="dislike" />
                    </button>
                    <button type="button" onClick={() => handleLike(user._id)}>
                      <img src={like} alt="like" />
                    </button>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : (
          <div className="empty">Acabou :(</div>
        )
      }
      { matchDev && (
        <div className="match-container">
          <img src={itsAMatch} alt="It's a match" />
          <img className="avatar" src={matchDev.avatar} alt="" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>
          <button type="button" onClick={() => setMatchDev(null)}>Fechar</button>
        </div>
      ) }
    </div>
  );
}
