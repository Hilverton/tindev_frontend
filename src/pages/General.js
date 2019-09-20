import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from './../services/api';

import  './General.css';
import logo from '../assets/logo.svg';
import dislike from '../assets/dislike.svg';

import Header from './../components/Header';

export default function General({ match, location }) {
    const { id } = match.params;
    const [options, setOptions] = useState([]);
    const route = location.state.option;
    const buttonActive = route !== 'matchs' ? true : false;
    
    useEffect(() => {
        async function loadGenerals() {
            const response = await api.get(`/${route}`, {
                headers: { 
                    user: match.params.id
                }
            })

            setOptions(response.data);
        }

        loadGenerals();
    },[match.params.id, route, options]);

    async function handleClick(id) {
        const response = await api.post(`/devs/${id}/remove-${route}`, null, {
            headers: { user: match.params.id },
        });
        console.log('Dados depois do click',response.data);
        setOptions(response.data);
    }
    
  return (
    <div className="generals-container">
        <Link to={`/dev/${match.params.id}`}>
            <img src={logo} alt="Tindev" />
        </Link>
        <Header user={id} />
        {
            options.length > 0 ? (
            <ul>
                {
                options.map(viewMatch => (
                    <li key={viewMatch._id}>
                        <img src={viewMatch.avatar} alt={viewMatch.name} />
                        <footer>
                            <strong>{viewMatch.name}</strong>
                            <p>{viewMatch.bio}</p>
                        </footer>
                        {
                            buttonActive && (
                                <div className="buttons">
                                    <button type="button" onClick={() => handleClick(viewMatch._id)}>
                                        <img src={dislike} alt="dislike" />
                                    </button>
                                </div>
                            )
                        }
                    </li>
                ))
                }
            </ul>
            ) : (
            <div className="empty">Acabou :(</div>
            )
        }
    </div>
  );
}
