import { Request, Response, NextFunction } from "express";
import { login, signin, pulse } from "./auth";
import { UnauthorizedAccessError } from "./errors/UnauthorizedAccessError";

export type User = {
    id: string;
    login: string;
};

export type HeartRequest = Request & {
    currentUser: User;
};

const VERIFY_ROUTE = "/api/auth";
const LOGIN_ROUTE = "/api/auth/login";
const SIGNUP_ROUTE = "/api/auth/signup";

function isLoginRoute(url: string, method: string): boolean {
    const correctRoute = /api\/auth\/login$/.test(url);
    const correctMethod = (method == "POST");
    return correctRoute && correctMethod;
}

function isSigninRoute(url: string, method: string): boolean {
    const correctRoute = /api\/auth\/signin$/.test(url);
    const correctMethod = (method == "POST");
    return correctRoute && correctMethod;
}

function isFreePassRoute(req: HeartRequest) {
    return isLoginRoute(req.path, req.method) || isSigninRoute(req.path, req.method);
}

async function handleAuth(req: HeartRequest, res: Response, next: NextFunction) {
    if (isLoginRoute(req.path, req.method)) {
        const body: any = await login(req.body.login, req.body.password);
        return res.json(JSON.parse(body).data)
    }

    if (isSigninRoute(req.path, req.method)) {
        const body: any = await signin(req.body.login, req.body.password, req.body.data);
        return res.json(JSON.parse(body).data)
    }
}

async function handlePulse(req: HeartRequest, res: Response, next: NextFunction) {
    const token = req.headers["x-access-token"] as string;
    
    if (!token) {
      return next(new UnauthorizedAccessError());
    }

    const verify: any = JSON.parse(await pulse(token));
    if (verify.success) {
      req.currentUser = verify.data.user;
      next();
    } else {
      return next(new UnauthorizedAccessError());
    }
}

export async function plasticHeart(req: HeartRequest, res: Response, next: NextFunction) {
    try {
        if (isFreePassRoute(req)) {
            await handleAuth(req, res, next);
        } else {
            await handlePulse(req, res, next);
        }
    } catch (err) {
        next(err);
    }
}
