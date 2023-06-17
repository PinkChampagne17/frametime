type FrametimeObserver = (frametime: number) => void;

let prev: number;
let rafId: number | null = null;
let observers: FrametimeObserver[] = [];

function calcAndNotify() {
  const now = performance.now();
  const frametime = now - prev;
  prev = now;
  for (let i = 0, len = observers.length; i < len; i++) {
    observers[i](frametime);
  }
  rafId = requestAnimationFrame(calcAndNotify);
}

function initializeObserver() {
  prev = performance.now();
  rafId = requestAnimationFrame(calcAndNotify);
}

function startObserve() {
  rafId = requestAnimationFrame(initializeObserver);
}

function stopObserve() {
  cancelAnimationFrame(rafId as number);
  rafId = null;
}

function addObserver(observer: FrametimeObserver) {
  observers.push(observer);
}

function removeObserver(observer: FrametimeObserver) {
  const index = observers.indexOf(observer);
  observers.splice(index, 1);
}

function isObserversEmpty() {
  return observers.length === 0;
}

export function subscribeFrametime(observer: FrametimeObserver) {
  if (typeof observer !== "function") {
    throw TypeError(
      "Expected the argument passed to subscribeFrametime to be a function"
    );
  }
  if (isObserversEmpty()) {
    startObserve();
  }
  addObserver(observer);
  return function unsubscribeFrametime() {
    removeObserver(observer);
    if (isEmptyObservers()) {
      stopObserve();
    }
  };
}
