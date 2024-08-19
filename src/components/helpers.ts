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
