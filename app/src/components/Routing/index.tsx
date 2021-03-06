import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../Layout';
import { routes } from '~dictionaries/state';

const Routing = (): ReactElement =>
  <Switch>
    {routes.map(({ path, component }) => <Route exact key={path} path={path}
      component={component}/>)}
    <Route component={Layout}/>
  </Switch>;

export default Routing;
