import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../../components/heading'
import Button from '../../components/button'
import * as routes from '../../routes'

export default ({ code, message }) => (
  <>
    <Heading variant="h1">{code}</Heading>
    {message}
    <br />
    <Link to={routes.home}>
      <Button>Return to home</Button>
    </Link>
  </>
)
