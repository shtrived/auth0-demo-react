import React from 'react';

import FormChangePassword from './shared/FormChangePassword';

function Home() {
  return (
    <React.Fragment>
      <h2>Form</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem.
      </p>
      <FormChangePassword />
    </React.Fragment>
  );
}

export default Home;
