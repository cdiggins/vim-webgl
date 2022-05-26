/**
 * @module vim-loader
 */
import { Transparency } from './geometry';
import * as THREE from 'three';
export declare namespace VimOptions {
    type Vector3 = {
        x: number;
        y: number;
        z: number;
    };
    /**
     * Config object for loading a vim
     */
    type Root = {
        /**
         * Position offset for the vim
         */
        position?: Vector3;
        /**
         * Rotation for the vim
         */
        rotation?: Vector3;
        /**
         * Scale factor for the vim
         */
        scale?: number;
        /**
         * Defines how to draw or not to draw objects according to their transparency
         */
        transparency?: Transparency.Mode;
        /**
         * Forces the viewer to download the whole data at once.
         * Otherwise bim data will be requested on per need basis.
         */
        forceDownload?: boolean;
    };
}
/**
 * <p>Wrapper around Vim Options.</p>
 * <p>Casts options values into related THREE.js type</p>
 * <p>Provides default values for options</p>
 */
export declare class VimSettings {
    private options;
    constructor(options?: Partial<VimOptions.Root>);
    getOptions: () => VimOptions.Root;
    getPosition: () => THREE.Vector3;
    getRotation: () => THREE.Quaternion;
    getScale: () => THREE.Vector3;
    getMatrix: () => THREE.Matrix4;
    getTransparency: () => Transparency.Mode;
}
