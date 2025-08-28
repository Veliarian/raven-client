import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { authHeader } from "@/shared/utils/authHeader.js";

let client = null;
const socket = new SockJS("http://localhost:8080/ws");
const subscriptions = new Map(); // Map<destination, callback[]>

/**
 * Підключаємося до WebSocket (STOMP) один раз на весь застосунок
 */
export function connectWebsocket() {
    if (client && client.connected) return;

    client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: authHeader(),
        debug: str => console.log("STOMP:", str),
        reconnectDelay: 5000,
    });

    client.onConnect = () => {
        console.log("WebSocket connected");

        // ресабскрайбимо всі канали після реконекту
        subscriptions.forEach((callbacks, destination) => {
            callbacks.forEach(cb => subscribe(destination, cb));
        });
    };

    client.activate();
}

/**
 * Внутрішня функція підписки
 */
function subscribe(destination, callback) {
    client.subscribe(destination, (msg) => {
        if (msg.body) {
            try {
                callback(JSON.parse(msg.body));
            } catch {
                callback(msg.body);
            }
        }
    });
}

/**
 * Підписка на канал
 */
export function subscribeWebsocket(destination, callback) {
    if (!subscriptions.has(destination)) {
        subscriptions.set(destination, []);
    }
    subscriptions.get(destination).push(callback);

    if (client && client.connected) {
        subscribe(destination, callback);
    }
}

/**
 * Відключення від WS
 */
export function disconnectWebsocket() {
    if (client) {
        client.deactivate();
        client = null;
    }
}