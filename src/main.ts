import * as VIM from './vim'
import * as THREE from 'three'

// Parse URL
const params = new URLSearchParams(window.location.search)
const url = params.has('vim')
  ? params.get('vim')
  : 'https://vim.azureedge.net/samples/residence.vim'

let transparency: VIM.Transparency.Mode = 'all'
if (params.has('transparency')) {
  const t = params.get('transparency')
  transparency = VIM.Transparency.isValid(t) ? t : 'all'
}

// Create Viewer
const viewer = new VIM.Viewer({
  groundPlane: {
    show: true,
    texture:
      'https://vimdevelopment01storage.blob.core.windows.net/textures/vim-floor-soft.png',
    opacity: 1,
    size: 5
  }
})

load2(url)

const input = document.createElement('input')
input.type = 'file'
document.body.prepend(input)

input.onchange = (e: any) => {
  viewer.clear()
  // getting a hold of the file reference
  const file = e.target.files[0]

  // setting up the reader
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)

  // here we tell the reader what to do when it's done reading...
  reader.onload = (readerEvent) => {
    const content = readerEvent.target.result // this is the content!
    load2(content)
  }
}

function load2 (vim: string | ArrayBuffer) {
  const COUNT = 1
  for (let i = 0; i < COUNT; i++) {
    for (let j = 0; j < COUNT; j++) {
      viewer.loadVim(
        vim,
        {
          rotation: { x: 270, y: 0, z: 0 },
          transparency: transparency
        },
        (progress) => {
          console.log(`Loading : ${progress.loaded} / ${progress.total}`)
        }
      )
    }
  }
}

globalThis.viewer = viewer
globalThis.VIM = VIM
globalThis.THREE = THREE
