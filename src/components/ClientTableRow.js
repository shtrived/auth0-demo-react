import React from 'react';
import { Header, Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const propTypes = {
  client_id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  app_type: PropTypes.string
};

function ClientTableRow(props) {
  const { client_id, name, description, app_type } = props;
  return (
    <Table.Row key={client_id.toString()}>
      <Table.Cell>
        <Header as="h4">
          <Icon name="window maximize outline" size="mini" />
          <Header.Content>
            {name}
            <Header.Subheader>{app_type}</Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell>{client_id}</Table.Cell>
    </Table.Row>
  );
}

ClientTableRow.propTypes = propTypes;

export default ClientTableRow;
