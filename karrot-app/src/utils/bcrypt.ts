import bcryptjs from "bcryptjs";

export const hashPassword = (password: string): string =>
  bcryptjs.hashSync(password);

export const comparePassword = (
  password: string,
  hashedPassword: string
): boolean => bcryptjs.compareSync(password, hashedPassword);
