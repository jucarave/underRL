interface Callback {
  callback: Function;
  binded: Function;
}

class Signal {
  private _listeners: Array<Callback>;

  constructor() {
    this._listeners = new Array();
  }

  public add(callback: Function, context: any): void {
    this._listeners.push({ callback, binded: callback.bind(context) });
  }

  public remove(callback: Function): void {
    const ind = this._listeners.findIndex((element: Callback) => element.callback === callback);

    if (ind !== -1) {
      this._listeners.splice(ind, 1);
    }
  }

  public dispatch(...args: Array<any>): void {
    const len = this._listeners.length;

    for (let i = 0; i < len; i++) {
      this._listeners[i].binded(...args);
    }
  }
}

export default Signal;
