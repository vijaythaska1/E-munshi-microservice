import ApiError from "../utils/ApiError";
import passport from "passport";
import httpStatus from "http-status";
import { roleRights } from "../config/roles";

const verifyCallback =
  (req: { user: any; }, resolve: (value?: unknown) => void, reject: { (reason?: any): void; (arg0: ApiError): any; }, requiredRights: any[]) => async (err: any, user: { role: any; }, info: any) => {
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      const hasRequiredRights = requiredRights.every((requiredRight) =>
        userRights.includes(requiredRight)
      );
      if (!hasRequiredRights) {
        return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
      }
    }

    resolve();
  };

const auth = (...requiredRights: string[]) =>
    async (req: { user: any; }, res: any, next: (arg0: undefined) => any) => {
      return new Promise((resolve, reject) => {
        passport.authenticate(
          "jwt",
          { session: false },
          verifyCallback(req, resolve, reject, requiredRights)
        )(req, res, next);
      })
        .then(() => next(undefined))
        .catch((err) => next(err));
    };

export default auth;
