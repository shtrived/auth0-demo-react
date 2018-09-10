import React from 'react';
import { Container } from 'reactstrap';

import Callback from '../Callback';
import RouteCallback from '../../components/shared/RouteCallback';

function LayoutEmpty(props) {
  return (
    <Container>
      <RouteCallback path="/callback" component={Callback} exact />
    </Container>
  );
}

export default LayoutEmpty;
