import jwt from "jsonwebtoken";

const generateAdmin = () => {
  return {
    username: "daniel",
    email: "daniel@mail.com",
    password: "1234",
    adm: true,
  };
};

const generateNotAdmin = () => {
  return {
    username: "lucas",
    email: "lucas@mail.com",
    password: "1234",
    adm: false,
  };
};

const generateToken = (user): string => {
  const token = jwt.sign({ ...user }, process.env.SECRET_KEY as string, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return token;
};

export { generateToken, generateAdmin, generateNotAdmin };
