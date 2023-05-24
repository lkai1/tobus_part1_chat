import { getUserFromJWTService } from "../services/userServices.js"
import { validateCreateMessageParams, validateGetChatMessagesParams } from "../utils/validation/messageValidation.js"
import { getChatFromIdService, getUserIsChatParticipantService } from "../services/chatServices.js"
import { createMessageService, getMessagesFromChatService } from "../services/messageServices.js"

export const createMessageController = async (request, response) => {
    try {

        if (!validateCreateMessageParams(request.body)) return response.status(400).send("Invalid parameters!")

        const { chatId, message } = request.body
        const token = request.headers.authorization
        const user = await getUserFromJWTService(token)
        const chat = await getChatFromIdService(chatId)

        if (!chat || !user) return response.status(404).send("Chat or user not found!")

        const userIsChatParticipant = await getUserIsChatParticipantService(user.id, chat.id)

        if (!userIsChatParticipant) return response.status(401).send("Unauthorized!")

        await createMessageService(user.id, chat.id, message)

        response.status(201).send("Message created.")

    } catch (_error) {
        response.status(500).send("Something went wrong! Try again later.")
    }
}

export const getChatMessagesController = async (request, response) => {
    try {

        if (!validateGetChatMessagesParams(request.query)) return response.status(400).send("Invalid parameters!")

        const { chatId } = request.query
        const token = request.headers.authorization
        const user = await getUserFromJWTService(token)
        const chat = await getChatFromIdService(chatId)

        if (!chat || !user) return response.status(404).send("Chat or user not found!")

        const userIsChatParticipant = await getUserIsChatParticipantService(user.id, chat.id)

        if (!userIsChatParticipant) return response.status(401).send("Unauthorized!")

        const messages = await getMessagesFromChatService(chat)

        response.status(200).json(messages)

    } catch (_error) {
        response.status(500).send("Something went wrong! Try again later.")
    }
}