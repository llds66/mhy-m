import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useScrollDirection(threshold = 0) {
  const isScrollingUp = ref(true)
  let lastScrollTop = 0

  const handleScroll = () => {
    const currentScrollTop = window.scrollY
    const scrollDelta = Math.abs(currentScrollTop - lastScrollTop)

    if (scrollDelta > threshold) {
      isScrollingUp.value = currentScrollTop < lastScrollTop
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isScrollingUp,
  }
}
