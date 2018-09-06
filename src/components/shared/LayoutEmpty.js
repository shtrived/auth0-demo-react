import React from 'react';
import { Container } from 'reactstrap';

import Callback from '../Callback';
import RouteCallback from '../../services/RouteCallback';

function LayoutEmpty(props) {
  return (
    <Container>
      <RouteCallback path="/callback" component={Callback} exact />
    </Container>
  );
}

export default LayoutEmpty;
