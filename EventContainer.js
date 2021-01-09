"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventContainer {
    constructor() {
        this.eventMap = {};
    }
    on(eventName, eventHandler) {
        if (this.eventMap[eventName] === undefined) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push(eventHandler);
    }
    pass(target, eventName) {
        target.on(eventName, (...params) => this.fireEvent(eventName, ...params));
    }
    pull(array, ...removeList) {
        const removeSet = new Set(removeList);
        return array.filter((el) => {
            return removeSet.has(el) !== true;
        });
    }
    off(eventName, eventHandler) {
        if (eventHandler === undefined) {
            delete this.eventMap[eventName];
        }
        else if (this.eventMap[eventName] !== undefined) {
            const index = this.eventMap[eventName].indexOf(eventHandler);
            if (index !== -1) {
                this.eventMap[eventName].splice(index, 1);
            }
            if (this.eventMap[eventName].length === 0) {
                delete this.eventMap[eventName];
            }
        }
    }
    async fireEvent(eventName, ...params) {
        if (this.eventMap[eventName] !== undefined) {
            for (const eventHandler of this.eventMap[eventName]) {
                await eventHandler(...params);
            }
        }
    }
    destroy() {
        this.fireEvent("destroy");
        this.eventMap = undefined;
    }
}
exports.default = EventContainer;
//# sourceMappingURL=EventContainer.js.map