import { Viewer } from './viewer'

const params = new URLSearchParams(window.location.search)
const url = params.has('model')
  ? params.get('model')
  : './models/rac_advanced_sample_project.ifcifc'

const viewer = new Viewer({
  url: url,
  object: {
    scale: 0.1,
    rotation: { x: 270 },
    position: { y: 0 }
  },
  plane: {
    show: false
  },
  showStats: true
})

globalThis.viewer = viewer
