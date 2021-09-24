import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const data = req.body;
  try {
    const result = await prisma.post.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};
