import styles from "./CreateNewChatModal.module.css"
import { useState } from "react"
import { ReactComponent as CloseIcon } from "../../../../lib/icons/closeIcon.svg"
import { createPrivateChatService, createGroupChatService } from "../../../../services/chatServices"

const CreateNewChatModal = ({ isShown, setIsShown }) => {

    const [selectedChatType, setSelectedChatType] = useState(0)
    const [privateChatParticipantUsername, setPrivateChatParticipantUsername] = useState("")
    const [groupChatName, setGroupChatName] = useState("")
    const [notification, setNotification] = useState({ value: "", color: 1 })

    const handleCreatePrivateChatClick = async (privateChatParticipantUsername, setNotification) => {
        const result = await createPrivateChatService(privateChatParticipantUsername)

        setNotification({ value: result.message, color: result.success ? 1 : 2 })
    }

    const handleCreateGroupChatClick = async (groupChatName, setNotification) => {
        const result = await createGroupChatService(groupChatName)

        setNotification({ value: result.message, color: result.success ? 1 : 2 })
    }

    return (
        <div className={isShown ? styles.mainContainer : styles.hiddenMainContainer}>
            <div className={styles.contentContainer}>
                <div className={styles.topContainer}>
                    <p className={styles.topTitle}>Luo uusi keskustelu</p>
                    <button className={styles.closeButton}
                        onClick={() => { setIsShown(false) }}
                    >
                        <CloseIcon fill={"rgb(70,70,70)"} />
                    </button>
                </div>
                <p className={notification.color === 1 ? styles.notificationText : styles.notificationErrorText}>{notification.value}</p>
                <div className={styles.chatTypeSelectionButtonsContainer}>
                    <button className={styles.chatTypeSelectionButton}
                        onClick={() => { setSelectedChatType(1) }}
                    >
                        Yksityinen
                    </button>
                    <button className={styles.chatTypeSelectionButton}
                        onClick={() => { setSelectedChatType(2) }}
                    >
                        Ryhmä
                    </button>
                </div>
                {selectedChatType === 1 ?
                    <div className={styles.inputFieldAndCreateButtonContainer}>
                        <input
                            className={styles.inputField}
                            value={privateChatParticipantUsername}
                            placeholder="Käyttäjän nimi..."
                            onChange={(event) => { setPrivateChatParticipantUsername(event.target.value) }}
                        />
                        <button
                            className={styles.createButton}
                            onClick={() => {
                                handleCreatePrivateChatClick(privateChatParticipantUsername, setNotification)
                            }}
                        >
                            Luo yksityinen keskustelu
                        </button>
                    </div>
                    :
                    selectedChatType === 2 ?
                        <div className={styles.inputFieldAndCreateButtonContainer}>
                            <input
                                className={styles.inputField}
                                value={groupChatName}
                                placeholder="Ryhmän nimi..."
                                onChange={(event) => { setGroupChatName(event.target.value) }}
                            />
                            <button
                                className={styles.createButton}
                                onClick={() => {
                                    handleCreateGroupChatClick(groupChatName, setNotification)
                                }}
                            >
                                Luo ryhmä keskustelu
                            </button>
                        </div>
                        :
                        <></>
                }
            </div>
        </div >
    )
}

export default CreateNewChatModal