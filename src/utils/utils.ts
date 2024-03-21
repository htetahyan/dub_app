import {twMerge} from "tailwind-merge";
import clsx, {ClassValue} from "clsx";

export function cn(...classes: ClassValue[]) {
    return twMerge(clsx(classes));
}
export const blurUrl='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC'