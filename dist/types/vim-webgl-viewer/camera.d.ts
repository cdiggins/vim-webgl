/**
 @module viw-webgl-viewer
*/
import * as THREE from 'three';
import { CameraGizmo } from './gizmos';
import { Viewport } from './viewport';
import { ViewerSettings } from './viewerSettings';
import { Object } from '../vim';
import { RenderScene } from './renderScene';
export declare const DIRECTIONS: {
    forward: THREE.Vector3;
    back: THREE.Vector3;
    left: THREE.Vector3;
    right: THREE.Vector3;
    up: THREE.Vector3;
    down: THREE.Vector3;
};
export interface ICamera {
    /**
     * Wrapped Three.js camera
     */
    camera: THREE.Camera;
    /**
     * Multiplier for camera movements.
     */
    speed: number;
    /**
     * True: Camera orbit around target mode.
     * False: First person free camera mode.
     */
    orbitMode: boolean;
    /**
     * True: Orthographic camera.
     * False: Perspective camera.
     */
    orthographic: boolean;
    /**
     * Current local velocity
     */
    localVelocity: THREE.Vector3;
    /**
     * Rotates the camera around the X or Y axis or both
     * @param vector where coordinates are in relative screen size. ie [-1, 1]
     */
    /**
     * Nudges the camera in given direction for a short distance.
     * @param impulse impulse vector in camera local space.
     */
    addImpulse(impulse: THREE.Vector3): void;
    /**
     * Moves the camera closer or farther away from orbit target.
     * @param amount movement size.
     */
    zoom(amount: number): void;
    /**
     * Moves the camera along all three axes.
     */
    move3(vector: THREE.Vector3): void;
    /**
     * Moves the camera along two axes.
     */
    move2(vector: THREE.Vector2, axes: 'XY' | 'XZ'): void;
    /**
     * Moves the camera along one axis.
     */
    move1(amount: number, axis: 'X' | 'Y' | 'Z'): void;
    /**
     * Rotates the camera around the X or Y axis or both
     * @param vector where coordinates in range [-1, 1] for rotations of [-180, 180] degrees
     */
    rotate(vector: THREE.Vector2): void;
    /**
     * Sets orbit mode target and moves camera accordingly
     */
    target(target: Object | THREE.Vector3): void;
    /**
     * Rotates the camera to look at target
     */
    lookAt(target: Object | THREE.Vector3): any;
    /**
     * Moves and rotates the camera so that target is well framed.
     * if center is true -> camera.y = target.y
     */
    frame(target: Object | THREE.Sphere | 'all', center?: boolean): void;
}
/**
 * Manages viewer camera movement and position
 */
export declare class Camera implements ICamera {
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    gizmo: CameraGizmo;
    private _viewport;
    private _scene;
    private _inputVelocity;
    private _velocity;
    private _impulse;
    speed: number;
    private _orbitalTarget;
    private _minOrbitalDistance;
    private _currentOrbitalDistance;
    private _orbitalTargetDistance;
    private _lerpSecondsDuration;
    private _lerpMsEndtime;
    private _orbitMode;
    private _vimReferenceSize;
    private _sceneSizeMultiplier;
    private _velocityBlendFactor;
    private _moveSpeed;
    private _rotateSpeed;
    private _orbitSpeed;
    private _zoomSpeed;
    constructor(scene: RenderScene, viewport: Viewport, settings: ViewerSettings);
    dispose(): void;
    /**
     * Resets camera to default state.
     */
    reset(): void;
    get localVelocity(): THREE.Vector3;
    /**
     * Set current velocity of the camera.
     */
    set localVelocity(vector: THREE.Vector3);
    /**
     * True: Camera orbit around target mode.
     * False: First person free camera mode.
     */
    get orbitMode(): boolean;
    /**
     * True: Camera orbit around target mode.
     * False: First person free camera mode.
     */
    set orbitMode(value: boolean);
    /**
     * Sets Orbit mode target and moves camera accordingly
     */
    target(target: Object | THREE.Vector3): void;
    frame(target: Object | THREE.Sphere | 'all', center?: boolean): void;
    /**
     * Rotates the camera to look at target
     */
    lookAt(target: Object | THREE.Vector3): void;
    applySettings(settings: ViewerSettings): void;
    /**
     * Adapts camera speed to be faster for large model and slower for small models.
     */
    adaptToContent(): void;
    /**
     * Moves the camera closer or farther away from orbit target.
     * @param amount movement size.
     */
    zoom(amount: number): void;
    /**
     * Smoothly moves the camera in given direction for a short distance.
     */
    addImpulse(impulse: THREE.Vector3): void;
    /**
     * Moves the camera along all three axes.
     */
    move3(vector: THREE.Vector3): void;
    /**
     * Moves the camera along two axis
     */
    move2(vector: THREE.Vector2, axes: 'XY' | 'XZ'): void;
    /**
     * Moves the camera along one axis
     */
    move1(amount: number, axis: 'X' | 'Y' | 'Z'): void;
    /**
     * Rotates the camera around the X or Y axis or both
     * @param vector where coordinates in range [-1, 1] for rotations of [-180, 180] degrees
     */
    rotate(vector: THREE.Vector2): void;
    /**
     * Apply the camera frame update
     */
    update(deltaTime: number): void;
    /**
     * Rotates the camera so that it looks at sphere
     * Adjusts distance so that the sphere is well framed
     */
    private frameSphere;
    updateProjection(sphere: THREE.Sphere): void;
    get orthographic(): boolean;
    set orthographic(value: boolean);
    private getBaseMultiplier;
    private getSpeedMultiplier;
    private getDistanceMultiplier;
    private isLerping;
    private startLerp;
    private isSignificant;
}
