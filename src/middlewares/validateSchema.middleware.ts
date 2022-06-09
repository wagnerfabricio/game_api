import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";

const ajv = new Ajv({ removeAdditional: true });

const validateSchema =
  (schema: object) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const isValid = await ajv.validate(schema, req.body);
    const payload = req.body;

    if (!isValid) {
      return res.status(400).json({
        error: ajv.errorsText(),
      });
    }

    const serializer = await ajv.compile(schema);
    await serializer(payload);
    console.log(req.body);
    req.validated = payload;

    return next();
  };

export default validateSchema;
