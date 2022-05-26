/**
 * @module vim-loader
 */
import { Transparency } from './geometry';
import { BFast } from './bfast';
import { Vim } from './vim';
/**
 * Loader for the Vim File format.
 * See https://github.com/vimaec/vim
 */
export declare class Loader {
    load(bfast: BFast, transparency: Transparency.Mode): Vim;
}
