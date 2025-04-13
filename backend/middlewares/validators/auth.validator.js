import asyncHandler from "express-async-handler";
import { checkSchema, validationResult } from "express-validator";

export const validateLoginRequest = asyncHandler(async (req, res, next) => {
  await checkSchema({
    library_id: {
      in: ["body"],
      notEmpty: {
        errorMessage: "Library ID is required",
      },
      isString: {
        errorMessage: "Library ID must be a string",
      },
    },
    password: {
      in: ["body"],
      notEmpty: {
        errorMessage: "Password is required",
      },
      isString: {
        errorMessage: "Password must be a string",
      },
    },
  }).run(req);

  const schemaResult = validationResult(req);

  if (!schemaResult.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, errors: schemaResult.array() });
  }

  next();
});

export const validateRegisterRequest = asyncHandler(async (req, res, next) => {
  await checkSchema({
    name: {
      notEmpty: {
        errorMessage: "Name is required",
      },
      isString: {
        errorMessage: "Name must be a string",
      },
    },
    library_id: {
      notEmpty: {
        errorMessage: "Library ID is required",
      },
      isString: {
        errorMessage: "Library ID must be a string",
      },
    },
    email: {
      notEmpty: {
        errorMessage: "Email is required",
      },
      isEmail: {
        errorMessage: "Invalid email format",
      },
      normalizeEmail: true,
    },
    role: {
      optional: true,
      isIn: {
        options: [["ADMIN", "USER", "COORDINATOR" , "LEAD"]],
        errorMessage:
          "Role must be either 'ADMIN' or 'USER' or a 'COORDINATOR'",
      },
    },
    year: {
      notEmpty: {
        errorMessage: "Year is required",
      },
      isInt: {
        errorMessage: "Year must be an integer",
      }
    },
    domain_dev: {
      isString: {
        errorMessage: "Domain Dev must be a string",
      },
      isIn: {
        options: [["ANDROID", "ARVR", "ML", "WEBDEV", "UIUX"]],
        errorMessage: "Invalid Dev Domain",
      },
    },
    domain_dsa: {
      isString: {
        errorMessage: "Domain DSA must be a string",
      },
      isIn: {
        options: [["CPP", "JAVA"]],
        errorMessage: "Invalid DSA Domain",
      },
    },
  }).run(req);

  const schemaResult = validationResult(req);

  if (!schemaResult.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, errors: schemaResult.array() });
  }

  next();
});
