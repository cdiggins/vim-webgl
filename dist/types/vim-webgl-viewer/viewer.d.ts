/**
 @module viw-webgl-viewer
*/
import { ViewerSettings, ViewerOptions } from './viewerSettings';
import { ICamera } from './camera';
import { Input } from './input';
import { Selection } from './selection';
import { IEnvironment } from './environment';
import { Renderer } from './renderer';
import { Raycaster, RaycastResult } from './raycaster';
import { Viewport } from './viewport';
import { VimOptions } from '../vim-loader/vimSettings';
import { Object } from '../vim-loader/object';
import { Vim } from '../vim-loader/vim';
/**
 * Viewer and loader for vim files.
 */
export declare class Viewer {
    /**
     * Current viewer settings.
     */
    settings: ViewerSettings;
    /**
     * Interface to manage objects to be rendered.
     */
    renderer: Renderer;
    /**
     * Interface to manage html canvas.
     */
    viewport: Viewport;
    /**
     * Interface to manage viewer selection.
     */
    selection: Selection;
    /**
     * Interface to manipulate default viewer inputs.
     */
    inputs: Input;
    /**
     * Interface to raycast into the scene to find objects.
     */
    raycaster: Raycaster;
    private _environment;
    private _camera;
    private _loader;
    private _clock;
    private _vims;
    private _disposed;
    /**
     * Interface to manipulate the viewer camera.
     */
    get camera(): ICamera;
    /**
     * Interface to manipulate THREE elements not directly related to vim.
     */
    get environment(): IEnvironment;
    /**
     * Callback for on mouse click. Replace it to override or combine
     * default behaviour with your custom logic.
     */
    private _onMouseClick;
    get onMouseClick(): (hit: RaycastResult) => void;
    set onMouseClick(callback: (hit: RaycastResult) => void);
    constructor(options?: Partial<ViewerOptions.Root>);
    dispose(): void;
    private animate;
    /**
     * Returns an array with all loaded vims.
     */
    get vims(): Vim[];
    /**
     * Current loaded vim count
     */
    get vimCount(): number;
    /**
     * Adds given vim to the first empty spot of the vims array
     */
    private addVim;
    /**
     * Remove given vim from the vims array and leaves an undefined spot.
     */
    private removeVim;
    /**
     * Loads a vim into the viewer from local or remote location
     * @param source if string downloads the vim from url then loads it, if ArrayBuffer directly loads the vim
     * @param options vim options
     */
    loadVim(buffer: ArrayBuffer, options: VimOptions.Root, onProgress?: (logger: any) => void): Vim;
    private onVimLoaded;
    /**
     * Unload given vim from viewer.
     */
    unloadVim(vim: Vim): void;
    /**
     * Unloads all vim from viewer.
     */
    clear(): void;
    /**
     * Reloads the vim with only objects included in the array.
     * @param objects array of objects to keep or undefined to load all objects.
     */
    filterVim(vim: Vim, objects: Object[] | undefined): void;
    applyMaterialSettings(settings: ViewerSettings): void;
    private defaultOnClick;
}
