import {twMerge} from "tailwind-merge";
import clsx, {ClassValue} from "clsx";
import { PrismaClient } from '@prisma/client'

export function cn(...classes: ClassValue[]) {
    return twMerge(clsx(classes));
}


export const blurUrl='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC'


const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()



if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma