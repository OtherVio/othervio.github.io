class LoadingObserver {
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
    if (this.#deviationsLoaded.length === this.#deviationsToLoad.length) {
      this.notifyObservers();
    }
  }

  set deviationsToLoad(value) {
    this.#deviationsToLoad = value;
  }

  get deviationsToLoad() {
    return this.#deviationsToLoad;
  }
}

window.loading = new LoadingObserver();
