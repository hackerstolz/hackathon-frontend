import merge from 'lodash/merge'

const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
const messageMap = {}
const availableI18nLocales = locales.keys().map(key => {
  const [, locale] = key.match(/([A-Za-z0-9-_]+)\.json/i) || [null, null]
  return locale
})

// load function for i18n locales
function loadLocaleMessages(i18nLocales) {
  i18nLocales.forEach(locale => {
    messageMap[locale] = locales(`./${locale}.json`)
  })
  return messageMap
}

// parse a URL search to a query object (e.g. '?a=3' to { a: 3 })
const parseSearch = URLSearchString =>
  !URLSearchString
    ? {}
    : decodeURIComponent(URLSearchString)
        .substring(1)
        .split('&')
        .reduce((query, valuePair) => {
          const [key, value] = valuePair.split('=')
          query[key] = value
          return query
        }, {})

// stringify a query object to an URL search string (e.g. { a: 3 } to '?a=3')
const stringifyQuery = query =>
  Object.keys(query).reduce((search, key) => {
    const searchStart = search ? `${search}&` : '?'
    return `${searchStart}${key}=${encodeURIComponent(query[key])}`
  }, null) || ''

// get query object from URL
export const getUrlHashQuery = () => {
  // parse existing hash query
  const hash = location.hash || '#'
  const hashSearchIndex = hash.indexOf('?')
  const hashHasNoSearch = hashSearchIndex < 0
  const hashSearch = hashHasNoSearch ? '' : hash.substring(hashSearchIndex)
  const hashQuery = parseSearch(hashSearch)
  let query = hashQuery

  // because we use the hash router, we must merge all URL/search query parameters to our hash query parameters
  // e.g. update host.de/xyz/?lang=en#?b=2 to host.de/xyz/#?lang=en&b=2
  if (location.search) {
    // parse search
    const searchQuery = parseSearch(location.search)

    // compose new hash
    const updatedHash = hashHasNoSearch
      ? hash
      : hash.substring(0, hashSearchIndex)
    const updatedQuery = merge({}, searchQuery, hashQuery)
    const updatedHashWithSearch = `${updatedHash}${stringifyQuery(
      updatedQuery
    )}`

    // update query object
    query = updatedQuery

    // update URL
    location.href = `${location.origin}${location.pathname}${updatedHashWithSearch}`
  }

  return query || {}
}

// determine user's locale languages
const getUserAcceptLocales = () => {
  // for Android language contained in the user agent string
  const clientLocaleLanguage =
    (function androidNavigatorLanguage() {
      if (navigator.userAgent.match(/Android/) !== null) {
        // on Android, navigator.language is hardcoded to 'en', so check UserAgent string instead
        const match = navigator.userAgent.match(/\s([a-z]{2}-[a-z]{2})[;)]/i)
        return match ? match[1] : null
      }
      return null
    })() ||
    // general language information from the browser
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    // for Internet Explorer this is the language in the Region settings
    navigator.userLanguage ||
    // for Internet Explorer this is the language of the Operating System
    navigator.browserLanguage ||
    // hard-coded fallback locale ('en'):
    'en'

  // determine locale configured via URL parameter
  const query = getUrlHashQuery()
  const urlParamLanguage = query.lang || ''

  // split locales with a region code
  const urlParamLanguageWithoutRegionCode = urlParamLanguage
    .toLowerCase()
    .split(/[_-]+/)[0]

  const clientLocaleLanguageWithoutRegionCode = clientLocaleLanguage
    .toLowerCase()
    .split(/[_-]+/)[0]

  // determine UI users locale
  return [
    // 1. try full url locale
    urlParamLanguage,
    // 2. try url locale without region code
    urlParamLanguageWithoutRegionCode,
    // 3. try full client locale
    clientLocaleLanguage,
    // 4. try client locale without region code
    clientLocaleLanguageWithoutRegionCode,
    // 5. fallback to 'en'
    'en'
  ]
}

const [selectedUsersLocale] =
  getUserAcceptLocales().filter(lang =>
    availableI18nLocales.some(i18nLocale => i18nLocale === lang)
  ) || []

export const i18nOptions = {
  locale: selectedUsersLocale,
  fallbackLocale: selectedUsersLocale,
  messages: loadLocaleMessages(availableI18nLocales),
  dateTimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      weekday: {
        weekday: 'long'
      },
      weekdayShort: {
        weekday: 'short'
      },
      time: {
        minute: '2-digit',
        hour: '2-digit'
      }
    },
    de: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      weekday: {
        weekday: 'long'
      },
      weekdayShort: {
        weekday: 'short'
      },
      time: {
        minute: '2-digit',
        hour: '2-digit'
      }
    }
  }
}
