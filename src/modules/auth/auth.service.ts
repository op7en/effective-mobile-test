import { prisma } from "../../config/prisma";
import { hashPassword, comparePasswords } from "../../utils/hash";
import { signToken } from "../../utils/jwt";
import { AppError } from "../../utils/AppError";
import { RegisterDto, LoginDto } from "./auth.dto";

export const register = async (dto: RegisterDto) => {
  const existing = await prisma.user.findUnique({
    where: { email: dto.email },
  });
  if (existing) throw new AppError("Email already in use", 409);

  const hashed = await hashPassword(dto.password);

  const user = await prisma.user.create({
    data: {
      fullName: dto.fullName,
      birthDate: new Date(dto.birthDate),
      email: dto.email,
      password: hashed,
      role: dto.role,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  return user;
};

export const login = async (dto: LoginDto) => {
  const user = await prisma.user.findUnique({ where: { email: dto.email } });
  if (!user) throw new AppError("Invalid credentials", 401);
  if (!user.isActive) throw new AppError("Account is blocked", 403);

  const valid = await comparePasswords(dto.password, user.password);
  if (!valid) throw new AppError("Invalid credentials", 401);

  const token = signToken({ id: user.id, role: user.role });

  return { token, user: { id: user.id, email: user.email, role: user.role } };
};
