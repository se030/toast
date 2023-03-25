export const eventEmitter = {
  eventMap: new Map<ToastEvent, Function[]>(),

  on: function (e: ToastEvent, cb: Function) {
    this.eventMap.get(e) || this.eventMap.set(e, []);
    this.eventMap.get(e)!.push(cb);
    return this;
  },

  off: function (e: ToastEvent) {
    this.eventMap.delete(e);
    return this;
  },

  emit: function <T extends ToastEvent>(e: T, params: ToastEventParams<T>) {
    this.eventMap.get(e)?.forEach((cb) => cb(params));
    return this;
  },
};
