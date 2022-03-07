/**
 * @module viw-webgl-viewer
 */

import * as THREE from 'three'
import { Renderer } from './renderer'
import { ViewerSettings } from './viewerSettings'

/**
* Manages the camera target gizmo
*/
export class CameraGizmo {
  // Dependencies
  private _renderer: Renderer

  // Settings
  private _scale: number

  // Resources
  private _sphere: THREE.BufferGeometry
  private _wireframe: THREE.BufferGeometry
  private _material: THREE.Material
  private _materialAlways: THREE.Material
  private _gizmos: THREE.Group

  // State
  private _timeout: ReturnType<typeof setTimeout>
  private _active: boolean

  constructor (renderer: Renderer) {
    this._renderer = renderer
  }

  dispose () {
    clearTimeout(this._timeout)

    this._sphere.dispose()
    this._wireframe.dispose()
    this._material.dispose()
    this._materialAlways.dispose()
    this._sphere = undefined
    this._wireframe = undefined
    this._material = undefined
    this._materialAlways = undefined

    this._renderer.remove(this._gizmos)
    this._gizmos = undefined
  }

  show (show: boolean = true) {
    if (!this._active) return

    if (!this._gizmos) {
      this.createGizmo()
    }

    clearTimeout(this._timeout)
    this._gizmos.visible = show
    // Hide after one second since last request
    if (show) {
      this._timeout = setTimeout(() => (this._gizmos.visible = false), 1000)
    }
  }

  setPosition (position: THREE.Vector3) {
    this._gizmos?.position.copy(position)
  }

  applySettings (settings: ViewerSettings) {
    this._active = settings.getCameraShowGizmo()
  }

  setScale (scale: number = 1) {
    this._gizmos?.scale.set(scale, scale, scale)
    this._scale = scale
  }

  private createGizmo () {
    this._sphere = new THREE.SphereGeometry(1)
    this._wireframe = new THREE.WireframeGeometry(this._sphere)

    this._material = new THREE.LineBasicMaterial({
      depthTest: true,
      opacity: 0.5,
      color: new THREE.Color(0x0000ff),
      transparent: true
    })
    this._materialAlways = new THREE.LineBasicMaterial({
      depthTest: false,
      opacity: 0.05,
      color: new THREE.Color(0x0000ff),
      transparent: true
    })

    // Add to scene as group
    this._gizmos = new THREE.Group()
    this._gizmos.add(new THREE.LineSegments(this._wireframe, this._material))
    this._gizmos.add(
      new THREE.LineSegments(this._wireframe, this._materialAlways)
    )
    this._renderer.add(this._gizmos)

    this.setScale(this._scale)
  }
}
