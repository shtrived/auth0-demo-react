import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

function Callback() {
  return (
    <Dimmer active inverted>
      <Loader inverted>Loading...</Loader>
    </Dimmer>
  );
}

export default Callback;
