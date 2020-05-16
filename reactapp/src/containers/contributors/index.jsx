import React from 'react'

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
    <h1>Contributors</h1>
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
    <h2>Build Status</h2>
    <img
      src="https://api.netlify.com/api/v1/badges/d9ba52e1-13fa-4b88-94cf-a7d6065111a5/deploy-status"
      alt="Status of build"
    />
  </>
)
