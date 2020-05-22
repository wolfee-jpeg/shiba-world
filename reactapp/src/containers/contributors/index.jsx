import React from 'react'
import Heading from '../../components/heading'

const contributors = [
  {
    name: 'A5TR0',
    items: ['created species thumbnails']
  },
  {
    name: 'Wolfee',
    items: ['beta testing and created early assets']
  }
]

export default () => (
  <>
    <Heading variant="h1">Contributors</Heading>
    <p>People that have helped develop the site.</p>
    <ul>
      {contributors.map(({ name, items }) => (
        <li key={name}>
          <strong>{name}</strong>
          <br />
          <ul>
            {items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
    <Heading variant="h2">Build Status</Heading>
    <img
      src="https://api.netlify.com/api/v1/badges/d9ba52e1-13fa-4b88-94cf-a7d6065111a5/deploy-status"
      alt="Status of build"
    />
  </>
)
