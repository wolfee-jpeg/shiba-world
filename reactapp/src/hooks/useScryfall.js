import { useState, useEffect, useRef } from 'react'
import { inDevelopment } from '../environment'

const scryFallApiUrl = 'https://api.scryfall.com'
const cardByIdEndpoint = 'cards/'
const cardSearchEndpoint = 'cards/search?order=cmc&q='

const cardCacheById = {}
const cardCacheBySearchTerm = {}

const performFetch = url =>
  fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Response not ok')
    }
    return response.json()
  })

const fetchCardById = scryfallCardId =>
  performFetch(`${scryFallApiUrl}/${cardByIdEndpoint}/${scryfallCardId}`)
const fetchCardsBySearch = cardNameSearchTerm =>
  performFetch(`${scryFallApiUrl}/${cardSearchEndpoint}/${cardNameSearchTerm}`)

const useScryfall = (scryfallCardId = null, cardNameSearchTerm = '') => {
  const [responseJson, setResponseJson] = useState({})
  const [isFetching, setIsFetching] = useState(false)
  const [isErrored, setIsErrored] = useState(false)
  const timer = useRef()

  useEffect(() => {
    if (!scryfallCardId && !cardNameSearchTerm) {
      return
    }

    if (cardNameSearchTerm in cardCacheBySearchTerm) {
      if (inDevelopment())
        console.log(
          `useScryfall: Card name search term ${cardNameSearchTerm} in cache`,
          cardCacheBySearchTerm[cardNameSearchTerm]
        )
      setResponseJson(cardCacheBySearchTerm[cardNameSearchTerm])
      return
    }

    if (scryfallCardId in cardCacheById) {
      if (inDevelopment())
        console.log(
          `useScryfall: Card ID ${scryfallCardId} in cache`,
          cardCacheById[scryfallCardId]
        )
      setResponseJson()
      return
    }

    const doFetch = () => {
      const onDone = json => {
        const bestSearchResult = json.data ? json.data[0] : json

        // Store in cache
        cardCacheById[bestSearchResult.id] = bestSearchResult
        if (cardNameSearchTerm) {
          cardCacheBySearchTerm[cardNameSearchTerm] = bestSearchResult
        }

        setResponseJson(bestSearchResult)
        setIsFetching(false)
        setIsErrored(false)
      }

      const onError = err => {
        setResponseJson({})
        setIsFetching(false)
        setIsErrored(true)
      }

      setIsFetching(true)

      scryfallCardId
        ? fetchCardById(scryfallCardId)
            .then(onDone)
            .catch(onError)
        : fetchCardsBySearch(cardNameSearchTerm)
            .then(onDone)
            .catch(onError)
    }

    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => doFetch(), 500)
  }, [scryfallCardId, cardNameSearchTerm])

  return [isFetching, isErrored, responseJson]
}

export default useScryfall
