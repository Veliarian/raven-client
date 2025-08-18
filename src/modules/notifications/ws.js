import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;

export function connectWithJwt(jwt, onNotification, onConnected = () => {}) {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect(
        { Authorization: `Bearer ${jwt}` },
        () => {
            console.log("✅ STOMP connected");

            // персональні повідомлення
            stompClient.subscribe("/user/queue/notifications", (msg) => {
                onNotification(JSON.parse(msg.body));
            });

            // глобальні повідомлення
            stompClient.subscribe("/topic/notifications", (msg) => {
                onNotification(JSON.parse(msg.body));
            });

            onConnected();
        },
        (err) => {
            console.error("❌ STOMP error:", err);
        }
    );
}

export function disconnect() {
    if (stompClient) stompClient.disconnect(() => console.log("🔌 Disconnected"));
}