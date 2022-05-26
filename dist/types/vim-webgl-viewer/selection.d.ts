/**
 * @module viw-webgl-viewer
 */
import { Object } from '../vim-loader/object';
import { Renderer } from './renderer';
/**
 * Provides basic selection mechanic in viewer
 */
export declare class Selection {
    private _renderer;
    private _object;
    private _highligt;
    constructor(renderer: Renderer);
    /**
     * Returns selected object.
     */
    get object(): Object;
    /**
     * Select given object
     */
    select(object: Object): void;
    /**
     * Clear selection and related highlights
     */
    clear(): void;
}
