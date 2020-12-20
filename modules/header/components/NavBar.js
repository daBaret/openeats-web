import React from 'react'
import { Link } from 'react-router-dom'
import { injectIntl, defineMessages } from 'react-intl';
import { Image, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { CreateRecipeMenuItem } from './CreateRecipeMenuItem'
import { GroceryListMenuItem } from './GroceryListMenuItem'
import { MenuMenuItem } from './MenuMenuItem'
import { AccountMenuMenuItem, AccountLoginMenuItem } from './MyAccountMenuItem'


class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.listActions.load();
    }
  }

  componentWillReceiveProps(nextProps) {
    // We need to check if the state is being changed from `false` to `true`.
    // If it is we need to init the list store so the menu has teh users lists.
    if (this.hasOwnProperty('state')) {
      if (!this.state.authenticated && !!nextProps.user.id) {
        this.props.listActions.load();
        this.setState({ authenticated: true})
      }
    }
  };

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      brand: {
        id: 'nav.brand',
        description: 'Open Eats title',
        defaultMessage: 'Open Eats',
      },
      recipes: {
        id: 'nav.recipes',
        description: 'Navbar Recipes',
        defaultMessage: 'Browse',
      },
      randomRecipe: {
        id: 'nav.randomRecipe',
        description: 'Random Recipe',
        defaultMessage: 'Random',
      },
    });

    return (
      <Navbar collapseOnSelect bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">
            <Image alt="Brand" src="/images/chef.png" responsive={ true } />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <LinkContainer to="/browse">
              <Nav.Link>{formatMessage(messages.recipes)}</Nav.Link>
            </LinkContainer>
            <Nav.Link onClick={ this.props.randomRecipeActions.randomRecipe }>
              {formatMessage(messages.randomRecipe)}
            </Nav.Link>
            {( this.props.user.id ?
                <MenuMenuItem/> : null
            )}
            {( this.props.user.id  ?
                <CreateRecipeMenuItem/> : null
            )}
            {( this.props.user.id ?
                <GroceryListMenuItem data={ this.props.lists }/> : null
            )}
          </Nav>
          <Nav pullRight>
            {( this.props.user.id  ?
                <AccountMenuMenuItem authActions={ this.props.authActions }/> :
                <AccountLoginMenuItem/>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default injectIntl(NavBar);
