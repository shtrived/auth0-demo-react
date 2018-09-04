import React from 'react';
import { Container } from 'reactstrap';

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
