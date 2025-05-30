import { useLayout } from '@composables/useLayout'
import { desktopRoutes } from './desktop'
import { mobileRoutes } from './mobile'
import { webRoutes } from './web'

export function getRoutes() {
  const { layoutName } = useLayout()

  if (layoutName.value === 'Web') {
    return webRoutes
  }
  if (layoutName.value === 'Desktop') {
    return desktopRoutes
  }
  if (layoutName.value === 'Mobile') {
    return mobileRoutes
  }
  return []
}
