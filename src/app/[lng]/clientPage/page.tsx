'use client'

import { useTranslation } from '../../i18n/client'
import { useState } from 'react'
import React from 'react'

export type InsideParamsProps = {
    lng: string
}

export type PageParams = {
    params: InsideParamsProps
}

export default function Page({ params }: { params: React.Usable<InsideParamsProps>}) {
  const { lng } = React.use<InsideParamsProps>(params)

  const { t } = useTranslation(lng, 'global')
  const [counter, setCounter] = useState(0)
  return (
    <>
      <h1>{t('title')}</h1>
      <p>{t('counter', { count: counter })}</p>
      <div>
        <button onClick={() => setCounter(Math.max(0, counter - 1))}>-</button>
        <button onClick={() => setCounter(Math.min(10, counter + 1))}>+</button>
      </div>
      
    </>
  )
}