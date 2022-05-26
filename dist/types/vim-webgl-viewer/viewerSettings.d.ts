/**
 @module viw-webgl-viewer
*/
import * as THREE from 'three';
import { VimOptions } from '../vim-loader/vimSettings';
export declare namespace ViewerOptions {
    type ColorRGB = {
        r: number;
        g: number;
        b: number;
    };
    type ColorHSL = {
        h: number;
        s: number;
        l: number;
    };
    /**
     * Plane under Scene related options
     */
    type GroundPlane = {
        /** Enables/Disables plane under scene */
        show: boolean;
        /** Local or remote texture url for plane */
        texture: string;
        /** Opacity of the plane */
        opacity: number;
        /** Color of the plane */
        color: ColorRGB;
        /** Actual size is SceneRadius*size */
        size: number;
    };
    /** Dom canvas related options */
    type Canvas = {
        /** Canvas dom model id. If none provided a new canvas will be created */
        id: string;
        /** Limits how often canvas will be resized if window is resized. */
        resizeDelay: number;
    };
    /** Camera controls related options */
    type CameraControls = {
        /**
         * <p>Set true to start in orbit mode.</p>
         * <p>Camera has two modes: First person and orbit</p>
         * <p>First person allows to moves the camera around freely</p>
         * <p>Orbit rotates the camera around a focus point</p>
         */
        orbit: boolean;
        /** Camera speed is scaled according to SceneRadius/sceneReferenceSize */
        vimReferenceSize: number;
        /** Camera rotation speed factor */
        rotateSpeed: number;
        orbitSpeed: number;
        /** Camera movement speed factor */
        moveSpeed: number;
    };
    /** Camera Gizmo related options */
    type CameraGizmo = {
        enable: boolean;
        size: number;
        color: ColorRGB;
        opacity: number;
        opacityAlways: number;
    };
    /** Camera related options */
    type Camera = {
        /** Near clipping plane distance */
        near: number;
        /** Far clipping plane distance */
        far: number;
        /** Fov angle in degrees */
        fov: number;
        /** Zoom level */
        zoom: number;
        /** See ControlOptions */
        controls: Partial<CameraControls>;
        /** See CameraGizmo */
        gizmo: Partial<CameraGizmo>;
    };
    type SunLight = {
        position: VimOptions.Vector3;
        color: ColorHSL;
        intensity: number;
    };
    type SkyLight = {
        skyColor: ColorHSL;
        groundColor: ColorHSL;
        intensity: number;
    };
    type Highlight = {
        color: ColorRGB;
        opacity: number;
    };
    /** Viewer related options independant from vims */
    type Root = {
        /**
         * Webgl canvas related options
         */
        canvas: Partial<Canvas>;
        /**
         * Three.js camera related options
         */
        camera: Partial<Camera>;
        /**
         * Plane under scene related options
         */
        groundPlane: Partial<GroundPlane>;
        /**
         * Skylight (hemisphere light) options
         */
        skylight: Partial<SkyLight>;
        /**
         * Sunlight (directional light) options
         */
        sunLight: Partial<SunLight>;
        /**
         * Object highlight on click options
         */
        highlight: Partial<Highlight>;
    };
}
/**
 * <p>Wrapper around Viewer Options</p>
 * <p>Casts options values into related THREE.js type</p>
 * <p>Provides default values for options</p>
 */
export declare class ViewerSettings {
    options: ViewerOptions.Root;
    constructor(options?: Partial<ViewerOptions.Root>);
    getCanvasResizeDelay: () => number;
    getCanvasId: () => string;
    getGroundPlaneShow: () => boolean;
    getGroundPlaneColor: () => THREE.Color;
    getGroundPlaneTextureUrl: () => string;
    getGroundPlaneOpacity: () => number;
    getGroundPlaneSize: () => number;
    getSkylightColor: () => THREE.Color;
    getSkylightGroundColor: () => THREE.Color;
    getSkylightIntensity: () => number;
    getSunlightColor: () => THREE.Color;
    getSunlightPosition: () => THREE.Vector3;
    getSunlightIntensity: () => number;
    getHighlightColor: () => THREE.Color;
    getHighlightOpacity: () => number;
    private get camera();
    getCameraNear: () => number;
    getCameraFar: () => number;
    getCameraFov: () => number;
    getCameraZoom: () => number;
    getCameraGizmoEnable: () => boolean;
    getCameraGizmoSize: () => number;
    getCameraGizmoColor: () => THREE.Color;
    getCameraGizmoOpacity: () => number;
    getCameraGizmoOpacityAlways: () => number;
    private get cameraControls();
    getCameraIsOrbit: () => boolean;
    getCameraMoveSpeed: () => number;
    getCameraRotateSpeed: () => number;
    getCameraOrbitSpeed: () => number;
    getCameraReferenceVimSize: () => number;
}
