import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
}

export function middleware(req: NextRequest) {
  const response = NextResponse.next()
  let goLang = req.nextUrl.pathname.split('/')[1]
    if (!languages.includes(goLang)) {
        goLang = fallbackLng
    } else {
        response.cookies.set(cookieName, goLang)
    }
  let lng
  const possibleValue = req.cookies.get(cookieName)
  if (req.cookies.has(cookieName) && possibleValue) {
    lng = acceptLanguage.get(possibleValue.value)
  }
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const referer = req.headers.get('referer');
    if(referer) {
        if(goLang) lng = goLang;
        // const refererUrl = new URL(referer)
        //const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
        // const response = NextResponse.next()
        // if (lngInReferer) 
        response.cookies.set(cookieName, lng)
        return response
    } 
  } else {
    if(goLang) lng = goLang;
    response.cookies.set(cookieName, lng)
    return response
 }

  return NextResponse.next()
}