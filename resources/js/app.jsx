import './bootstrap';
import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import Layout from './Layout'
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    let page = pages[`./Pages/${name}.jsx`]
    page.default.layout = page.default.layout || (page => <Layout children={page} />)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <ThemeProvider theme={theme}>
        <App {...props} />
      </ThemeProvider>
  )
  },
})