class YearsObserver {
  #years;

  constructor() {
    this.#years = [];
  }

  get years() {
    return this.#years;
  }

  set years(years) {
    this.#years = years;
  }
}

window.years = new YearsObserver();
