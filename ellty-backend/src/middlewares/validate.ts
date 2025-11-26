import type { NextFunction, Request, Response } from "express";
import { flattenError, ZodError, type ZodType } from "zod";

export function validate(schema: ZodType<any>, source: "body" | "params" | "query" = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[source]);

      if (source === "body") {
        req.body = parsed;
      } else {
        Object.assign(req[source], parsed);
      }

      next();
    } catch (e) {
      if (e instanceof ZodError) {
        const flatten = flattenError(e);
        return res.status(422).json({
          message: "Zod validation error",
          success: false,
          error: flatten,
        });
      }

      return res.status(500).json({
        message: "unexpected validation error",
        success: false,
        error: e,
      });
    }
  };
}
