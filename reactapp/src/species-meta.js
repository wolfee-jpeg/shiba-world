import shibaInuImageUrl from './assets/images/species/shiba_inu.png'
import avaliImageUrl from './assets/images/species/avali.png'
import bestBoiImageUrl from './assets/images/species/best_boi.png'
import sergalImageUrl from './assets/images/species/sergal.png'
import rexouiumImageUrl from './assets/images/species/rexouium.png'
import kangarooImageUrl from './assets/images/species/kangaroo.png'
import racoonImageUrl from './assets/images/species/racoon.png'
import otherSpeciesImageUrl from './assets/images/species/other-species.png'
import { species } from './tags'

export default {
  [species.Shiba]: {
    name: 'Shiba Inu',
    shortDescription: 'Foo',
    description: `An anthropomorphic avatar created by [Pikapetey](https://www.patreon.com/pikapetey).

To download the Shiba avatar you must first donate $5 to Pikapetey's [Patreon](https://www.patreon.com/pikapetey) then follow the link to join his Discord. From there you can check the #announcements channel for a link to the Unity asset and Substance Painter project.

### Corpse Shiba

Alternatively you can use the more optimized "Corpse Shiba" that is also available from the Pikapetey Discord by clicking [here](https://discordapp.com/channels/224293432498061313/595643494618365952/647970619719286785). It has:
- more optimized model
- bug fixes
- wagging tail`,
    thumbnailUrl: shibaInuImageUrl
  },
  [species.Avali]: {
    name: 'Avali',
    description: ``,
    thumbnailUrl: avaliImageUrl
  },
  [species.BestBoi]: {
    name: 'Best Boi',
    description: ``,
    thumbnailUrl: bestBoiImageUrl
  },
  [species.sergal]: {
    name: 'Sergal',
    description: ``,
    thumbnailUrl: sergalImageUrl
  },
  [species.rexouium]: {
    name: 'Rexouium',
    description: ``,
    thumbnailUrl: rexouiumImageUrl
  },
  [species.kangaroo]: {
    name: 'Kangaroo',
    description: ``,
    thumbnailUrl: kangarooImageUrl
  },
  [species.racoon]: {
    name: 'Racooon',
    description: ``,
    thumbnailUrl: racoonImageUrl
  },
  [species.otherSpecies]: {
    name: 'Other Species',
    description: ``,
    thumbnailUrl: otherSpeciesImageUrl
  }
}
