import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getConversationById(conversationId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error: any) {
    console.log(error, "SERVER_ERROR");
    return null;
  }
}
