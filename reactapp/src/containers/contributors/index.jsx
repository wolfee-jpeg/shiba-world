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
)
