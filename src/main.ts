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
    loadFromBuffer(content as ArrayBuffer)
  }
}

function loadFromUrl(url: string) 
{
  console.log("Loading from: " + url);
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url)
  xhr.responseType = 'arraybuffer'

  xhr.onprogress = (prog) => {
    console.log("OnProgress");
    console.log(prog);
  }
  
  xhr.onload = () => {
    console.log("Loaded");
    loadFromBuffer(xhr.response);
  }
  
  xhr.onerror = (err) => {
    console.log("Error")
    console.log(err);
  }
}

function loadFromBuffer (vim: ArrayBuffer) {
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

globalThis.viewer = viewer
globalThis.VIM = VIM
globalThis.THREE = THREE

loadFromUrl(url);
