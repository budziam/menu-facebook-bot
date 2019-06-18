import { NextFunction, RequestHandler } from "express";

export const Termination = Symbol.for("Termination");

export const asyncHandler = (callback: RequestHandler): RequestHandler => async (
    ...args
): Promise<void> => {
    const next = args[args.length - 1] as NextFunction;

    try {
        await callback(...args);
        next();
    } catch (e) {
        next(e);
    }
};

export const controllerHandler = (callback: RequestHandler): RequestHandler => async (
    ...args
): Promise<void> => {
    const next = args[args.length - 1] as NextFunction;

    try {
        await callback(...args);
        next(Termination);
    } catch (e) {
        next(e);
    }
};
