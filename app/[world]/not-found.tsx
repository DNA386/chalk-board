'use client'

import { useParams } from 'next/navigation'
import NotFound from '@/components/NotFound'


export default function AppNotFound() {
  const { world } = useParams<{world: string}>()
  return <NotFound baseUrl={'/' + world} />
}
