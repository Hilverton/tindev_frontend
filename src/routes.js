import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';
import General from './pages/General';

const categorias = ["likes", "dislikes", "matchs"];

export default function Routes() {
  return (
    <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/dev/:id" component={Main} />
        {categorias.map((cat, id) => {
          return <Route key={id} path={`/${cat}/:id`} component={General} />;
        })}
    </BrowserRouter>
  );
}
