import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import './styles/main.css'

// ViteSSG bootstraps the app for both the client and the static-generation
// build. Head management (@unhead/vue) is wired up automatically, so
// `useHead()` works inside any component.
export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to) {
      // Smooth-scroll to in-page anchor sections; otherwise jump to top.
      if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
      return { top: 0 }
    },
  },
  ({ app, router, isClient }) => {
    // Register global plugins / directives here.
  },
)
