import React from 'react'
import { injectIntl, defineMessages} from 'react-intl';
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class MenuMenuItemBase extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      menu: {
        id: 'nav.menu',
        description: 'menus',
        defaultMessage: 'Menu',
      },
    });

    return (
      <LinkContainer to="/menu/">
        <Nav.Link>{ formatMessage(messages.menu) }</Nav.Link>
      </LinkContainer>
    )
  }
}

export const MenuMenuItem = injectIntl(MenuMenuItemBase);
