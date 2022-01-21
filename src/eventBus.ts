type Listeners = { [x: string]: Array<(...args: unknown[]) => void> };

export default class EventBus<E extends string> {
  listeners: Listeners;

  constructor() {
    this.listeners = {};
  }

  on(event: E, callback: (...args: any[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]!.push(callback);
  }

  off(event: E, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]!.filter(
      (listener) => listener !== callback
    );
  }

  emit(event: E, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event]!.forEach(function (listener) {
      listener(...args);
    });
  }
}
