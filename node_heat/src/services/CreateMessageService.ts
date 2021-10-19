import prismaClient from "../prisma/index";

class CreateMessageService {
  async execute(text: string, user_id: string) {
    const message = await prismaClient.message.create({
      data: {
        user_id,
        text: text,
      },
      include: {
        user: true,
      },
    });

    return message;
  }
}

export { CreateMessageService };
