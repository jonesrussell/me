export function calculateInitialPosition(
  header: HTMLElement,
  setPosition: (x: number, y: number) => void
) {
  const headerHeight = header.offsetHeight;
  const { clientWidth, clientHeight } = document.documentElement;
  const x = Math.floor(Math.random() * (clientWidth - header.offsetWidth));
  const y = Math.floor(
    Math.random() * (clientHeight - headerHeight) + headerHeight
  );
  console.log(`Initial position: x=${x}, y=${y}`);
  setPosition(x, y);
}

export function makeElementDraggable(
  node: HTMLElement,
  { x, y, header }: { x: number; y: number; header: HTMLElement }
) {
  let mouseX: number;
  let mouseY: number;

  function startDragging(event: MouseEvent) {
    mouseX = event.clientX - node.getBoundingClientRect().left;
    mouseY = event.clientY - node.getBoundingClientRect().top;
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', stopDragging);
  }

  function drag(event: MouseEvent) {
    x = event.clientX - mouseX;
    y = event.clientY - mouseY;
    limitMovementWithinViewport(node);
    if (node.parentNode instanceof HTMLElement) {
      node.parentNode.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }

  function stopDragging() {
    window.removeEventListener('mousemove', drag);
    window.removeEventListener('mouseup', stopDragging);
  }

  function limitMovementWithinViewport(node: HTMLElement) {
    if (node.parentNode instanceof HTMLElement) {
      if (x < 0) x = 0;
      if (x > window.innerWidth - node.parentNode.offsetWidth) {
        x = window.innerWidth - node.parentNode.offsetWidth;
      }
      if (header) {
        if (y < header.offsetHeight) y = header.offsetHeight;
        if (y > window.innerHeight - node.parentNode.offsetHeight) {
          y = window.innerHeight - node.parentNode.offsetHeight;
        }
      }
    }
  }

  node.addEventListener('mousedown', startDragging);

  return {
    destroy() {
      node.removeEventListener('mousedown', startDragging);
    }
  };
}
