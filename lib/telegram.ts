
export async function sendTelegramNotification(
    token: string,
    chatId: string,
    message: string
) {
    if (!token || !chatId) {
        console.warn("Telegram credentials missing");
        return;
    }

    try {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("Failed to send Telegram notification:", error);
        }
    } catch (error) {
        console.error("Error sending Telegram notification:", error);
    }
}
