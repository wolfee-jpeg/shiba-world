import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { connect } from 'react-redux'
import Home from '../home'
import Login from '../login'
import Logout from '../logout'
import BrowseAssets from '../browse-all'
import PageHeader from '../../components/header'
import PageFooter from '../../components/footer'
import CreateAsset from '../create-asset'
import EditAsset from '../edit-asset'
import ViewAsset from '../view-asset'
import MyAccount from '../my-account'
import Admin from '../admin'
import PrivacyPolicy from '../privacy-policy'
import * as routes from '../../routes'
import SearchResults from '../../components/search-results'

const RouteWithMeta = ({ meta, ...routeProps }) => {
  useEffect(() => {
    document.title = `${meta.title} &mdash; VRC Arena`

    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', meta.description)
  }, [meta])

  return <Route {...routeProps} />
}

const App = ({ searchTerm }) => (
  <>
    <PageHeader />
    <main className="main">
      <Container maxWidth="lg">
        <SearchResults />

        {!searchTerm && (
          <Switch>
            <RouteWithMeta
              exact
              path={routes.home}
              component={Home}
              meta={{
                title:
                  'Browse and upload assets for the different species of VRChat',
                description:
                  'Download and upload various kinds of assets for various species found in the online multiplayer VR social game VRChat.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.login}
              component={Login}
              meta={{
                title: 'Log in to manage assets',
                description:
                  'Use the log in form to log in to your account so that you can manage assets.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.logout}
              component={Logout}
              meta={{
                title: 'Logging you out',
                description:
                  'Visit this page to automatically log out of your account.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.browse}
              component={BrowseAssets}
              meta={{
                title: 'Browse the assets',
                description:
                  'All available assets are shown here so that you can browse them.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.browseWithVar}
              component={BrowseAssets}
              meta={{
                title: 'Browse the assets',
                description:
                  'All available assets are shown here so that you can browse them.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.createAsset}
              component={CreateAsset}
              meta={{
                title: 'Upload a new asset',
                description: 'A form that lets you upload a new asset.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.viewAssetWithVar}
              component={ViewAsset}
              // TODO: Use list title as page title
              meta={{
                title: 'View a single asset',
                description: 'This is a single asset..'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.editAssetWithVar}
              component={EditAsset}
              meta={{
                title: 'Edit an asset',
                description: 'This form lets you edit an asset.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.admin}
              component={Admin}
              meta={{
                title: 'Admins only area',
                description: 'A restricted space for admins only.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.myAccount}
              component={MyAccount}
              meta={{
                title: 'View details about your account',
                description:
                  'An overview of your account including a way to change your username and see statistics of your account.'
              }}
            />
            <RouteWithMeta
              exact
              path={routes.privacyPolicy}
              component={PrivacyPolicy}
              meta={{
                title: 'Our privacy policy',
                description:
                  'View the privacy policy of our website including what we do with your personal data.'
              }}
            />
          </Switch>
        )}
      </Container>
    </main>
    <PageFooter />
  </>
)

const mapStateToProps = ({ app: { searchTerm } }) => ({ searchTerm })

export default connect(mapStateToProps)(App)
