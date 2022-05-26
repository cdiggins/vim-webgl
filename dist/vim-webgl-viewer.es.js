import * as THREE from "three";
import { MathUtils, Float32BufferAttribute, InstancedBufferAttribute, InstancedMesh, BufferAttribute } from "three";
export { THREE };
var isMergeableObject = function isMergeableObject2(value) {
  return isNonNullObject(value) && !isSpecial(value);
};
function isNonNullObject(value) {
  return !!value && typeof value === "object";
}
function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
}
var canUseSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}
function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}
function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function(element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}
function getMergeFunction(key, options) {
  if (!options.customMerge) {
    return deepmerge;
  }
  var customMerge = options.customMerge(key);
  return typeof customMerge === "function" ? customMerge : deepmerge;
}
function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
    return target.propertyIsEnumerable(symbol);
  }) : [];
}
function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}
function propertyIsOnObject(object, property) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
}
function propertyIsUnsafe(target, key) {
  return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
}
function mergeObject(target, source, options) {
  var destination = {};
  if (options.isMergeableObject(target)) {
    getKeys(target).forEach(function(key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }
  getKeys(source).forEach(function(key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }
    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    }
  });
  return destination;
}
function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}
deepmerge.all = function deepmergeAll(array, options) {
  if (!Array.isArray(array)) {
    throw new Error("first argument should be an array");
  }
  return array.reduce(function(prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};
var deepmerge_1 = deepmerge;
var cjs = deepmerge_1;
class ViewerSettings {
  constructor(options) {
    this.getCanvasResizeDelay = () => this.options.canvas.resizeDelay;
    this.getCanvasId = () => this.options.canvas.id;
    this.getGroundPlaneShow = () => this.options.groundPlane.show;
    this.getGroundPlaneColor = () => toRGBColor(this.options.groundPlane.color);
    this.getGroundPlaneTextureUrl = () => this.options.groundPlane.texture;
    this.getGroundPlaneOpacity = () => this.options.groundPlane.opacity;
    this.getGroundPlaneSize = () => this.options.groundPlane.size;
    this.getSkylightColor = () => toHSLColor(this.options.skylight.skyColor);
    this.getSkylightGroundColor = () => toHSLColor(this.options.skylight.groundColor);
    this.getSkylightIntensity = () => this.options.skylight.intensity;
    this.getSunlightColor = () => toHSLColor(this.options.sunLight.color);
    this.getSunlightPosition = () => toVec$1(this.options.sunLight.position);
    this.getSunlightIntensity = () => this.options.sunLight.intensity;
    this.getHighlightColor = () => toRGBColor(this.options.highlight.color);
    this.getHighlightOpacity = () => this.options.highlight.opacity;
    this.getCameraNear = () => this.camera.near;
    this.getCameraFar = () => this.camera.far;
    this.getCameraFov = () => this.camera.fov;
    this.getCameraZoom = () => this.camera.zoom;
    this.getCameraGizmoEnable = () => this.camera.gizmo.enable;
    this.getCameraGizmoSize = () => this.camera.gizmo.size;
    this.getCameraGizmoColor = () => toRGBColor(this.camera.gizmo.color);
    this.getCameraGizmoOpacity = () => this.camera.gizmo.opacity;
    this.getCameraGizmoOpacityAlways = () => this.camera.gizmo.opacityAlways;
    this.getCameraIsOrbit = () => this.cameraControls.orbit;
    this.getCameraMoveSpeed = () => this.cameraControls.moveSpeed;
    this.getCameraRotateSpeed = () => this.cameraControls.rotateSpeed;
    this.getCameraOrbitSpeed = () => this.cameraControls.orbitSpeed;
    this.getCameraReferenceVimSize = () => this.cameraControls.vimReferenceSize;
    const fallback = {
      canvas: {
        id: void 0,
        resizeDelay: 200
      },
      camera: {
        near: 0.01,
        far: 15e3,
        fov: 50,
        zoom: 1,
        controls: {
          orbit: true,
          vimReferenceSize: 1,
          rotateSpeed: 1,
          orbitSpeed: 1,
          moveSpeed: 1
        },
        gizmo: {
          enable: true,
          size: 5e-3,
          color: { r: 255, g: 255, b: 255 },
          opacity: 0.5,
          opacityAlways: 0.125
        }
      },
      groundPlane: {
        show: false,
        texture: void 0,
        opacity: 1,
        color: { r: 255, g: 255, b: 255 },
        size: 3
      },
      skylight: {
        skyColor: { h: 0.6, s: 1, l: 0.6 },
        groundColor: { h: 0.095, s: 1, l: 0.75 },
        intensity: 0.6
      },
      sunLight: {
        position: { x: -47, y: 22, z: -45 },
        color: { h: 0.1, s: 1, l: 0.95 },
        intensity: 1
      },
      highlight: {
        color: { r: 106, g: 210, b: 255 },
        opacity: 0.5
      }
    };
    this.options = options ? cjs(fallback, options, void 0) : fallback;
  }
  get camera() {
    return this.options.camera;
  }
  get cameraControls() {
    return this.camera.controls;
  }
}
function toRGBColor(c) {
  return new THREE.Color(c.r / 255, c.g / 255, c.b / 255);
}
function toHSLColor(obj) {
  return new THREE.Color().setHSL(obj.h, obj.s, obj.l);
}
function toVec$1(obj) {
  return new THREE.Vector3(obj.x, obj.y, obj.z);
}
({
  forward: new THREE.Vector3(0, 0, -1),
  back: new THREE.Vector3(0, 0, 1),
  left: new THREE.Vector3(-1, 0, 0),
  right: new THREE.Vector3(1, 0, 0),
  up: new THREE.Vector3(0, 1, 0),
  down: new THREE.Vector3(0, -1, 0)
});
class Camera {
  constructor(scene, viewport, settings) {
    this._minOrbitalDistance = 0.05;
    this._orbitMode = false;
    this._sceneSizeMultiplier = 1;
    this._velocityBlendFactor = 1e-4;
    this._moveSpeed = 0.8;
    this._rotateSpeed = 1;
    this._orbitSpeed = 1;
    this._zoomSpeed = 0.2;
    this.camera = new THREE.PerspectiveCamera();
    this.camera.position.set(0, 0, -1e3);
    this.camera.lookAt(0, 0, 0);
    this._scene = scene;
    this._viewport = viewport;
    this._viewport.onResize(() => {
      this.updateProjection(this._scene.getBoundingSphere());
    });
    this.applySettings(settings);
    this._inputVelocity = new THREE.Vector3(0, 0, 0);
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._impulse = new THREE.Vector3(0, 0, 0);
    this.speed = 0;
    this._sceneSizeMultiplier = 1;
    this._orbitalTarget = new THREE.Vector3(0, 0, 0);
    this._currentOrbitalDistance = this.camera.position.clone().sub(this._orbitalTarget).length();
    this._orbitalTargetDistance = this._currentOrbitalDistance;
  }
  dispose() {
    var _a;
    (_a = this.gizmo) == null ? void 0 : _a.dispose();
    this.gizmo = void 0;
  }
  reset() {
    this.camera.position.set(0, 0, -5);
    this.camera.lookAt(0, 0, 1);
    this._inputVelocity.set(0, 0, 0);
    this._velocity.set(0, 0, 0);
    this._impulse.set(0, 0, 0);
    this._currentOrbitalDistance = 5;
    this._orbitalTarget.set(0, 0, 0);
    this._orbitalTargetDistance = this._currentOrbitalDistance;
  }
  get localVelocity() {
    const result = this._velocity.clone();
    result.applyQuaternion(this.camera.quaternion.clone().invert());
    result.setZ(-result.z);
    result.multiplyScalar(1 / this.getSpeedMultiplier() * this._moveSpeed);
    return result;
  }
  set localVelocity(vector) {
    const move = vector.clone();
    move.setZ(-move.z);
    move.applyQuaternion(this.camera.quaternion);
    move.multiplyScalar(this.getSpeedMultiplier() * this._moveSpeed);
    this._inputVelocity.copy(move);
  }
  get orbitMode() {
    return this._orbitMode;
  }
  set orbitMode(value) {
    var _a;
    this._orbitMode = value;
    (_a = this.gizmo) == null ? void 0 : _a.show(value);
  }
  target(target) {
    var _a;
    const position = target instanceof THREE.Vector3 ? target : target.getCenter();
    this._orbitalTarget = position;
    this.startLerp(0.4);
    (_a = this.gizmo) == null ? void 0 : _a.show(true);
  }
  frame(target, center = false) {
    var _a;
    if (target === "all") {
      this.frameSphere(this._scene.getBoundingSphere(), center);
    }
    if (target instanceof Object$1) {
      this.frameSphere(target.getBoundingSphere(), center);
    }
    if (target instanceof THREE.Sphere) {
      this.frameSphere(target, center);
    }
    (_a = this.gizmo) == null ? void 0 : _a.show(true);
  }
  lookAt(target) {
    const position = target instanceof THREE.Vector3 ? target : target.getCenter();
    this.camera.lookAt(position);
  }
  applySettings(settings) {
    this.orbitMode = settings.getCameraIsOrbit();
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.fov = settings.getCameraFov();
      this.camera.zoom = settings.getCameraZoom();
      this.camera.near = settings.getCameraNear();
      this.camera.far = settings.getCameraFar();
      this.camera.updateProjectionMatrix();
    }
    this._moveSpeed = settings.getCameraMoveSpeed();
    this._rotateSpeed = settings.getCameraRotateSpeed();
    this._orbitSpeed = settings.getCameraOrbitSpeed();
    this._vimReferenceSize = settings.getCameraReferenceVimSize();
  }
  adaptToContent() {
    const sphere = this._scene.getBoundingSphere();
    this._sceneSizeMultiplier = sphere ? sphere.radius / this._vimReferenceSize : 1;
  }
  zoom(amount) {
    var _a;
    if (this.camera instanceof THREE.PerspectiveCamera) {
      const multiplier = this._zoomSpeed * this.getBaseMultiplier() * (this._orbitalTargetDistance / this._vimReferenceSize);
      const next = this._orbitalTargetDistance + amount * multiplier;
      this._orbitalTargetDistance = Math.max(next, this._minOrbitalDistance);
      (_a = this.gizmo) == null ? void 0 : _a.show();
    } else {
      const multiplier = this._zoomSpeed * this.getBaseMultiplier();
      const padX = (this.camera.right - this.camera.left) * amount * multiplier;
      const padY = (this.camera.top - this.camera.bottom) * amount * multiplier;
      this.camera.left -= padX;
      this.camera.right += padX;
      this.camera.bottom -= padY;
      this.camera.top += padY;
      this.camera.updateProjectionMatrix();
    }
  }
  addImpulse(impulse) {
    const localImpulse = impulse.clone().multiplyScalar(this.getSpeedMultiplier() * this._zoomSpeed);
    localImpulse.applyQuaternion(this.camera.quaternion);
    this._impulse.add(localImpulse);
  }
  move3(vector) {
    var _a;
    const v = vector.clone();
    v.applyQuaternion(this.camera.quaternion);
    v.multiplyScalar(this.getSpeedMultiplier() * this._moveSpeed);
    this._orbitalTarget.add(v);
    (_a = this.gizmo) == null ? void 0 : _a.show();
    if (!this.orbitMode) {
      this.camera.position.add(v);
    }
  }
  move2(vector, axes) {
    const direction = axes === "XY" ? new THREE.Vector3(-vector.x, vector.y, 0) : axes === "XZ" ? new THREE.Vector3(-vector.x, 0, vector.y) : void 0;
    this.move3(direction);
  }
  move1(amount, axis) {
    const direction = new THREE.Vector3(axis === "X" ? -amount : 0, axis === "Y" ? amount : 0, axis === "Z" ? amount : 0);
    this._currentOrbitalDistance += direction.z;
    this.move3(direction);
  }
  rotate(vector) {
    if (this.isLerping())
      return;
    const euler = new THREE.Euler(0, 0, 0, "YXZ");
    euler.setFromQuaternion(this.camera.quaternion);
    const factor = this.orbitMode ? Math.PI * this._orbitSpeed : Math.PI * this._rotateSpeed;
    euler.y -= vector.x * factor;
    euler.x -= vector.y * factor;
    euler.z = 0;
    const max = Math.PI * 0.48;
    euler.x = Math.max(-max, Math.min(max, euler.x));
    this.camera.quaternion.setFromEuler(euler);
    if (!this.orbitMode) {
      const offset = new THREE.Vector3(0, 0, 1).applyQuaternion(this.camera.quaternion).multiplyScalar(this._currentOrbitalDistance);
      this._orbitalTarget = this.camera.position.clone().sub(offset);
    }
  }
  update(deltaTime) {
    var _a, _b;
    const targetVelocity = this._inputVelocity.clone();
    const invBlendFactor = Math.pow(this._velocityBlendFactor, deltaTime);
    const blendFactor = 1 - invBlendFactor;
    this._velocity.multiplyScalar(invBlendFactor);
    targetVelocity.multiplyScalar(blendFactor);
    this._velocity.add(targetVelocity);
    this._currentOrbitalDistance = this._currentOrbitalDistance * invBlendFactor + this._orbitalTargetDistance * blendFactor;
    const positionDelta = this._velocity.clone().multiplyScalar(deltaTime);
    const impulse = this._impulse.clone().multiplyScalar(blendFactor);
    positionDelta.add(impulse);
    const orbitDelta = positionDelta.clone();
    this._impulse.multiplyScalar(invBlendFactor);
    this.camera.position.add(positionDelta);
    this._orbitalTarget.add(orbitDelta);
    if (this.orbitMode) {
      const target = new THREE.Vector3(0, 0, this._currentOrbitalDistance);
      target.applyQuaternion(this.camera.quaternion);
      target.add(this._orbitalTarget);
      if (this.isLerping()) {
        const frames = this._lerpSecondsDuration / deltaTime;
        const alpha = 1 - Math.pow(0.01, 1 / frames);
        this.camera.position.lerp(target, alpha);
      } else {
        this.camera.position.copy(target);
        if (this.isSignificant(positionDelta)) {
          (_a = this.gizmo) == null ? void 0 : _a.show();
        }
      }
    }
    (_b = this.gizmo) == null ? void 0 : _b.setPosition(this._orbitalTarget);
  }
  frameSphere(sphere, center) {
    if (!sphere) {
      this.reset();
      return;
    }
    if (center) {
      this.camera.position.setY(sphere.center.y);
    }
    this.camera.lookAt(sphere.center);
    this._currentOrbitalDistance = sphere.radius * 3;
    this._orbitalTargetDistance = sphere.radius * 3;
    this._orbitalTarget = sphere.center;
    this.updateProjection(sphere);
  }
  updateProjection(sphere) {
    const aspect = this._viewport.getAspectRatio();
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = aspect;
    } else {
      this.camera.left = -sphere.radius * aspect;
      this.camera.right = sphere.radius * aspect;
      this.camera.top = sphere.radius;
      this.camera.bottom = -sphere.radius;
      this.camera.near = 0.1;
      this.camera.far = sphere.radius * 10;
    }
    this.camera.updateProjectionMatrix();
  }
  get orthographic() {
    return this.camera instanceof THREE.OrthographicCamera;
  }
  set orthographic(value) {
    if (value === this.orthographic)
      return;
    const cam = value ? new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1) : new THREE.PerspectiveCamera();
    cam.position.copy(this.camera.position);
    cam.rotation.copy(this.camera.rotation);
    this.camera = cam;
    this.updateProjection(this._scene.getBoundingSphere());
  }
  getBaseMultiplier() {
    return Math.pow(1.25, this.speed);
  }
  getSpeedMultiplier() {
    return this.getBaseMultiplier() * (this._orbitalTargetDistance / this._vimReferenceSize);
  }
  getDistanceMultiplier() {
  }
  isLerping() {
    return new Date().getTime() < this._lerpMsEndtime;
  }
  startLerp(seconds) {
    this._lerpMsEndtime = new Date().getTime() + seconds * 1e3;
    this._lerpSecondsDuration = seconds;
  }
  isSignificant(vector) {
    const min = 0.01 * this._sceneSizeMultiplier / 60;
    return Math.abs(vector.x) > min || Math.abs(vector.y) > min || Math.abs(vector.z) > min;
  }
}
const KEYS = {
  KEY_0: 48,
  KEY_1: 49,
  KEY_2: 50,
  KEY_3: 51,
  KEY_4: 52,
  KEY_5: 53,
  KEY_6: 54,
  KEY_7: 55,
  KEY_8: 56,
  KEY_9: 57,
  KEY_LEFT: 37,
  KEY_RIGHT: 39,
  KEY_UP: 38,
  KEY_DOWN: 40,
  KEY_CTRL: 17,
  KEY_SHIFT: 16,
  KEY_ENTER: 13,
  KEY_SPACE: 32,
  KEY_TAB: 9,
  KEY_ESCAPE: 27,
  KEY_BACKSPACE: 8,
  KEY_HOME: 36,
  KEY_END: 35,
  KEY_INSERT: 45,
  KEY_DELETE: 46,
  KEY_ALT: 18,
  KEY_F1: 112,
  KEY_F2: 113,
  KEY_F3: 114,
  KEY_F4: 115,
  KEY_F5: 116,
  KEY_F6: 117,
  KEY_F7: 118,
  KEY_F8: 119,
  KEY_F9: 120,
  KEY_F10: 121,
  KEY_F11: 122,
  KEY_F12: 123,
  KEY_NUMPAD0: 96,
  KEY_NUMPAD1: 97,
  KEY_NUMPAD2: 98,
  KEY_NUMPAD3: 99,
  KEY_NUMPAD4: 100,
  KEY_NUMPAD5: 101,
  KEY_NUMPAD6: 102,
  KEY_NUMPAD7: 103,
  KEY_NUMPAD8: 104,
  KEY_NUMPAD9: 105,
  KEY_ADD: 107,
  KEY_SUBTRACT: 109,
  KEY_MULTIPLY: 106,
  KEY_DIVIDE: 111,
  KEY_SEPARATOR: 108,
  KEY_DECIMAL: 110,
  KEY_OEM_PLUS: 187,
  KEY_OEM_MINUS: 189,
  KEY_A: 65,
  KEY_B: 66,
  KEY_C: 67,
  KEY_D: 68,
  KEY_E: 69,
  KEY_F: 70,
  KEY_G: 71,
  KEY_H: 72,
  KEY_I: 73,
  KEY_J: 74,
  KEY_K: 75,
  KEY_L: 76,
  KEY_M: 77,
  KEY_N: 78,
  KEY_O: 79,
  KEY_P: 80,
  KEY_Q: 81,
  KEY_R: 82,
  KEY_S: 83,
  KEY_T: 84,
  KEY_U: 85,
  KEY_V: 86,
  KEY_W: 87,
  KEY_X: 88,
  KEY_Y: 89,
  KEY_Z: 90
};
class Keyboard {
  constructor(viewer) {
    this.SHIFT_MULTIPLIER = 3;
    this.isShiftPressed = false;
    this.reset = () => {
      this.isUpPressed = false;
      this.isDownPressed = false;
      this.isLeftPressed = false;
      this.isRightPressed = false;
      this.isEPressed = false;
      this.isQPressed = false;
      this.isShiftPressed = false;
      this.isCtrlPressed = false;
    };
    this.onKeyUp = (event) => {
      this.onKey(event, false);
    };
    this.onKeyDown = (event) => {
      this.onKey(event, true);
    };
    this.onKey = (event, keyDown) => {
      if (!keyDown) {
        switch (event.keyCode) {
          case KEYS.KEY_ADD:
          case KEYS.KEY_OEM_PLUS:
            this.camera.speed += 1;
            event.preventDefault();
            break;
          case KEYS.KEY_SUBTRACT:
          case KEYS.KEY_OEM_MINUS:
            this.camera.speed -= 1;
            event.preventDefault();
            break;
          case KEYS.KEY_F8:
          case KEYS.KEY_SPACE:
            this.camera.orbitMode = !this.camera.orbitMode;
            event.preventDefault();
            break;
          case KEYS.KEY_HOME:
            this.camera.frame("all", true);
            event.preventDefault();
            break;
          case KEYS.KEY_ESCAPE:
            this.selection.clear();
            event.preventDefault();
            break;
          case KEYS.KEY_Z:
          case KEYS.KEY_F:
            this.camera.frame(this.selection.object);
            event.preventDefault();
            break;
        }
      }
      switch (event.keyCode) {
        case KEYS.KEY_W:
        case KEYS.KEY_UP:
          this.isUpPressed = keyDown;
          this.applyMove();
          event.preventDefault();
          break;
        case KEYS.KEY_S:
        case KEYS.KEY_DOWN:
          this.isDownPressed = keyDown;
          this.applyMove();
          event.preventDefault();
          break;
        case KEYS.KEY_D:
        case KEYS.KEY_RIGHT:
          this.isRightPressed = keyDown;
          this.applyMove();
          event.preventDefault();
          break;
        case KEYS.KEY_A:
        case KEYS.KEY_LEFT:
          this.isLeftPressed = keyDown;
          this.applyMove();
          event.preventDefault();
          break;
        case KEYS.KEY_E:
          this.isEPressed = keyDown;
          this.applyMove();
          event.preventDefault();
          break;
        case KEYS.KEY_Q:
          this.isQPressed = keyDown;
          this.applyMove();
          event.preventDefault();
          break;
        case KEYS.KEY_SHIFT:
          this.isShiftPressed = keyDown;
          this.applyMove();
          event.preventDefault();
          break;
        case KEYS.KEY_CTRL:
          this.isCtrlPressed = keyDown;
          console.log("Control:" + keyDown);
          event.preventDefault();
          break;
      }
    };
    this.applyMove = () => {
      const move = new THREE.Vector3((this.isRightPressed ? 1 : 0) - (this.isLeftPressed ? 1 : 0), (this.isEPressed ? 1 : 0) - (this.isQPressed ? 1 : 0), (this.isUpPressed ? 1 : 0) - (this.isDownPressed ? 1 : 0));
      const speed = this.isShiftPressed ? this.SHIFT_MULTIPLIER : 1;
      move.multiplyScalar(speed);
      this.camera.localVelocity = move;
    };
    this._viewer = viewer;
  }
  get camera() {
    return this._viewer.camera;
  }
  get selection() {
    return this._viewer.selection;
  }
}
class Touch {
  constructor(viewer, mouse) {
    this.TAP_DURATION_MS = 500;
    this._touchStart = void 0;
    this._touchStart1 = void 0;
    this._touchStart2 = void 0;
    this._touchStartTime = void 0;
    this.reset = () => {
      this._touchStart = this._touchStart1 = this._touchStart2 = this._touchStartTime = void 0;
    };
    this.onTap = (position) => {
      this._mouse.onMouseClick(position, false);
    };
    this.onTouchStart = (event) => {
      event.preventDefault();
      if (!event || !event.touches || !event.touches.length) {
        return;
      }
      this._touchStartTime = new Date().getTime();
      if (event.touches.length === 1) {
        this._touchStart = this.touchToVector(event.touches[0]);
        this._touchStart1 = this._touchStart2 = void 0;
      } else if (event.touches.length === 2) {
        this._touchStart1 = this.touchToVector(event.touches[0]);
        this._touchStart2 = this.touchToVector(event.touches[1]);
        this._touchStart = this.average(this._touchStart1, this._touchStart2);
      }
    };
    this.onDrag = (delta) => {
      this.camera.rotate(delta);
    };
    this.onDoubleDrag = (delta) => {
      this.camera.move2(delta, "XY");
    };
    this.onPinchOrSpread = (delta) => {
      this.camera.move1(delta, "Z");
    };
    this.onTouchMove = (event) => {
      event.preventDefault();
      if (!event || !event.touches || !event.touches.length)
        return;
      if (!this._touchStart)
        return;
      if (event.touches.length === 1) {
        const pos = this.touchToVector(event.touches[0]);
        const [width, height] = this.viewport.getSize();
        const delta = pos.clone().sub(this._touchStart).multiply(new THREE.Vector2(1 / width, 1 / height));
        this._touchStart = pos;
        this.onDrag(delta);
        return;
      }
      if (!this._touchStart1 || !this._touchStart2)
        return;
      if (event.touches.length >= 2) {
        const p1 = this.touchToVector(event.touches[0]);
        const p2 = this.touchToVector(event.touches[1]);
        const p = this.average(p1, p2);
        const [width, height] = this.viewport.getSize();
        const moveDelta = this._touchStart.clone().sub(p).multiply(new THREE.Vector2(-1 / width, -1 / height));
        const zoom = p1.distanceTo(p2);
        const prevZoom = this._touchStart1.distanceTo(this._touchStart2);
        const min = Math.min(width, height);
        const zoomDelta = (zoom - prevZoom) / -min;
        this._touchStart = p;
        this._touchStart1 = p1;
        this._touchStart2 = p2;
        if (moveDelta.length() > Math.abs(zoomDelta)) {
          this.onDoubleDrag(moveDelta);
        } else {
          this.onPinchOrSpread(zoomDelta);
        }
      }
    };
    this.onTouchEnd = (_) => {
      if (this.isSingleTouch()) {
        const touchDurationMs = new Date().getTime() - this._touchStartTime;
        if (touchDurationMs < this.TAP_DURATION_MS) {
          this.onTap(this._touchStart);
        }
      }
      this.reset();
    };
    this._viewer = viewer;
    this._mouse = mouse;
  }
  get camera() {
    return this._viewer.camera;
  }
  get viewport() {
    return this._viewer.viewport;
  }
  isSingleTouch() {
    return this._touchStart !== void 0 && this._touchStartTime !== void 0 && this._touchStart1 === void 0 && this._touchStart2 === void 0;
  }
  touchToVector(touch) {
    return new THREE.Vector2(touch.pageX, touch.pageY);
  }
  average(p1, p2) {
    return p1.clone().lerp(p2, 0.5);
  }
}
class Mouse {
  constructor(viewer, keyboard) {
    this.isMouseDown = false;
    this.hasMouseMoved = false;
    this.reset = () => {
      this.isMouseDown = this.hasMouseMoved = false;
    };
    this.onMouseOut = (_) => {
      this.isMouseDown = this.hasMouseMoved = false;
    };
    this.onMouseMove = (event) => {
      if (!this.isMouseDown) {
        return;
      }
      event.preventDefault();
      const deltaX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      const deltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
      const [width, height] = this.viewport.getSize();
      const delta = new THREE.Vector2(deltaX / width, deltaY / height);
      this.hasMouseMoved = this.hasMouseMoved || Math.abs(deltaX) + Math.abs(deltaY) > 3;
      if (event.buttons & 2) {
        this.camera.move2(delta, "XY");
      } else if (event.buttons & 4) {
        this.camera.move2(delta, "XZ");
      } else {
        this.camera.rotate(delta);
      }
    };
    this.onMouseWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const scrollValue = Math.sign(event.deltaY);
      if (this._inputKeyboard.isCtrlPressed) {
        this.camera.speed -= scrollValue;
      } else if (this.camera.orbitMode) {
        this.camera.zoom(scrollValue);
      } else {
        const impulse = new THREE.Vector3(0, 0, scrollValue);
        this.camera.addImpulse(impulse);
      }
    };
    this.onMouseDown = (event) => {
      event.preventDefault();
      this.isMouseDown = true;
      this.hasMouseMoved = false;
      this.viewport.canvas.focus();
    };
    this.onMouseUp = (event) => {
      if (this.isMouseDown && !this.hasMouseMoved) {
        this.onMouseClick(new THREE.Vector2(event.offsetX, event.offsetY), false);
      }
      this.isMouseDown = false;
      event.preventDefault();
    };
    this.onDoubleClick = (event) => {
      this.onMouseClick(new THREE.Vector2(event.offsetX, event.offsetY), true);
    };
    this.onMouseClick = (position, doubleClick) => {
      const result = this._raycaster.screenRaycast(position);
      result.doubleClick = doubleClick;
      this._viewer.onMouseClick(result);
    };
    this._viewer = viewer;
    this._raycaster = this._viewer.raycaster;
    this._inputKeyboard = keyboard;
  }
  get camera() {
    return this._viewer.camera;
  }
  get viewport() {
    return this._viewer.viewport;
  }
}
class Input {
  constructor(viewer) {
    this.reg = (handler, type, listener) => {
      handler.addEventListener(type, listener);
      this._unregisters.push(() => handler.removeEventListener(type, listener));
    };
    this.unregister = () => {
      this._unregisters.forEach((f) => f());
      this.reset();
    };
    this._canvas = viewer.viewport.canvas;
    this._unregisters = [];
    this._keyboard = new Keyboard(viewer);
    this._mouse = new Mouse(viewer, this._keyboard);
    this._touch = new Touch(viewer, this._mouse);
  }
  register() {
    this.reg(this._canvas, "mousedown", this._mouse.onMouseDown);
    this.reg(this._canvas, "wheel", this._mouse.onMouseWheel);
    this.reg(this._canvas, "mousemove", this._mouse.onMouseMove);
    this.reg(this._canvas, "mouseup", this._mouse.onMouseUp);
    this.reg(this._canvas, "mouseout", this._mouse.onMouseOut);
    this.reg(this._canvas, "dblclick", this._mouse.onDoubleClick);
    this.reg(this._canvas, "touchstart", this._touch.onTouchStart);
    this.reg(this._canvas, "touchend", this._touch.onTouchEnd);
    this.reg(this._canvas, "touchmove", this._touch.onTouchMove);
    this.reg(document, "keydown", this._keyboard.onKeyDown);
    this.reg(document, "keyup", this._keyboard.onKeyUp);
    this.reg(this._canvas, "contextmenu", (e) => e.preventDefault());
  }
  reset() {
    this._mouse.reset();
    this._keyboard.reset();
    this._touch.reset();
  }
}
class Selection {
  constructor(renderer) {
    this._renderer = renderer;
  }
  get object() {
    return this._object;
  }
  select(object) {
    this.clear();
    if (object) {
      this._object = object;
      this._highligt = object.createWireframe();
      this._renderer.add(this._highligt);
    }
  }
  clear() {
    this._object = void 0;
    if (this._highligt) {
      this._highligt.geometry.dispose();
      this._renderer.remove(this._highligt);
      this._highligt = void 0;
    }
  }
}
class GroundPlane {
  constructor() {
    this._geometry = new THREE.PlaneBufferGeometry();
    this._material = new THREE.MeshBasicMaterial({ transparent: true });
    this.mesh = new THREE.Mesh(this._geometry, this._material);
  }
  applyViewerSettings(settings) {
    this._size = settings.getGroundPlaneSize();
    this.mesh.visible = settings.getGroundPlaneShow();
    this.applyTexture(settings.getGroundPlaneTextureUrl());
    this._material.color.copy(settings.getGroundPlaneColor());
    this._material.opacity = settings.getGroundPlaneOpacity();
  }
  adaptToContent(box) {
    var _a;
    const center = box.getCenter(new THREE.Vector3());
    const position = new THREE.Vector3(center.x, box.min.y - Math.abs(box.min.y) * 0.01, center.z);
    this.mesh.position.copy(position);
    this.mesh.quaternion.copy(new THREE.Quaternion().setFromEuler(new THREE.Euler(1.5 * Math.PI, 0, 0)));
    const sphere = box == null ? void 0 : box.getBoundingSphere(new THREE.Sphere());
    const size = ((_a = sphere == null ? void 0 : sphere.radius) != null ? _a : 1) * this._size;
    const scale = new THREE.Vector3(1, 1, 1).multiplyScalar(size);
    this.mesh.scale.copy(scale);
  }
  applyTexture(texUrl) {
    var _a;
    if (texUrl === this._source)
      return;
    this._source = texUrl;
    (_a = this._texture) == null ? void 0 : _a.dispose();
    this._texture = void 0;
    if (!texUrl)
      return;
    const loader = new THREE.TextureLoader();
    this._texture = loader.load(texUrl);
    if (!this._texture) {
      console.error("Failed to load texture: " + texUrl);
      return;
    }
    this._material.map = this._texture;
  }
  dispose() {
    var _a, _b, _c;
    (_a = this._geometry) == null ? void 0 : _a.dispose();
    (_b = this._material) == null ? void 0 : _b.dispose();
    (_c = this._texture) == null ? void 0 : _c.dispose();
    this._geometry = void 0;
    this._material = void 0;
    this._texture = void 0;
  }
}
class Environment {
  get groundPlane() {
    return this._groundPlane.mesh;
  }
  constructor(settings) {
    this._groundPlane = new GroundPlane();
    this.skyLight = new THREE.HemisphereLight();
    this.sunLight = new THREE.DirectionalLight();
    this.applySettings(settings);
  }
  getObjects() {
    return [this._groundPlane.mesh, this.skyLight, this.sunLight];
  }
  applySettings(settings) {
    this._groundPlane.applyViewerSettings(settings);
    this.skyLight.color.copy(settings.getSkylightColor());
    this.skyLight.groundColor.copy(settings.getSkylightGroundColor());
    this.skyLight.intensity = settings.getSkylightIntensity();
    this.sunLight.color.copy(settings.getSunlightColor());
    this.sunLight.position.copy(settings.getSunlightPosition());
    this.sunLight.intensity = settings.getSunlightIntensity();
  }
  adaptToContent(box) {
    this._groundPlane.adaptToContent(box);
  }
  dispose() {
    this.sunLight.dispose();
    this.skyLight.dispose();
    this._groundPlane.dispose();
    this.sunLight = void 0;
    this.skyLight = void 0;
    this._groundPlane = void 0;
  }
}
class Renderer {
  constructor(scene, viewport) {
    this.fitViewport = () => {
      const [width, height] = this.viewport.getParentSize();
      this.renderer.setSize(width, height);
    };
    this.viewport = viewport;
    this.scene = scene;
    this.renderer = new THREE.WebGLRenderer({
      canvas: viewport.canvas,
      antialias: true,
      precision: "highp",
      alpha: true,
      stencil: false,
      powerPreference: "high-performance",
      logarithmicDepthBuffer: true
    });
    this.fitViewport();
    this.viewport.onResize(() => this.fitViewport());
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = false;
  }
  dispose() {
    this.clear();
    this.renderer.clear();
    this.renderer.forceContextLoss();
    this.renderer.dispose();
    this.renderer = void 0;
  }
  getBoundingSphere(target = new THREE.Sphere()) {
    return this.scene.getBoundingSphere(target);
  }
  getBoundingBox(target = new THREE.Box3()) {
    return this.scene.getBoundingBox(target);
  }
  render(camera) {
    this.renderer.render(this.scene.scene, camera);
  }
  add(target) {
    this.scene.add(target);
  }
  remove(target) {
    this.scene.remove(target);
  }
  clear() {
    this.scene.clear();
  }
}
class RaycastResult {
  constructor(mousePosition, intersections) {
    this.mousePosition = mousePosition;
    this.intersections = intersections;
    const [hit, obj] = this.GetFirstVimHit(intersections);
    this.firstHit = hit;
    this.object = obj;
  }
  GetFirstVimHit(intersections) {
    for (let i = 0; i < intersections.length; i++) {
      const obj = this.getVimObjectFromHit(intersections[i]);
      if (obj == null ? void 0 : obj.visible)
        return [intersections[i], obj];
    }
    return [void 0, void 0];
  }
  getVimObjectFromHit(hit) {
    const vim = hit.object.userData.vim;
    if (!vim)
      return;
    if (hit.object.userData.merged) {
      const index = this.binarySearch(hit.object.userData.submeshes, hit.faceIndex * 3);
      const instance = hit.object.userData.instances[index];
      return vim.getObjectFromInstance(instance);
    } else if (hit.instanceId !== void 0) {
      return vim.getObjectFromMesh(hit.object, hit.instanceId);
    }
  }
  binarySearch(array, element) {
    let m = 0;
    let n = array.length - 1;
    while (m <= n) {
      const k = n + m >> 1;
      const cmp = element - array[k];
      if (cmp > 0) {
        m = k + 1;
      } else if (cmp < 0) {
        n = k - 1;
      } else {
        return k;
      }
    }
    return m - 1;
  }
  get isHit() {
    return !!this.firstHit;
  }
  get distance() {
    return this.firstHit.distance;
  }
  get position() {
    return this.firstHit.point;
  }
  get threeId() {
    return this.firstHit.object.id;
  }
  get faceIndex() {
    return this.firstHit.faceIndex;
  }
}
class Raycaster {
  constructor(viewport, camera, scene) {
    this._raycaster = new THREE.Raycaster();
    this._viewport = viewport;
    this._camera = camera;
    this._scene = scene;
  }
  screenRaycast(position) {
    console.time("raycast");
    const intersections = this.raycast(position);
    console.timeEnd("raycast");
    const r = new RaycastResult(position, intersections);
    const hit = r.firstHit;
    if (hit) {
      const vim = hit.object.userData.vim;
      if (hit.object.userData.merged && hit.uv !== void 0) {
        const instance = Math.round(hit.uv.x);
        r.object = vim.getObjectFromInstance(instance);
      } else if (hit.instanceId !== void 0) {
        r.object = vim.getObjectFromMesh(hit.object, hit.instanceId);
      }
    }
    return r;
  }
  raycast(position) {
    const [width, height] = this._viewport.getSize();
    const x = position.x / width * 2 - 1;
    const y = -(position.y / height) * 2 + 1;
    this._raycaster.setFromCamera(new THREE.Vector2(x, y), this._camera.camera);
    return this._raycaster.intersectObjects(this._scene.scene.children);
  }
}
class CameraGizmo {
  constructor(renderer, camera, settings) {
    this._size = 0.01;
    this._fov = 50;
    this._color = new THREE.Color("blue");
    this._fadeDurationMs = 200;
    this._showDurationMs = 1e3;
    this._renderer = renderer;
    this._camera = camera;
    this.applySettings(settings);
  }
  dispose() {
    clearTimeout(this._timeout);
    this._box.dispose();
    this._wireframe.dispose();
    this._material.dispose();
    this._materialAlways.dispose();
    this._box = void 0;
    this._wireframe = void 0;
    this._material = void 0;
    this._materialAlways = void 0;
    this._renderer.remove(this._gizmos);
    this._gizmos = void 0;
  }
  show(show = true) {
    if (!this._active)
      return;
    if (!this._gizmos) {
      this.createGizmo();
    }
    clearTimeout(this._timeout);
    this._gizmos.visible = show;
    if (show) {
      this._timeout = setTimeout(() => this.fadeOut(), this._showDurationMs);
    }
  }
  fadeOut(fading) {
    const now = new Date().getTime();
    if (!fading) {
      this._fadeEnd = now + this._fadeDurationMs;
    }
    if (now > this._fadeEnd) {
      this._gizmos.visible = false;
      this._material.opacity = this._opacity;
      this._materialAlways.opacity = this._opacityAlways;
    } else {
      requestAnimationFrame(() => this.fadeOut(true));
      const t = Math.pow((this._fadeEnd - now) / this._fadeDurationMs, 4);
      this._material.opacity = MathUtils.lerp(0, this._opacity, t);
      this._materialAlways.opacity = MathUtils.lerp(0, this._opacityAlways, t);
    }
  }
  setPosition(position) {
    if (!this._gizmos)
      return;
    this._gizmos.position.copy(position);
    this.updateScale();
  }
  setSize(size) {
    this._size = size;
  }
  setOpacity(opacity, opacityAlways) {
    this._opacity = opacity;
    this._opacityAlways = opacityAlways;
    if (!this._gizmos)
      return;
    this._material.opacity = opacity;
    this._materialAlways.opacity = opacityAlways;
  }
  setColor(color) {
    this._color = color;
    if (!this._gizmos)
      return;
    this._material.color = color;
    this._materialAlways.color = color;
  }
  applySettings(settings) {
    this._active = settings.getCameraGizmoEnable();
    this._fov = settings.getCameraFov();
    this.setColor(settings.getCameraGizmoColor());
    this.setSize(settings.getCameraGizmoSize());
    this.setOpacity(settings.getCameraGizmoOpacity(), settings.getCameraGizmoOpacityAlways());
  }
  updateScale() {
    var _a;
    const dist = this._camera.camera.position.clone().distanceTo(this._gizmos.position);
    const h = dist * Math.tan(MathUtils.degToRad(this._fov) * this._size);
    (_a = this._gizmos) == null ? void 0 : _a.scale.set(h, h, h);
  }
  createGizmo() {
    this._box = new THREE.SphereGeometry(1);
    this._wireframe = new THREE.WireframeGeometry(this._box);
    this._material = new THREE.LineBasicMaterial({
      depthTest: true,
      opacity: this._opacity,
      color: this._color,
      transparent: true
    });
    this._materialAlways = new THREE.LineBasicMaterial({
      depthTest: false,
      opacity: this._opacityAlways,
      color: this._color,
      transparent: true
    });
    this._gizmos = new THREE.Group();
    this._gizmos.add(new THREE.LineSegments(this._wireframe, this._material));
    this._gizmos.add(new THREE.LineSegments(this._wireframe, this._materialAlways));
    this._renderer.add(this._gizmos);
    this.updateScale();
  }
}
var Transparency;
((Transparency2) => {
  function isValid(value) {
    return ["all", "opaqueOnly", "transparentOnly", "allAsOpaque"].includes(value);
  }
  Transparency2.isValid = isValid;
  function requiresAlpha(mode) {
    return mode === "all" || mode === "transparentOnly";
  }
  Transparency2.requiresAlpha = requiresAlpha;
  function match(mode, transparent) {
    return mode === "allAsOpaque" || mode === "all" || !transparent && mode === "opaqueOnly" || transparent && mode === "transparentOnly";
  }
  Transparency2.match = match;
})(Transparency || (Transparency = {}));
var Geometry;
((Geometry2) => {
  function createGeometryFromInstances(g3d, instances) {
    const merger = Merger.createFromInstances(g3d, instances, "all");
    return merger.toBufferGeometry();
  }
  Geometry2.createGeometryFromInstances = createGeometryFromInstances;
  function createGeometryFromMesh(g3d, mesh, useAlpha) {
    const colors = createVertexColors(g3d, mesh, useAlpha);
    return createGeometryFromArrays(g3d.positions.subarray(g3d.getMeshVertexStart(mesh) * 3, g3d.getMeshVertexEnd(mesh) * 3), g3d.indices.subarray(g3d.getMeshIndexStart(mesh), g3d.getMeshIndexEnd(mesh)), colors, useAlpha ? 4 : 3);
  }
  Geometry2.createGeometryFromMesh = createGeometryFromMesh;
  function createVertexColors(g3d, mesh, useAlpha) {
    const colorSize = useAlpha ? 4 : 3;
    const result = new Float32Array(g3d.getMeshVertexCount(mesh) * colorSize);
    const subStart = g3d.getMeshSubmeshStart(mesh);
    const subEnd = g3d.getMeshSubmeshEnd(mesh);
    for (let submesh = subStart; submesh < subEnd; submesh++) {
      const color = g3d.getSubmeshColor(submesh);
      const start = g3d.getSubmeshIndexStart(submesh);
      const end = g3d.getSubmeshIndexEnd(submesh);
      for (let i = start; i < end; i++) {
        const v = g3d.indices[i] * colorSize;
        result[v] = color[0];
        result[v + 1] = color[1];
        result[v + 2] = color[2];
        if (useAlpha)
          result[v + 3] = color[3];
      }
    }
    return result;
  }
  class Merger {
    constructor(g3d, transparency, instances, meshes, indexCount, vertexCount) {
      this.getInstances = () => this._instances;
      this.getSubmeshes = () => this._submeshes;
      this._g3d = g3d;
      this._colorSize = Transparency.requiresAlpha(transparency) ? 4 : 3;
      this._instances = instances;
      this._meshes = meshes;
      this._indices = new Uint32Array(indexCount);
      this._vertices = new Float32Array(vertexCount * this._g3d.POSITION_SIZE);
      this._colors = new Float32Array(vertexCount * this._colorSize);
      this._submeshes = new Array(this._instances.length);
    }
    static createFromUniqueMeshes(g3d, transparency) {
      let vertexCount = 0;
      let indexCount = 0;
      const instances = [];
      const meshes = [];
      const meshCount = g3d.getMeshCount();
      for (let mesh = 0; mesh < meshCount; mesh++) {
        const meshInstances = g3d.meshInstances[mesh];
        if (!meshInstances || meshInstances.length !== 1)
          continue;
        if (!Transparency.match(transparency, g3d.meshTransparent[mesh])) {
          continue;
        }
        vertexCount += g3d.getMeshVertexCount(mesh);
        indexCount += g3d.getMeshIndexCount(mesh);
        instances.push(meshInstances[0]);
        meshes.push(mesh);
      }
      return new Merger(g3d, transparency, instances, meshes, indexCount, vertexCount);
    }
    static createFromInstances(g3d, instances, transparency) {
      let vertexCount = 0;
      let indexCount = 0;
      const instancesFiltered = [];
      const meshes = [];
      for (let i = 0; i < instances.length; i++) {
        const instance = instances[i];
        const mesh = g3d.instanceMeshes[instance];
        if (mesh < 0)
          continue;
        if (!Transparency.match(transparency, g3d.meshTransparent[mesh])) {
          continue;
        }
        vertexCount += g3d.getMeshVertexCount(mesh);
        indexCount += g3d.getMeshIndexCount(mesh);
        instancesFiltered.push(instance);
        meshes.push(mesh);
      }
      return new Merger(g3d, transparency, instancesFiltered, meshes, indexCount, vertexCount);
    }
    merge() {
      let index = 0;
      let vertex = 0;
      let offset = 0;
      const matrix = new THREE.Matrix4();
      const vector = new THREE.Vector3();
      for (let i = 0; i < this._instances.length; i++) {
        const mesh = this._meshes[i];
        const instance = this._instances[i];
        this._submeshes[i] = index;
        const indexStart = this._g3d.getMeshIndexStart(mesh);
        const indexEnd = this._g3d.getMeshIndexEnd(mesh);
        for (let i2 = indexStart; i2 < indexEnd; i2++) {
          this._indices[index++] = this._g3d.indices[i2] + offset;
        }
        const subStart = this._g3d.getMeshSubmeshStart(mesh);
        const subEnd = this._g3d.getMeshSubmeshEnd(mesh);
        for (let sub = subStart; sub < subEnd; sub++) {
          const startIndex = this._g3d.getSubmeshIndexStart(sub);
          const endIndex = this._g3d.getSubmeshIndexEnd(sub);
          const subColor = this._g3d.getSubmeshColor(sub);
          for (let i2 = startIndex; i2 < endIndex; i2++) {
            const v = (this._g3d.indices[i2] + offset) * this._colorSize;
            this._colors[v] = subColor[0];
            this._colors[v + 1] = subColor[1];
            this._colors[v + 2] = subColor[2];
            if (this._colorSize > 3) {
              this._colors[v + 3] = subColor[3];
            }
          }
        }
        getInstanceMatrix(this._g3d, instance, matrix);
        const vertexStart = this._g3d.getMeshVertexStart(mesh);
        const vertexEnd = this._g3d.getMeshVertexEnd(mesh);
        for (let p = vertexStart; p < vertexEnd; p++) {
          vector.fromArray(this._g3d.positions, p * this._g3d.POSITION_SIZE);
          vector.applyMatrix4(matrix);
          vector.toArray(this._vertices, vertex);
          vertex += this._g3d.POSITION_SIZE;
        }
        offset += vertexEnd - vertexStart;
      }
    }
    toBufferGeometry() {
      this.merge();
      const geometry = createGeometryFromArrays(this._vertices, this._indices, this._colors, this._colorSize);
      return geometry;
    }
  }
  Geometry2.Merger = Merger;
  function createGeometryFromArrays(vertices, indices, vertexColors = void 0, colorSize = 3) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.Uint32BufferAttribute(indices, 1));
    if (vertexColors) {
      geometry.setAttribute("color", new THREE.BufferAttribute(vertexColors, colorSize));
    }
    return geometry;
  }
  Geometry2.createGeometryFromArrays = createGeometryFromArrays;
  function getInstanceMatrix(g3d, instance, target = new THREE.Matrix4()) {
    const matrixAsArray = g3d.getInstanceMatrix(instance);
    target.fromArray(matrixAsArray);
    return target;
  }
  Geometry2.getInstanceMatrix = getInstanceMatrix;
})(Geometry || (Geometry = {}));
var Materials;
((Materials2) => {
  class Library {
    constructor(opaque, transparent, wireframe) {
      this.opaque = opaque != null ? opaque : createOpaque();
      this.transparent = transparent != null ? transparent : createTransparent();
      this.wireframe = wireframe != null ? wireframe : createWireframe();
    }
    dispose() {
      this.opaque.dispose();
      this.transparent.dispose();
      this.wireframe.dispose();
      this.opaque = void 0;
      this.transparent = void 0;
      this.wireframe = void 0;
    }
  }
  Materials2.Library = Library;
  function createBase() {
    return new THREE.MeshPhongMaterial({
      color: 10066329,
      vertexColors: true,
      flatShading: true,
      side: THREE.DoubleSide,
      shininess: 70
    });
  }
  Materials2.createBase = createBase;
  function createOpaque() {
    const mat = createBase();
    patchMaterial(mat);
    return mat;
  }
  Materials2.createOpaque = createOpaque;
  function createTransparent() {
    const mat = createBase();
    mat.transparent = true;
    patchMaterial(mat);
    return mat;
  }
  Materials2.createTransparent = createTransparent;
  function patchMaterial(material) {
    material.onBeforeCompile = (shader) => {
      patchShader(shader);
      material.userData.shader = shader;
    };
  }
  Materials2.patchMaterial = patchMaterial;
  function patchShader(shader) {
    shader.vertexShader = shader.vertexShader.replace("#include <color_pars_vertex>", `
        #include <color_pars_vertex>
        
        // COLORING

        // attribute for color override
        // merged meshes use it as vertex attribute
        // instanced meshes use it as an instance attribute
        attribute float colored;

        // There seems to be an issue where setting mehs.instanceColor
        // doesn't properly set USE_INSTANCING_COLOR
        // so we always use it as a fix
        #ifndef USE_INSTANCING_COLOR
        attribute vec3 instanceColor;
        #endif

        // Passed to fragment to ignore phong model
        varying float vColored;
        
        // VISIBILITY

        // Instance or vertex attribute to hide objects 
        #ifdef USE_INSTANCING
          attribute float ignoreInstance;
        #else
          attribute float ignoreVertex;
        #endif

        // Passed to fragment to discard them
        varying float vIgnore;

        `).replace("#include <color_vertex>", `
          vColor = color;
          vColored = colored;

          // COLORING

          // colored == 1 -> instance color
          // colored == 0 -> vertex color
          #ifdef USE_INSTANCING
            vColor.xyz = colored * instanceColor.xyz + (1.0f - colored) * color.xyz;
          #endif


          // VISIBILITY

          // Set frag ignore from instance or vertex attribute
          #ifdef USE_INSTANCING
            vIgnore = ignoreInstance;
          #else
            vIgnore = ignoreVertex;
          #endif

        `);
    shader.fragmentShader = shader.fragmentShader.replace("#include <clipping_planes_pars_fragment>", `
        #include <clipping_planes_pars_fragment>
        varying float vIgnore;
        varying float vColored;
        `).replace("#include <output_fragment>", `
          // VISIBILITY
          if (vIgnore > 0.0f)
            discard;
         
          // COLORING
          // vColored == 1 -> Vertex Color * light 
          // vColored == 0 -> Phong Color 
          float d = length(outgoingLight);
          gl_FragColor = vec4(vColored * vColor.xyz * d + (1.0f - vColored) * outgoingLight.xyz, diffuseColor.a);
        `);
    return shader;
  }
  Materials2.patchShader = patchShader;
  function createWireframe() {
    const material = new THREE.LineBasicMaterial({
      depthTest: false,
      opacity: 1,
      color: new THREE.Color(255),
      transparent: true
    });
    return material;
  }
  Materials2.createWireframe = createWireframe;
  let materials;
  function getDefaultLibrary() {
    materials = materials != null ? materials : new Library();
    return materials;
  }
  Materials2.getDefaultLibrary = getDefaultLibrary;
  function dispose() {
    materials.dispose();
    materials = void 0;
  }
  Materials2.dispose = dispose;
})(Materials || (Materials = {}));
var Mesh;
((Mesh2) => {
  class Builder {
    constructor(materials = void 0) {
      this.materials = materials != null ? materials : Materials.getDefaultLibrary();
    }
    createInstancedMeshes(g3d, transparency, instances) {
      const result = [];
      const set = instances ? new Set(instances) : void 0;
      for (let mesh = 0; mesh < g3d.getMeshCount(); mesh++) {
        let meshInstances = g3d.meshInstances[mesh];
        if (!meshInstances)
          continue;
        meshInstances = set ? meshInstances.filter((i) => set.has(i)) : meshInstances;
        if (meshInstances.length <= 1)
          continue;
        if (!Transparency.match(transparency, g3d.meshTransparent[mesh])) {
          continue;
        }
        const useAlpha = Transparency.requiresAlpha(transparency) && g3d.meshTransparent[mesh];
        const geometry = Geometry.createGeometryFromMesh(g3d, mesh, useAlpha);
        const resultMesh = this.createInstancedMesh(geometry, g3d, meshInstances, useAlpha);
        result.push(resultMesh);
      }
      return result;
    }
    createInstancedMesh(geometry, g3d, instances, useAlpha) {
      const material = useAlpha ? this.materials.transparent : this.materials.opaque;
      const result = new THREE.InstancedMesh(geometry, material, instances.length);
      for (let i = 0; i < instances.length; i++) {
        const matrix = Geometry.getInstanceMatrix(g3d, instances[i]);
        result.setMatrixAt(i, matrix);
      }
      result.userData.instances = instances;
      return result;
    }
    createMergedMesh(g3d, transparency, instances) {
      const merger = instances ? Geometry.Merger.createFromInstances(g3d, instances, transparency) : Geometry.Merger.createFromUniqueMeshes(g3d, transparency);
      const geometry = merger.toBufferGeometry();
      const material = Transparency.requiresAlpha(transparency) ? this.materials.transparent : this.materials.opaque;
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.merged = true;
      mesh.userData.instances = merger.getInstances();
      mesh.userData.submeshes = merger.getSubmeshes();
      return mesh;
    }
    createWireframe(g3d, instances) {
      const geometry = Geometry.createGeometryFromInstances(g3d, instances);
      const wireframe = new THREE.WireframeGeometry(geometry);
      return new THREE.LineSegments(wireframe, this.materials.wireframe);
    }
  }
  Mesh2.Builder = Builder;
  let defaultBuilder;
  function getDefaultBuilder() {
    return defaultBuilder != null ? defaultBuilder : defaultBuilder = new Builder();
  }
  Mesh2.getDefaultBuilder = getDefaultBuilder;
  function dispose() {
    defaultBuilder = void 0;
  }
  Mesh2.dispose = dispose;
})(Mesh || (Mesh = {}));
class Scene {
  constructor() {
    this.meshes = [];
    this.boundingBox = new THREE.Box3();
    this._instanceToThreeMesh = /* @__PURE__ */ new Map();
    this._threeMeshIdToInstances = /* @__PURE__ */ new Map();
  }
  getMeshFromInstance(instance) {
    return this._instanceToThreeMesh.has(instance) ? this._instanceToThreeMesh.get(instance) : [];
  }
  getInstanceFromMesh(mesh, index) {
    if (!mesh || index < 0)
      return -1;
    const instances = this._threeMeshIdToInstances.get(mesh.id);
    if (!instances)
      return -1;
    return instances[index];
  }
  applyMatrix4(matrix) {
    for (let m = 0; m < this.meshes.length; m++) {
      this.meshes[m].matrixAutoUpdate = false;
      this.meshes[m].matrix.copy(matrix);
    }
    this.boundingBox.applyMatrix4(matrix);
  }
  setVim(vim) {
    for (let m = 0; m < this.meshes.length; m++) {
      this.meshes[m].userData.vim = vim;
    }
  }
  addMergedMesh(mesh) {
    var _a, _b;
    const instances = mesh.userData.instances;
    if (!instances) {
      throw new Error("Expected mesh to have userdata instances : number[]");
    }
    for (let i = 0; i < instances.length; i++) {
      this._instanceToThreeMesh.set(instances[i], [mesh, i]);
    }
    mesh.geometry.computeBoundingBox();
    const box = mesh.geometry.boundingBox;
    this.boundingBox = (_b = (_a = this.boundingBox) == null ? void 0 : _a.union(box)) != null ? _b : box.clone();
    this._threeMeshIdToInstances.set(mesh.id, instances);
    this.meshes.push(mesh);
    return this;
  }
  addInstancedMesh(mesh) {
    this.registerInstancedMesh(mesh);
    this.meshes.push(mesh);
    return this;
  }
  static createFromInstancedMeshes(meshes) {
    const scene = new Scene();
    for (let m = 0; m < meshes.length; m++) {
      scene.registerInstancedMesh(meshes[m]);
    }
    scene.meshes = meshes;
    return scene;
  }
  registerInstancedMesh(mesh) {
    var _a, _b;
    const instances = mesh.userData.instances;
    if (!instances || instances.length === 0) {
      throw new Error("Expected mesh to have userdata instances : number[] with at least one member");
    }
    if (mesh.count === 0) {
      throw new Error("Expected mesh to have at least one instance");
    }
    for (let i = 0; i < instances.length; i++) {
      this._instanceToThreeMesh.set(instances[i], [mesh, i]);
    }
    const box = this.computeIntancedMeshBoundingBox(mesh);
    this.boundingBox = (_b = (_a = this.boundingBox) == null ? void 0 : _a.union(box)) != null ? _b : box.clone();
    this._threeMeshIdToInstances.set(mesh.id, instances);
  }
  merge(other) {
    var _a, _b;
    other.meshes.forEach((mesh) => this.meshes.push(mesh));
    other._instanceToThreeMesh.forEach((value, key) => {
      this._instanceToThreeMesh.set(key, value);
    });
    other._threeMeshIdToInstances.forEach((value, key) => {
      this._threeMeshIdToInstances.set(key, value);
    });
    this.boundingBox = (_b = (_a = this.boundingBox) == null ? void 0 : _a.union(other.boundingBox)) != null ? _b : other.boundingBox.clone();
    return this;
  }
  dispose() {
    for (let i = 0; i < this.meshes.length; i++) {
      this.meshes[i].geometry.dispose();
    }
    this.meshes.length = 0;
    this._instanceToThreeMesh.clear();
    this._threeMeshIdToInstances.clear();
  }
  computeIntancedMeshBoundingBox(mesh) {
    let result;
    const matrix = new THREE.Matrix4();
    const box = new THREE.Box3();
    mesh.geometry.computeBoundingBox();
    for (let i = 0; i < mesh.count; i++) {
      mesh.getMatrixAt(i, matrix);
      box.copy(mesh.geometry.boundingBox);
      box.applyMatrix4(matrix);
      result = result ? result.union(box) : box.clone();
    }
    return result;
  }
  static createFromG3d(g3d, transparency = "all", instances = void 0) {
    const scene = new Scene();
    const shared = Scene.createFromInstanciableMeshes(g3d, transparency, instances);
    scene.merge(shared);
    if (transparency !== "transparentOnly") {
      const opaque = Scene.createFromMergeableMeshes(g3d, transparency === "allAsOpaque" ? "allAsOpaque" : "opaqueOnly", instances);
      scene.merge(opaque);
    }
    if (Transparency.requiresAlpha(transparency)) {
      const transparent = Scene.createFromMergeableMeshes(g3d, "transparentOnly", instances);
      scene.merge(transparent);
    }
    return scene;
  }
  static createFromInstanciableMeshes(g3d, transparency, instances = void 0, builder = Mesh.getDefaultBuilder()) {
    const meshes = builder.createInstancedMeshes(g3d, transparency, instances);
    return Scene.createFromInstancedMeshes(meshes);
  }
  static createFromMergeableMeshes(g3d, transparency, instances = void 0, builder = Mesh.getDefaultBuilder()) {
    const mesh = builder.createMergedMesh(g3d, transparency, instances);
    return new Scene().addMergedMesh(mesh);
  }
}
class RenderScene {
  constructor() {
    this._scenes = [];
    this.scene = new THREE.Scene();
  }
  getBoundingSphere(target = new THREE.Sphere()) {
    var _a;
    return (_a = this._boundingBox) == null ? void 0 : _a.getBoundingSphere(target);
  }
  getBoundingBox(target = new THREE.Box3()) {
    return target == null ? void 0 : target.copy(this._boundingBox);
  }
  add(target) {
    if (target instanceof Scene) {
      this.addScene(target);
    } else {
      this.scene.add(target);
    }
  }
  remove(target) {
    if (target instanceof Scene) {
      this.removeScene(target);
    } else {
      this.scene.remove(target);
    }
  }
  clear() {
    this.scene.clear();
    this._boundingBox = void 0;
  }
  addScene(scene) {
    this._scenes.push(scene);
    scene.meshes.forEach((m) => {
      this.scene.add(m);
    });
    this._boundingBox = this._boundingBox ? this._boundingBox.union(scene.boundingBox) : scene.boundingBox.clone();
  }
  removeScene(scene) {
    this._scenes = this._scenes.filter((f) => f !== scene);
    for (let i = 0; i < scene.meshes.length; i++) {
      this.scene.remove(scene.meshes[i]);
    }
    this._boundingBox = this._scenes.length > 0 ? this._scenes.map((s) => s.boundingBox.clone()).reduce((b1, b2) => b1.union(b2)) : void 0;
  }
}
class Viewport {
  constructor(settings) {
    this._resizeCallbacks = [];
    const [canvas, owned] = Viewport.getOrCreateCanvas(settings.getCanvasId());
    this.canvas = canvas;
    this._ownedCanvas = owned;
    this.registerResize(settings.getCanvasResizeDelay());
  }
  static getOrCreateCanvas(canvasId) {
    let canvas = canvasId ? document.getElementById(canvasId) : void 0;
    if (canvas)
      return [canvas, false];
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    return [canvas, true];
  }
  dispose() {
    this._unregisterResize();
    this._unregisterResize = void 0;
    if (this._ownedCanvas)
      this.canvas.remove();
  }
  getParentSize() {
    return [
      this.canvas.parentElement.clientWidth,
      this.canvas.parentElement.clientHeight
    ];
  }
  getSize() {
    return [this.canvas.clientWidth, this.canvas.clientHeight];
  }
  getAspectRatio() {
    return this.canvas.parentElement.clientWidth / this.canvas.parentElement.clientHeight;
  }
  onResize(callback) {
    console.log("register callbakc");
    this._resizeCallbacks.push(callback);
  }
  registerResize(timeout) {
    let timerId;
    const onResize = () => {
      if (timerId !== void 0) {
        clearTimeout(timerId);
        timerId = void 0;
      }
      timerId = setTimeout(() => {
        timerId = void 0;
        this._resizeCallbacks.forEach((cb) => cb());
      }, timeout);
    };
    window.addEventListener("resize", onResize);
    this._unregisterResize = () => window.removeEventListener("resize", onResize);
  }
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
var root$1 = root;
var Symbol$1 = root$1.Symbol;
var Symbol$2 = Symbol$1;
var objectProto$c = Object.prototype;
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
var nativeObjectToString$1 = objectProto$c.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$b = Object.prototype;
var nativeObjectToString = objectProto$b.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isArray = Array.isArray;
var isArray$1 = isArray;
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
var coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$a = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty$8).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap = getNative(root$1, "WeakMap");
var WeakMap$1 = WeakMap;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var baseCreate$1 = baseCreate;
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var defineProperty$1 = defineProperty;
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$7.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
var objectProto$8 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$8;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$6.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
var isBuffer$1 = isBuffer;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray$1 = isTypedArray;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
var nativeKeys$1 = nativeKeys;
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$4.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$3.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var nativeCreate = getNative(Object, "create");
var nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : void 0;
}
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$1.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root$1, "Map");
var Map$2 = Map$1;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
var getPrototype$1 = getPrototype;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$1 = Object.prototype;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var getSymbols$1 = getSymbols;
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
var getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}
var DataView = getNative(root$1, "DataView");
var DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
var Promise$2 = Promise$1;
var Set$1 = getNative(root$1, "Set");
var Set$2 = Set$1;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2 || Map$2 && getTag(new Map$2()) != mapTag$3 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag$3 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var getTag$1 = getTag;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array$1 = root$1.Uint8Array;
var Uint8Array$2 = Uint8Array$1;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$2(result).set(new Uint8Array$2(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$1:
      return cloneSymbol(object);
  }
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
var mapTag$1 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$1;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
var isMap$1 = isMap;
var setTag$1 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
var isSet$1 = isSet;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
class VimSettings {
  constructor(options) {
    this.getOptions = () => cloneDeep(this.options);
    this.getPosition = () => toVec(this.options.position);
    this.getRotation = () => toQuaternion(this.options.rotation);
    this.getScale = () => scalarToVec(this.options.scale);
    this.getMatrix = () => new THREE.Matrix4().compose(this.getPosition(), this.getRotation(), this.getScale());
    this.getTransparency = () => this.options.transparency;
    const fallback = {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
      transparency: "all",
      forceDownload: false
    };
    this.options = options ? cjs(fallback, options, void 0) : fallback;
    this.options.transparency = Transparency.isValid(this.options.transparency) ? this.options.transparency : "all";
  }
}
function toVec(obj) {
  return new THREE.Vector3(obj.x, obj.y, obj.z);
}
function toQuaternion(rot) {
  return new THREE.Quaternion().setFromEuler(toEuler(toVec(rot)));
}
function scalarToVec(x) {
  return new THREE.Vector3(x, x, x);
}
function toEuler(rot) {
  return new THREE.Euler(rot.x * Math.PI / 180, rot.y * Math.PI / 180, rot.z * Math.PI / 180);
}
class G3dAttributeDescriptor {
  constructor(description, association, semantic, attributeTypeIndex, dataType, dataArity) {
    if (!description.startsWith("g3d:")) {
      throw new Error(`${description} must start with 'g3d'`);
    }
    this.description = description;
    this.association = association;
    this.semantic = semantic;
    this.attributeTypeIndex = attributeTypeIndex;
    this.dataType = dataType;
    this.dataArity = parseInt(dataArity);
  }
  static fromString(descriptor) {
    const desc = descriptor.split(":");
    if (desc.length !== 6) {
      throw new Error(`${descriptor}, must have 6 components delimited by ':'`);
    }
    return new this(descriptor, desc[1], desc[2], desc[3], desc[4], desc[5]);
  }
  matches(other) {
    const match = (a, b) => a === "*" || b === "*" || a === b;
    return match(this.association, other.association) && match(this.semantic, other.semantic) && match(this.attributeTypeIndex, other.attributeTypeIndex) && match(this.dataType, other.dataType);
  }
}
class G3dAttribute {
  constructor(descriptor, bytes) {
    this.descriptor = descriptor;
    this.bytes = bytes;
    this.data = G3dAttribute.castData(bytes, descriptor.dataType);
  }
  static fromString(descriptor, buffer) {
    return new this(G3dAttributeDescriptor.fromString(descriptor), buffer);
  }
  static castData(bytes, dataType) {
    switch (dataType) {
      case "float32":
        return new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4);
      case "float64":
        throw new Float64Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 8);
      case "int8":
        return bytes;
      case "int16":
        return new Int16Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 2);
      case "int32":
        return new Int32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4);
      default:
        throw new Error("Unrecognized attribute data type " + dataType);
    }
  }
}
class AbstractG3d {
  constructor(meta, attributes) {
    this.meta = meta;
    this.attributes = attributes;
  }
  findAttribute(descriptor) {
    const filter = G3dAttributeDescriptor.fromString(descriptor);
    for (let i = 0; i < this.attributes.length; ++i) {
      const attribute = this.attributes[i];
      if (attribute.descriptor.matches(filter))
        return attribute;
    }
  }
  static createFromBfast(bfast) {
    const attributes = VimAttributes.all.map((name) => new G3dAttribute(G3dAttributeDescriptor.fromString(name), bfast.getBuffer(name)));
    return new AbstractG3d("meta", attributes);
  }
}
const _VimAttributes = class {
};
let VimAttributes = _VimAttributes;
VimAttributes.positions = "g3d:vertex:position:0:float32:3";
VimAttributes.indices = "g3d:corner:index:0:int32:1";
VimAttributes.instanceMeshes = "g3d:instance:mesh:0:int32:1";
VimAttributes.instanceTransforms = "g3d:instance:transform:0:float32:16";
VimAttributes.meshSubmeshes = "g3d:mesh:submeshoffset:0:int32:1";
VimAttributes.submeshIndexOffsets = "g3d:submesh:indexoffset:0:int32:1";
VimAttributes.submeshMaterials = "g3d:submesh:material:0:int32:1";
VimAttributes.materialColors = "g3d:material:color:0:float32:4";
VimAttributes.all = [
  _VimAttributes.positions,
  _VimAttributes.indices,
  _VimAttributes.instanceMeshes,
  _VimAttributes.instanceTransforms,
  _VimAttributes.meshSubmeshes,
  _VimAttributes.submeshIndexOffsets,
  _VimAttributes.submeshMaterials,
  _VimAttributes.materialColors
];
class G3d {
  constructor(g3d) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    this.MATRIX_SIZE = 16;
    this.COLOR_SIZE = 4;
    this.POSITION_SIZE = 3;
    this.DEFAULT_COLOR = new Float32Array([1, 1, 1, 1]);
    this.computeMeshInstances = () => {
      const result = [];
      for (let i = 0; i < this.instanceMeshes.length; i++) {
        const mesh = this.instanceMeshes[i];
        if (mesh < 0)
          continue;
        const instanceIndices = result[mesh];
        if (instanceIndices)
          instanceIndices.push(i);
        else
          result[mesh] = [i];
      }
      return result;
    };
    this.getVertexCount = () => this.positions.length / this.POSITION_SIZE;
    this.getMeshCount = () => this.meshSubmeshes.length;
    this.getInstanceCount = () => this.instanceMeshes.length;
    this.getMaterialCount = () => this.materialColors.length / this.COLOR_SIZE;
    this.rawG3d = g3d;
    this.positions = (_a = g3d.findAttribute(VimAttributes.positions)) == null ? void 0 : _a.data;
    const tmp = (_b = g3d.findAttribute(VimAttributes.indices)) == null ? void 0 : _b.data;
    this.indices = new Uint32Array(tmp.buffer, tmp.byteOffset, tmp.length);
    this.meshSubmeshes = (_c = g3d.findAttribute(VimAttributes.meshSubmeshes)) == null ? void 0 : _c.data;
    this.submeshIndexOffset = (_d = g3d.findAttribute(VimAttributes.submeshIndexOffsets)) == null ? void 0 : _d.data;
    this.submeshMaterial = (_e = g3d.findAttribute(VimAttributes.submeshMaterials)) == null ? void 0 : _e.data;
    this.materialColors = (_f = g3d.findAttribute(VimAttributes.materialColors)) == null ? void 0 : _f.data;
    this.instanceMeshes = (_g = g3d.findAttribute(VimAttributes.instanceMeshes)) == null ? void 0 : _g.data;
    this.instanceTransforms = (_h = g3d.findAttribute(VimAttributes.instanceTransforms)) == null ? void 0 : _h.data;
    this.meshVertexOffsets = this.computeMeshVertexOffsets();
    this.rebaseIndices();
    this.meshInstances = this.computeMeshInstances();
    this.meshTransparent = this.computeMeshIsTransparent();
  }
  computeMeshVertexOffsets() {
    const result = new Int32Array(this.getMeshCount());
    for (let m = 0; m < result.length; m++) {
      let min = Number.MAX_SAFE_INTEGER;
      const start = this.getMeshIndexStart(m);
      const end = this.getMeshIndexEnd(m);
      for (let i = start; i < end; i++) {
        min = Math.min(min, this.indices[i]);
      }
      result[m] = min;
    }
    return result;
  }
  rebaseIndices() {
    const count = this.getMeshCount();
    for (let m = 0; m < count; m++) {
      const offset = this.meshVertexOffsets[m];
      const start = this.getMeshIndexStart(m);
      const end = this.getMeshIndexEnd(m);
      for (let i = start; i < end; i++) {
        this.indices[i] -= offset;
      }
    }
  }
  computeMeshIsTransparent() {
    const result = new Array(this.getMeshCount());
    for (let m = 0; m < result.length; m++) {
      const subStart = this.getMeshSubmeshStart(m);
      const subEnd = this.getMeshSubmeshEnd(m);
      for (let s = subStart; s < subEnd; s++) {
        const material = this.submeshMaterial[s];
        const alpha = this.materialColors[material * this.COLOR_SIZE + this.COLOR_SIZE - 1];
        result[m] = result[m] || alpha < 1;
      }
    }
    return result;
  }
  getMeshIndexStart(mesh) {
    const subStart = this.getMeshSubmeshStart(mesh);
    return this.getSubmeshIndexStart(subStart);
  }
  getMeshIndexEnd(mesh) {
    const subEnd = this.getMeshSubmeshEnd(mesh);
    return this.getSubmeshIndexEnd(subEnd - 1);
  }
  getMeshIndexCount(mesh) {
    return this.getMeshIndexEnd(mesh) - this.getMeshIndexStart(mesh);
  }
  getMeshVertexStart(mesh) {
    return this.meshVertexOffsets[mesh];
  }
  getMeshVertexEnd(mesh) {
    return mesh < this.meshVertexOffsets.length - 1 ? this.meshVertexOffsets[mesh + 1] : this.getVertexCount();
  }
  getMeshVertexCount(mesh) {
    return this.getMeshVertexEnd(mesh) - this.getMeshVertexStart(mesh);
  }
  getMeshSubmeshStart(mesh) {
    return this.meshSubmeshes[mesh];
  }
  getMeshSubmeshEnd(mesh) {
    return mesh < this.meshSubmeshes.length - 1 ? this.meshSubmeshes[mesh + 1] : this.submeshIndexOffset.length;
  }
  getMeshSubmeshCount(mesh) {
    return this.getMeshSubmeshEnd(mesh) - this.getMeshSubmeshStart(mesh);
  }
  getSubmeshIndexStart(submesh) {
    return this.submeshIndexOffset[submesh];
  }
  getSubmeshIndexEnd(submesh) {
    return submesh < this.submeshIndexOffset.length - 1 ? this.submeshIndexOffset[submesh + 1] : this.indices.length;
  }
  getSubmeshIndexCount(submesh) {
    return this.getSubmeshIndexEnd(submesh) - this.getSubmeshIndexStart(submesh);
  }
  getSubmeshColor(submesh) {
    return this.getMaterialColor(this.submeshMaterial[submesh]);
  }
  getInstanceMatrix(instance) {
    return this.instanceTransforms.subarray(instance * this.MATRIX_SIZE, (instance + 1) * this.MATRIX_SIZE);
  }
  getMaterialColor(material) {
    if (material < 0)
      return this.DEFAULT_COLOR;
    return this.materialColors.subarray(material * this.COLOR_SIZE, (material + 1) * this.COLOR_SIZE);
  }
  static createFromBfast(bfast) {
    return new G3d(AbstractG3d.createFromBfast(bfast));
  }
  validate() {
    const isPresent = (attribute, label) => {
      if (!attribute) {
        throw new Error(`Missing Attribute Buffer: ${label}`);
      }
    };
    isPresent(this.positions, "position");
    isPresent(this.indices, "indices");
    isPresent(this.instanceMeshes, "instanceMeshes");
    isPresent(this.instanceTransforms, "instanceTransforms");
    isPresent(this.meshSubmeshes, "meshSubmeshes");
    isPresent(this.submeshIndexOffset, "submeshIndexOffset");
    isPresent(this.submeshMaterial, "submeshMaterial");
    isPresent(this.materialColors, "materialColors");
    if (this.positions.length % this.POSITION_SIZE !== 0) {
      throw new Error("Invalid position buffer, must be divisible by " + this.POSITION_SIZE);
    }
    if (this.indices.length % 3 !== 0) {
      throw new Error("Invalid Index Count, must be divisible by 3");
    }
    for (let i = 0; i < this.indices.length; i++) {
      if (this.indices[i] < 0 || this.indices[i] >= this.positions.length) {
        throw new Error("Vertex index out of bound");
      }
    }
    if (this.instanceMeshes.length !== this.instanceTransforms.length / this.MATRIX_SIZE) {
      throw new Error("Instance buffers mismatched");
    }
    if (this.instanceTransforms.length % this.MATRIX_SIZE !== 0) {
      throw new Error("Invalid InstanceTransform buffer, must respect arity " + this.MATRIX_SIZE);
    }
    for (let i = 0; i < this.instanceMeshes.length; i++) {
      if (this.instanceMeshes[i] >= this.meshSubmeshes.length) {
        throw new Error("Instance Mesh Out of range.");
      }
    }
    for (let i = 0; i < this.meshSubmeshes.length; i++) {
      if (this.meshSubmeshes[i] < 0 || this.meshSubmeshes[i] >= this.submeshIndexOffset.length) {
        throw new Error("MeshSubmeshOffset out of bound at");
      }
    }
    for (let i = 0; i < this.meshSubmeshes.length - 1; i++) {
      if (this.meshSubmeshes[i] >= this.meshSubmeshes[i + 1]) {
        throw new Error("MeshSubmesh out of sequence.");
      }
    }
    if (this.submeshIndexOffset.length !== this.submeshMaterial.length) {
      throw new Error("Mismatched submesh buffers");
    }
    for (let i = 0; i < this.submeshIndexOffset.length; i++) {
      if (this.submeshIndexOffset[i] < 0 || this.submeshIndexOffset[i] >= this.indices.length) {
        throw new Error("SubmeshIndexOffset out of bound");
      }
    }
    for (let i = 0; i < this.submeshIndexOffset.length; i++) {
      if (this.submeshIndexOffset[i] % 3 !== 0) {
        throw new Error("Invalid SubmeshIndexOffset, must be divisible by 3");
      }
    }
    for (let i = 0; i < this.submeshIndexOffset.length - 1; i++) {
      if (this.submeshIndexOffset[i] >= this.submeshIndexOffset[i + 1]) {
        throw new Error("SubmeshIndexOffset out of sequence.");
      }
    }
    for (let i = 0; i < this.submeshMaterial.length; i++) {
      if (this.submeshMaterial[i] >= this.materialColors.length) {
        throw new Error("SubmeshMaterial out of bound");
      }
    }
    if (this.materialColors.length % this.COLOR_SIZE !== 0) {
      throw new Error("Invalid material color buffer, must be divisible by " + this.COLOR_SIZE);
    }
  }
}
const TypeSizes = {
  byte: 1,
  short: 2,
  int: 4,
  float: 4,
  long: 8,
  double: 8,
  string: 4,
  index: 4,
  numeric: 8,
  default: 4
};
function getTypeSize(typeName) {
  if (typeName in TypeSizes)
    return TypeSizes[typeName];
  else
    return TypeSizes.default;
}
const ArrayConstructors = {
  byte: Int8Array,
  short: Int16Array,
  int: Int32Array,
  float: Float32Array,
  long: Float64Array,
  double: Float64Array,
  string: Int32Array,
  index: Int32Array,
  numeric: Float64Array,
  default: Uint8Array
};
function getTypeArrayConstructor(typeName) {
  if (typeName in ArrayConstructors)
    return ArrayConstructors[typeName];
  else
    return ArrayConstructors.default;
}
function invertMap(data) {
  const result = /* @__PURE__ */ new Map();
  for (let i = 0; i < data.length; i++) {
    const value = data[i];
    if (!result.has(value)) {
      result.set(value, [i]);
    } else {
      result.get(value).push(i);
    }
  }
  return result;
}
class EntityTable {
  constructor(bfast, name) {
    this.name = name;
    this.columns = /* @__PURE__ */ new Map();
    this.numRows = -1;
    for (let i = 0; i < bfast.buffers.length; ++i) {
      const name2 = bfast.names[i];
      const buffer = bfast.buffers[i];
      const column = new EntityColumn(name2, buffer);
      if (this.numRows < 0)
        this.numRows = column.data.length;
      if (this.numRows != column.data.length)
        throw new Error("Inconsistent number of rows");
      this.columns.set(column.name, column);
    }
  }
  getColumn(name) {
    return this.columns.get(name);
  }
  getColumnData(name) {
    return this.getColumn(name).data;
  }
  getRowData(n) {
    let r = {};
    for (let [name, col] of this.columns) {
      r[name] = col.data[n];
    }
    return r;
  }
}
class EntityColumn {
  constructor(name, buffer) {
    const split = name.indexOf(":");
    this.type = name.slice(0, split);
    this.name = name.slice(split + 1);
    this.typeSize = getTypeSize(this.type);
    const length = buffer.length / this.typeSize;
    const ctor = getTypeArrayConstructor(this.type);
    this.data = new ctor(buffer.buffer, buffer.byteOffset, length);
  }
}
class Document {
  constructor(bfast) {
    this.g3d = G3d.createFromBfast(bfast.getChild("geometry"));
    this.strings = new TextDecoder("utf-8").decode(bfast.getBuffer("strings")).split("\0");
    this.entities = bfast.getChild("entities");
    this.tables = /* @__PURE__ */ new Map();
    for (const [k, child] of this.entities.children.entries()) {
      const table = new EntityTable(child, k);
      this.tables.set(table.name, table);
    }
    this.instanceToElement = this.getColumnData("Vim.Node", "Vim.Element:Element");
    this.elementIds = this.getColumnData("Vim.Element", "Id");
    this.elementToInstances = invertMap(this.instanceToElement);
    this.elementIdToElements = invertMap(this.elementIds);
  }
  getTable(name) {
    return this.tables.get(name);
  }
  getColumnData(tableName, columnName) {
    return this.getTable(tableName).getColumnData(columnName);
  }
  getRowData(tableName, row) {
    return this.getTable(tableName).getRowData(row);
  }
  getInstanceFromElement(elementIndex) {
    return this.elementToInstances.get(elementIndex);
  }
  getElementFromInstance(instance) {
    return this.instanceToElement[instance];
  }
  getElementFromElementId(elementId) {
    return this.elementIdToElements.get(elementId);
  }
  getElementId(element) {
    return this.elementIds[element];
  }
  getElementData(element) {
    return this.getRowData("Vim.Element", element);
  }
}
class Object$1 {
  constructor(vim, element, instances, meshes) {
    this._visible = true;
    this.vim = vim;
    this.element = element;
    this.instances = instances;
    this._meshes = meshes;
  }
  get hasMesh() {
    var _a;
    return (_a = this._meshes) == null ? void 0 : _a.length;
  }
  updateMeshes(meshes) {
    this._meshes = meshes;
    if (!meshes)
      return;
    if (this.color) {
      this.color = this._color;
    }
  }
  getBimElement() {
    return this.vim.document.getElementData(this.element);
  }
  get elementId() {
    return this.vim.document.getElementId(this.element);
  }
  getBoundingBox() {
    if (!this.instances)
      return;
    if (this._boundingBox)
      return this._boundingBox;
    const geometry = Geometry.createGeometryFromInstances(this.vim.document.g3d, this.instances);
    geometry.applyMatrix4(this.vim.getMatrix());
    geometry.computeBoundingBox();
    this._boundingBox = geometry.boundingBox;
    geometry.dispose();
    return this._boundingBox;
  }
  getCenter(target = new THREE.Vector3()) {
    var _a;
    return (_a = this.getBoundingBox()) == null ? void 0 : _a.getCenter(target);
  }
  getBoundingSphere(target = new THREE.Sphere()) {
    var _a;
    return (_a = this.getBoundingBox()) == null ? void 0 : _a.getBoundingSphere(target);
  }
  createWireframe() {
    if (!this.instances)
      return;
    const wireframe = Mesh.getDefaultBuilder().createWireframe(this.vim.document.g3d, this.instances);
    wireframe.applyMatrix4(this.vim.getMatrix());
    return wireframe;
  }
  createGeometry() {
    if (!this.instances)
      return;
    const geometry = Geometry.createGeometryFromInstances(this.vim.document.g3d, this.instances);
    geometry.applyMatrix4(this.vim.getMatrix());
    return geometry;
  }
  get color() {
    return this._color;
  }
  set color(color) {
    if (!this._color || !color ? !this._color && !color : this._color.equals(color)) {
      return;
    }
    this._color = color;
    this.applyColor(color);
  }
  applyColor(color) {
    if (!this._meshes)
      return;
    for (let m = 0; m < this._meshes.length; m++) {
      const [mesh, index] = this._meshes[m];
      if (mesh.userData.merged) {
        this.applyMergedColor(mesh, index, color);
      } else {
        this.applyInstancedColor(mesh, index, color);
      }
    }
  }
  get visible() {
    return this._visible;
  }
  set visible(value) {
    if (this._visible === value)
      return;
    this._visible = value;
    this.applyVisible(value);
  }
  applyVisible(value) {
    if (!this._meshes)
      return;
    for (let m = 0; m < this._meshes.length; m++) {
      const [mesh, index] = this._meshes[m];
      if (mesh.userData.merged) {
        this.applyMergedVisible(mesh, index, value);
      } else {
        this.applyInstancedVisible(mesh, index, value);
      }
    }
  }
  getMergedMeshStart(mesh, index) {
    return mesh.userData.submeshes[index];
  }
  getMergedMeshEnd(mesh, index) {
    return index + 1 < mesh.userData.submeshes.length ? mesh.userData.submeshes[index + 1] : mesh.geometry.getIndex().count;
  }
  applyMergedVisible(mesh, index, show) {
    var _a;
    const attribute = (_a = mesh.geometry.getAttribute("ignoreVertex")) != null ? _a : new Float32BufferAttribute(new Float32Array(mesh.geometry.index.count * 3), 1);
    mesh.geometry.setAttribute("ignoreVertex", attribute);
    const start = this.getMergedMeshStart(mesh, index);
    const end = this.getMergedMeshEnd(mesh, index);
    const indices = mesh.geometry.getIndex();
    for (let i = start; i < end; i++) {
      const v = indices.getX(i);
      attribute.setX(v, show ? 0 : 1);
    }
    attribute.needsUpdate = true;
  }
  applyInstancedVisible(mesh, index, visible) {
    let attribute = mesh.geometry.getAttribute("ignoreInstance");
    if (!attribute) {
      attribute = new InstancedBufferAttribute(new Float32Array(mesh.count), 1);
      mesh.geometry.setAttribute("ignoreInstance", attribute);
    }
    attribute.setX(index, visible ? 0 : 1);
    attribute.needsUpdate = true;
  }
  applyMergedColor(mesh, index, color) {
    if (!color) {
      this.resetMergedColor(mesh, index);
      return;
    }
    const start = this.getMergedMeshStart(mesh, index);
    const end = this.getMergedMeshEnd(mesh, index);
    const colors = mesh.geometry.getAttribute("color");
    const colored = this.getOrAddColoredAttribute(mesh);
    const indices = mesh.geometry.getIndex();
    for (let i = start; i < end; i++) {
      const v = indices.getX(i);
      colors.setXYZ(v, color.r, color.g, color.b);
      colored.setX(v, 1);
    }
    colors.needsUpdate = true;
    colored.needsUpdate = true;
  }
  resetMergedColor(mesh, index) {
    const colors = mesh.geometry.getAttribute("color");
    const colored = this.getOrAddColoredAttribute(mesh);
    const indices = mesh.geometry.getIndex();
    let mergedIndex = this.getMergedMeshStart(mesh, index);
    const instance = this.vim.scene.getInstanceFromMesh(mesh, index);
    const g3d = this.vim.document.g3d;
    const g3dMesh = g3d.instanceMeshes[instance];
    const subStart = g3d.getMeshSubmeshStart(g3dMesh);
    const subEnd = g3d.getMeshSubmeshEnd(g3dMesh);
    for (let sub = subStart; sub < subEnd; sub++) {
      const start = g3d.getSubmeshIndexStart(sub);
      const end = g3d.getSubmeshIndexEnd(sub);
      const color = g3d.getSubmeshColor(sub);
      for (let i = start; i < end; i++) {
        const v = indices.getX(mergedIndex);
        colors.setXYZ(v, color[0], color[1], color[2]);
        colored.setX(v, 0);
        mergedIndex++;
      }
    }
    colors.needsUpdate = true;
    colored.needsUpdate = true;
  }
  applyInstancedColor(mesh, index, color) {
    const colors = this.getOrAddInstanceColorAttribute(mesh);
    const colored = this.getOrAddColoredAttribute(mesh);
    if (color) {
      colors.setXYZ(index, color.r, color.g, color.b);
      colored.setX(index, 1);
    } else {
      colored.setX(index, 0);
    }
    colored.needsUpdate = true;
    colors.needsUpdate = true;
  }
  getOrAddInstanceColorAttribute(mesh) {
    if (mesh.instanceColor)
      return mesh.instanceColor;
    const count = mesh.instanceMatrix.count;
    const colors = new Float32Array(count * 3);
    const attribute = new THREE.InstancedBufferAttribute(colors, 3);
    mesh.instanceColor = attribute;
    return attribute;
  }
  getOrAddColoredAttribute(mesh) {
    const colored = mesh.geometry.getAttribute("colored");
    if (colored) {
      return colored;
    }
    const count = mesh instanceof InstancedMesh ? mesh.instanceMatrix.count : mesh.geometry.getAttribute("position").count;
    const array = new Float32Array(count);
    const attribute = mesh instanceof InstancedMesh ? new THREE.InstancedBufferAttribute(array, 1) : new BufferAttribute(array, 1);
    mesh.geometry.setAttribute("colored", attribute);
    return attribute;
  }
}
class Vim {
  constructor(vim, scene) {
    this._elementToObject = /* @__PURE__ */ new Map();
    this.document = vim;
    this.scene = scene;
    this.scene.setVim(this);
  }
  dispose() {
    this.scene.dispose();
    this.scene = void 0;
  }
  filter(instances) {
    this.scene.dispose();
    this.scene = Scene.createFromG3d(this.document.g3d, this.settings.getTransparency(), instances);
    this.scene.applyMatrix4(this.settings.getMatrix());
    this.scene.setVim(this);
    for (const [element, object] of this._elementToObject.entries()) {
      object.updateMeshes(this.getMeshesFromElement(element));
    }
  }
  applySettings(settings) {
    this.settings = settings;
    this.scene.applyMatrix4(this.settings.getMatrix());
  }
  getMatrix() {
    return this.settings.getMatrix();
  }
  getObjectFromMesh(mesh, index) {
    const element = this.getElementFromMesh(mesh, index);
    return this.getObjectFromElementIndex(element);
  }
  getObjectFromInstance(instance) {
    const element = this.document.getElementFromInstance(instance);
    return this.getObjectFromElementIndex(element);
  }
  getObjectsFromElementId(id) {
    const elements = this.document.getElementFromElementId(id);
    return elements == null ? void 0 : elements.map((e) => this.getObjectFromElementIndex(e));
  }
  getObjectFromElementIndex(element) {
    if (element === void 0)
      return;
    if (this._elementToObject.has(element)) {
      return this._elementToObject.get(element);
    }
    const instances = this.document.getInstanceFromElement(element);
    const meshes = this.getMeshesFromInstances(instances);
    const result = new Object$1(this, element, instances, meshes);
    this._elementToObject.set(element, result);
    return result;
  }
  getMeshesFromElement(index) {
    const instances = this.document.getInstanceFromElement(index);
    return this.getMeshesFromInstances(instances);
  }
  getMeshesFromInstances(instances) {
    if (!(instances == null ? void 0 : instances.length))
      return;
    const meshes = [];
    for (let i = 0; i < instances.length; i++) {
      const instance = instances[i];
      if (instance < 0)
        continue;
      const [mesh, index] = this.scene.getMeshFromInstance(instance);
      if (!mesh)
        continue;
      meshes.push([mesh, index]);
    }
    if (meshes.length === 0)
      return;
    return meshes;
  }
  getElementFromMesh(mesh, index) {
    if (!mesh || index < 0)
      return -1;
    const instance = this.scene.getInstanceFromMesh(mesh, index);
    return this.document.getElementFromInstance(instance);
  }
}
class Loader {
  load(bfast, transparency) {
    let document2;
    document2 = new Document(bfast);
    const scene = Scene.createFromG3d(document2.g3d, transparency);
    const vim = new Vim(document2, scene);
    return vim;
  }
}
class BFastHeader {
  constructor(magic, dataStart, dataEnd, numArrays, byteLength) {
    this.isValid = false;
    if (magic !== 49061)
      this.error = "Not a BFAST file, or endianness is swapped";
    else if (dataStart <= 32 || dataStart > byteLength)
      this.error = "Data start is out of valid range";
    else if (dataEnd < dataStart || dataEnd > byteLength)
      this.error = "Data end is out of valid range";
    else if (numArrays < 0 || numArrays > dataEnd)
      this.error = "Number of arrays is invalid";
    else
      this.isValid = true;
    this.magic = magic;
    this.dataStart = dataStart;
    this.dataEnd = dataEnd;
    this.numArrays = numArrays;
  }
  static fromBytes(bytes, byteLength) {
    const ints = new Int32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4);
    return BFastHeader.fromArray(ints, byteLength);
  }
  static fromArray(array, byteLength) {
    if (array.length < 8) {
      let r = new this(0, 0, 0, 0, 0);
      r.isValid = false;
      r.error = "Insufficient length";
    } else {
      return new this(array[0], array[2], array[4], array[6], byteLength);
    }
  }
}
class BFast {
  constructor(header, names, buffers) {
    this.header = header;
    this.names = names;
    this.buffers = buffers;
    if (names.length != buffers.length)
      throw new Error("number of names, and number of buffers must match");
    this.children = /* @__PURE__ */ new Map();
  }
  getBuffer(name) {
    const index = this.names.indexOf(name);
    if (index < 0)
      throw new Error("buffer " + name + " not found");
    return this.buffers[index];
  }
  getChild(name) {
    return this.children.get(name);
  }
  static isBfast(bytes) {
    const header = BFastHeader.fromBytes(bytes, bytes.length);
    return header && header.isValid;
  }
  static parseFromArray(bytes) {
    return this.parseFromBuffer(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  }
  static parseFromBuffer(arrayBuffer, byteOffset = 0, byteLength = arrayBuffer.byteLength - byteOffset) {
    const data = new Int32Array(arrayBuffer, byteOffset, byteLength / 4);
    const header = BFastHeader.fromArray(data, byteLength);
    if (!header.isValid)
      throw new Error(header.error);
    const buffers = [];
    let pos = 8;
    for (let i2 = 0; i2 < header.numArrays; ++i2) {
      const begin = data[pos + 0];
      const end = data[pos + 2];
      if (data[pos + 1] !== 0)
        throw new Error("Expected 0 in position " + (pos + 1) * 4);
      if (data[pos + 3] !== 0)
        throw new Error("Expected 0 in position " + (pos + 3) * 4);
      if (begin < header.dataStart || begin > header.dataEnd)
        throw new Error("Buffer start is out of range");
      if (end < begin || end > header.dataEnd)
        throw new Error("Buffer end is out of range");
      pos += 4;
      const buffer2 = new Uint8Array(arrayBuffer, begin + byteOffset, end - begin);
      buffers.push(buffer2);
    }
    if (buffers.length < 0)
      throw new Error("Expected at least one buffer containing the names");
    const joinedNames = new TextDecoder("utf-8").decode(buffers[0]);
    let names = joinedNames.slice(0, -1).split("\0");
    if (joinedNames.length === 0)
      names = [];
    if (names.length !== buffers.length - 1) {
      throw new Error("Expected number of names to be equal to the number of buffers - 1");
    }
    var slices = buffers.slice(1);
    var result = new BFast(header, names, slices);
    for (var i = 0; i < names.length; ++i) {
      var buffer = slices[i];
      if (this.isBfast(buffer)) {
        var bfast = BFast.parseFromArray(buffer);
        result.children.set(names[i], bfast);
      }
    }
    return result;
  }
}
class Viewer {
  constructor(options) {
    this._clock = new THREE.Clock();
    this._vims = [];
    this._disposed = false;
    this._loader = new Loader();
    this.settings = new ViewerSettings(options);
    const scene = new RenderScene();
    this.viewport = new Viewport(this.settings);
    this._camera = new Camera(scene, this.viewport, this.settings);
    this.renderer = new Renderer(scene, this.viewport);
    this._camera.gizmo = new CameraGizmo(this.renderer, this._camera, this.settings);
    this._environment = new Environment(this.settings);
    this._environment.getObjects().forEach((o) => this.renderer.add(o));
    this._onMouseClick = this.defaultOnClick;
    this.selection = new Selection(this.renderer);
    this.raycaster = new Raycaster(this.viewport, this._camera, scene);
    this.inputs = new Input(this);
    this.inputs.register();
    this.applyMaterialSettings(this.settings);
    this.animate();
  }
  get camera() {
    return this._camera;
  }
  get environment() {
    return this._environment;
  }
  get onMouseClick() {
    return this._onMouseClick;
  }
  set onMouseClick(callback) {
    this._onMouseClick = callback != null ? callback : function(hit) {
    };
  }
  dispose() {
    this._environment.dispose();
    this.selection.clear();
    this._camera.dispose();
    this.viewport.dispose();
    this.renderer.dispose();
    this.inputs.unregister();
    this._vims.forEach((v) => v == null ? void 0 : v.dispose());
    this._vims = [];
    this._disposed = true;
  }
  animate() {
    if (this._disposed)
      return;
    requestAnimationFrame(() => this.animate());
    this._camera.update(this._clock.getDelta());
    if (this._vims.length)
      this.renderer.render(this.camera.camera);
  }
  get vims() {
    return this._vims.filter((v) => v !== void 0);
  }
  get vimCount() {
    return this._vims.length;
  }
  addVim(vim) {
    for (let i = 0; i <= this._vims.length; i++) {
      if (this._vims[i] === void 0) {
        this._vims[i] = vim;
        vim.index = i;
        return;
      }
    }
  }
  removeVim(vim) {
    this._vims[vim.index] = void 0;
    vim.index = -1;
  }
  loadVim(buffer, options, onProgress) {
    const bfast = BFast.parseFromBuffer(buffer);
    const vim = this._loader.load(bfast, "all");
    this.onVimLoaded(vim, new VimSettings(options));
    this.camera.frame("all", true);
    return vim;
  }
  onVimLoaded(vim, settings) {
    this.addVim(vim);
    vim.applySettings(settings);
    this.renderer.add(vim.scene);
    this._environment.adaptToContent(this.renderer.getBoundingBox());
    this._camera.adaptToContent();
  }
  unloadVim(vim) {
    var _a;
    this.removeVim(vim);
    this.renderer.remove(vim.scene);
    vim.dispose();
    if (((_a = this.selection.object) == null ? void 0 : _a.vim) === vim)
      this.selection.clear();
  }
  clear() {
    this._vims.forEach((v) => this.unloadVim(v));
  }
  filterVim(vim, objects) {
    const instances = objects == null ? void 0 : objects.flatMap((o) => o == null ? void 0 : o.instances).filter((i) => i !== void 0);
    this.renderer.remove(vim.scene);
    vim.filter(instances);
    this.renderer.add(vim.scene);
  }
  applyMaterialSettings(settings) {
    const lib = Materials.getDefaultLibrary();
    lib.wireframe.color = settings.getHighlightColor();
    lib.wireframe.opacity = settings.getHighlightOpacity();
  }
  defaultOnClick(hit) {
    console.log(hit);
    if (!(hit == null ? void 0 : hit.object))
      return;
    this.selection.select(hit.object);
    this._camera.target(hit.object.getCenter());
    if (hit.doubleClick)
      this._camera.frame(hit.object);
    const element = hit.object.getBimElement();
    console.log(element);
  }
}
export { BFast, BFastHeader, Document, EntityColumn, EntityTable, G3d, Geometry, RaycastResult as HitTestResult, Loader, Materials, Mesh, Object$1 as Object, Scene, Transparency, Viewer, ViewerSettings, Vim, VimSettings };
//# sourceMappingURL=vim-webgl-viewer.es.js.map
