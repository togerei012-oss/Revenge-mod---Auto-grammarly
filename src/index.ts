import { before } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";
import Settings from "./settings";

const MessageEvents = findByProps("sendMessage");

let unpatch: () => void;

function shouldIgnore(content: string) {
    if (!content.trim()) return true;

    // Slash commands
    if (content.startsWith("/")) return true;

    return false;
}

export default {
    onLoad() {
        unpatch = before("sendMessage", MessageEvents, ([, message]) => {
            if (typeof message?.content !== "string") return;

            let content = message.content.trimEnd();

            if (shouldIgnore(content)) return;

            // Chỉ cần cuối chưa là "." thì thêm
            if (!content.endsWith(".")) {
                content += ".";
            }

            message.content = content;
        });
    },

    onunload() {
        unpatch?.();
    },

    settings: Settings
};
