export const attachPaneSplitterInteractionListeners = ({
  mouseMoveCallback,
  mouseUpCallback,
}: {
  mouseMoveCallback: (e: MouseEvent) => void;
  mouseUpCallback: () => void;
}) => {
  const handleMouseUp = () => {
    mouseUpCallback();
    window.removeEventListener("mouseup", handleMouseUp as EventListener);
    window.removeEventListener("mousemove", mouseMoveCallback as EventListener);
  };
  window.addEventListener("mouseup", handleMouseUp as EventListener);
  window.addEventListener("mousemove", mouseMoveCallback as EventListener);
};

export const endInteraction = () => {
  window.dispatchEvent(new Event("mouseup"));
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): T => {
  let timeout: number | undefined;

  return function (this: any, ...args: Parameters<T>): void {
    const context = this;

    if (timeout !== undefined) {
      clearTimeout(timeout);
    }

    timeout = window.setTimeout(() => {
      func.apply(context, args);
    }, wait);
  } as T;
};
