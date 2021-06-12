import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import CriarPrestador from './pages/CriarPrestador';
import CriarAvaliacao from './pages/CriarAvaliacao';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/prestadores/criar" exact component={CriarPrestador} />
        <Route path="/avaliacoes/criar/:id" exact component={CriarAvaliacao} />
      </Switch>
    </BrowserRouter>
  );
}
