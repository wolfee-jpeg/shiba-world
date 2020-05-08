import React from 'react'
import CreateListForm from '../../components/create-list-form'
import withRedirectOnNotAuth from '../../hocs/withRedirectOnNotAuth'
import withEditorsOnly from '../../hocs/withEditorsOnly'

const CreateAsset = () => (
  <>
    <h1>Create Asset</h1>
    <CreateListForm />
  </>
)

export default withRedirectOnNotAuth(withEditorsOnly(CreateAsset))
