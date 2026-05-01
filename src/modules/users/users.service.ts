import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

export const getUserById = async (
  requesterId: string,
  requesterRole: string,
  targetId: string,
) => {
  if (requesterRole !== "admin" && requesterId !== targetId) {
    throw new AppError("Forbidden", 403);
  }

  const user = await prisma.user.findUnique({
    where: { id: targetId },
    select: {
      id: true,
      fullName: true,
      birthDate: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });

  if (!user) throw new AppError("User not found", 404);

  return user;
};

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      fullName: true,
      birthDate: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
};

export const blockUser = async (
  requesterId: string,
  requesterRole: string,
  targetId: string,
) => {
  if (requesterRole !== "admin" && requesterId !== targetId) {
    throw new AppError("Forbidden", 403);
  }

  const user = await prisma.user.findUnique({ where: { id: targetId } });
  if (!user) throw new AppError("User not found", 404);

  return prisma.user.update({
    where: { id: targetId },
    data: { isActive: false },
    select: {
      id: true,
      fullName: true,
      isActive: true,
    },
  });
};
