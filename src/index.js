import { before } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

const MessageEvents = findByProps("sendMessage");

let unpatch;

export default {
    onLoad() {
        unpatch = before("sendMessage", MessageEvents, ([, message]) => {
            if (!message || typeof message.content !== "string") return;

            const content = message.content.trimEnd();

            if (!content) return;
            if (content.startsWith("/")) return;

            if (!content.endsWith(".")) {
                message.content = content + ".";
            }
        });
    },

    onUnload() {
        if (unpatch) unpatch();
    }
};
