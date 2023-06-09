import styles from "./DeleteChatMenu.module.css"
import { ReactComponent as DeleteIcon } from "../../../../../../lib/icons/deleteIcon.svg"
import { ReactComponent as CloseIcon } from "../../../../../../lib/icons/closeIcon.svg"
import { useContext, useState } from "react"
import { SelectedChatContext } from "../../../../../../contexts/SelectedChatContext.js"
import { deleteChatService } from "../../../../../../services/chatServices.js"
import { SocketContext } from "../../../../../../contexts/SocketContext.js"

const DeleteChatMenu = () => {

    const [isMenuShown, setIsMenuShown] = useState(false)
    const [notification, setNotification] = useState("")
    const { selectedChatState } = useContext(SelectedChatContext)
    const { socket } = useContext(SocketContext)

    const handleDeleteChatClick = async (chat) => {
        const participantIds = chat.chatParticipants.map((participant) => { return participant.id })
        const result = await deleteChatService(chat.id)
        if (result.success) {
            setIsMenuShown(false)
            socket.emit("chatDelete", { participantIds })
        } else {
            setNotification(result.message)
        }
    }

    return (
        <div className={styles.mainContainer}>
            <button className={styles.openMenuButton}
                type="button"
                onClick={() => { setIsMenuShown(!isMenuShown) }}
            >
                <p className={styles.openMenuButtonText}>Poista keskustelu</p>
                <div className={styles.openMenuButtonIcon}>
                    <div className={styles.iconContainer}>
                        <DeleteIcon fill={"rgb(255, 50, 50)"} />
                    </div>
                </div>
            </button>
            <div className={isMenuShown ? styles.menuContainer : styles.hiddenMenuContainer}>
                <div className={styles.contentContainer}>
                    <div className={styles.topContainer}>
                        <p className={styles.topTitle}>Poistetaanko keskustelu?</p>
                        <button className={styles.closeButton}
                            type="button"
                            onClick={() => { setIsMenuShown(false) }}
                        >
                            <CloseIcon fill={"rgb(70, 70, 70)"} />
                        </button>
                    </div>
                    <p className={styles.notificationText}>{notification}</p>
                    <button className={styles.deleteButton}
                        type="button"
                        onClick={() => { handleDeleteChatClick(selectedChatState) }}
                    >
                        Vahvista
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteChatMenu