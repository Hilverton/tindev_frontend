import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export default function Header({ user }) {
  return (
    <div className="header">
        <ul>
            <Link 
              to={{
                pathname: `/likes/${user}`,
                state: {
                  option: 'likes'
                }
              }} 
              className="link"
            >
                <li className="item-header">Likes</li>
            </Link>
            <Link to={{
                pathname: `/dislikes/${user}`,
                state: {
                  option: 'dislikes'
                }
              }} className="link"
            >
                <li className="item-header">Dislikes</li>
            </Link>
            <Link to={{
                pathname: `/matchs/${user}`,
                state: {
                  option: 'matchs'
                }
              }} className="link">
                <li className="item-header">Match</li>
            </Link>
        </ul>
    </div>
  );
}
