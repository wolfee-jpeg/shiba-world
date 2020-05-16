import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  openMenu as openMenuAction,
  closeMenu as closeMenuAction
} from '../../modules/app'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Drawer,
  Button,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
  Divider
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import * as routes from '../../routes'
import withAuthProfile from '../../hocs/withAuthProfile'
import Searchbar from '../../components/searchbar'

const navItems = [
  {
    label: 'Home',
    url: routes.home,
    icon: ''
  },
  {
    label: 'Browse',
    url: routes.browse
  },
  {
    label: 'Upload',
    url: routes.createAsset,
    requiresAuth: true
  },
  {
    label: 'Your Account',
    url: routes.myAccount,
    requiresAuth: true
  },
  {
    label: 'Login',
    url: routes.login,
    requiresNotAuth: true
  },
  {
    label: 'Sign Up',
    url: routes.signUp,
    requiresNotAuth: true
  },
  {
    label: 'Logout',
    url: routes.logout,
    requiresAuth: true
  }
]

const useStyles = makeStyles({
  header: {
    padding: '1rem 1rem',
    borderBottom: '1px solid #260b36',
    marginBottom: '4rem',
    background: 'linear-gradient(20deg, #6e4a9e, #240b36)',
    '@media (min-width: 600px)': {
      padding: '2rem 2rem'
    }
  },
  gridColSearchbar: {
    '@media (max-width: 959px)': {
      order: '3'
    }
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '600',
    lineHeight: '1.2',
    textDecoration: 'none !important',
    color: 'white',
    display: 'block',
    padding: '1rem',
    textTransform: 'uppercase',
    '@media (min-width: 960px)': {
      padding: '1rem 0'
    }
  },
  menuToggleIcon: {
    width: '4rem',
    height: '3rem',
    fill: 'white'
  },
  menuList: {
    width: '280px'
  },
  menuListLink: {
    color: 'inherit',
    textDecoration: 'none'
  },
  listItemIcon: {
    color: '#240b36'
  },
  menuItemLink: {
    display: 'block',
    width: '100%',
    height: '100%'
  }
})

const NavigationLink = props => {
  const classes = useStyles()
  return <Link {...props} className={classes.menuItemLink} />
}

const DrawerContainer = withAuthProfile(({ auth, isMenuOpen, closeMenu }) => {
  const classes = useStyles()
  const isLoggedIn = auth.isLoaded ? !!auth.uid : null
  return (
    <Drawer anchor="right" open={isMenuOpen} onClose={() => closeMenu()}>
      <MenuList className={classes.menuList}>
        <MenuItem>VRC Arena</MenuItem>
      </MenuList>
      <Divider />
      <MenuList className={classes.menuList}>
        {navItems.map(({ label, url, requiresAuth, requiresNotAuth }) =>
          (requiresAuth === true && !isLoggedIn) ||
          (requiresNotAuth === true && isLoggedIn) ? null : (
            <MenuItem button key={url} onClick={() => closeMenu()}>
              <NavigationLink
                className={classes.menuListLink}
                color="primary"
                variant="inherit"
                to={url}>
                <Typography component="div" style={{ display: 'flex' }}>
                  <ListItemIcon className={classes.listItemIcon}>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  {label}
                </Typography>
              </NavigationLink>
            </MenuItem>
          )
        )}
      </MenuList>
    </Drawer>
  )
})

const PageHeader = ({ isMenuOpen, openMenu, closeMenu }) => {
  const classes = useStyles()

  return (
    <header className={classes.header}>
      <Grid container>
        <Grid item xs={8} md={4} lg={4} align="left">
          <Link to={routes.home} className={classes.logo}>
            VRC Arena
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          className={classes.gridColSearchbar}
          align="center">
          <Searchbar />
        </Grid>
        <Grid item xs={4} md={2} lg={4} align="right">
          <Button onClick={() => openMenu()}>
            <MenuIcon className={classes.menuToggleIcon} />
            <span hidden>Menu</span>
          </Button>
        </Grid>
      </Grid>
      <DrawerContainer closeMenu={closeMenu} isMenuOpen={isMenuOpen} />
    </header>
  )
}

const mapStateToProps = ({ app: { isMenuOpen } }) => ({
  isMenuOpen
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openMenu: openMenuAction,
      closeMenu: closeMenuAction
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeader)
