import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { isAuthenticated } from './common/wcp/WcpAuthorization';

import Authorize from './common/components/Authorize';
import ErrorNotAuthenticated from './common/components/ErrorNotAuthenticated';
import ErrorNotFound from './common/components/ErrorNotFound';
import GoogleApiWrapper from './common/components/Map/Map.js';

const AppRoutes = () => {

  

  return (
    <Switch>
      <Route exact={true} path="/" component={isAuthenticated() ? GoogleApiWrapper : ErrorNotAuthenticated} />
      <Route path="/authorize" component={Authorize} />
      
      <Route component={ErrorNotFound} />
    </Switch>
  );
};

export default AppRoutes;


//Route path="/generate-map" component={isAuthenticated() ? : ErrorNotAuthenticated} />

//