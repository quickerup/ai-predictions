import prisma from '../../config/database';
import { CreateCategoryInput } from './category.schema';

export async function createCategory(data: CreateCategoryInput) {
  return prisma.category.create({
    data: {
      name: data.name,
      parentId: data.parentId,
    },
    include: {
      children: true,
    },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    where: { parentId: null }, // Top-level categories only
    include: { children: true },
    orderBy: { name: 'asc' },
  });
}
