class ImageLoadingObserver {
  #deviationsToLoad;
  #deviationsLoaded;

  constructor() {
    this.observers = [];
    /*
      {tagName: [tag]}
    */
    this.#deviationsLoaded = [];
    this.#deviationsToLoad = [];
  }

  addObserver(fn) {
    this.observers.push(fn);
  }

  notifyObservers() {
    this.observers.forEach((fn) => fn());
  }

  loaded(deviationName) {
    if (!this.#deviationsLoaded.includes(deviationName))
      this.#deviationsLoaded.push(deviationName);
    this.notifyObservers();
  }

  set deviationsToLoad(value) {
    this.#deviationsToLoad = value;
  }

  get deviationsToLoad() {
    return this.#deviationsToLoad;
  }
}

window.imageLoading = new ImageLoadingObserver();
