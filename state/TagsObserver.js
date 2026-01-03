class TagsObserver {
  #tags;

  constructor() {
    /*
      {tagName: [tag]}
    */
    this.#tags = {};
  }

  get tags() {
    return this.#tags;
  }

  set tags(tags) {
    this.#tags = tags;
  }
}

window.tags = new TagsObserver();
