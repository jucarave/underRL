import Signal from './system/Signal';

class Input {
  private static instance: Input;

  public onKeyDown: Signal;
  public onKeyUp: Signal;
  public onMouseDown: Signal;
  public onMouseUp: Signal;
  public onMouseMove: Signal;

  public static getInstance(): Input {
    if (!Input.instance) {
      Input.instance = new Input();
    }

    return Input.instance;
  }

  constructor() {
    this.onKeyDown = new Signal();
    this.onKeyUp = new Signal();
    this.onMouseDown = new Signal();
    this.onMouseUp = new Signal();
    this.onMouseMove = new Signal();

    document.body.addEventListener('keydown', (ev: KeyboardEvent) => {
      this.onKeyDown.dispatch(ev);
    });

    document.body.addEventListener('keyup', (ev: KeyboardEvent) => {
      this.onKeyUp.dispatch(ev);
    });

    document.body.addEventListener('mousedown', (ev: MouseEvent) => {
      this.onMouseDown.dispatch(ev);
    });

    document.body.addEventListener('mouseup', (ev: MouseEvent) => {
      this.onMouseUp.dispatch(ev);
    });

    document.body.addEventListener('mousemove', (ev: MouseEvent) => {
      this.onMouseMove.dispatch(ev);
    });
  }
}

export default Input;
