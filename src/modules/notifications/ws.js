import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const socket = new SockJS("http://localhost:8080/ws");
const stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
});

stompClient.onConnect = () => {
    console.log("Connected!");

    // підписка на повідомлення
    stompClient.subscribe("/topic/greetings", (msg) => {
        console.log("Отримано:", msg.body);
    });

    // відправка повідомлення
    stompClient.publish({ destination: "/app/hello", body: "Vue каже привіт!" });
};

stompClient.activate();