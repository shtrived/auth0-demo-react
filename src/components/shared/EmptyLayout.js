import React from 'react';
import { Container } from 'semantic-ui-react';

import Callback from '../Callback';
import CallbackRoute from '../../services/CallbackRoute';

function EmptyLayout(props) {
  return (
    <Container>
      <CallbackRoute path="/callback" component={Callback} exact />
    </Container>
  );
}

export default EmptyLayout;
