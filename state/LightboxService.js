class LightboxService {
  #deviationId;

  constructor() {
    if (location.hash) {
      const id = location.hash.slice(1);
      window.deviationLoading.addObserver(() => this.openLightbox(id), 500);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" && this.hasNext()) this.next();
      else if (e.key === "ArrowLeft" && this.hasPrevious()) this.previous();
    });

    window.addEventListener("hashchange", (_event) => {
      window.setTimeout(() => {
        if (location.hash) {
          const id = location.hash.slice(1);
          this.openLightbox(id);
        } else {
          this.closeLightbox();
        }
      });
    });
  }

  openLightbox(deviationId) {
    this.#deviationId = deviationId;
    location.hash = deviationId;

    if (document.body.querySelector("devi-lightbox")) {
      document.body.removeChild(document.body.querySelector("devi-lightbox"));
    }

    const lightbox = document.createElement("devi-lightbox");

    const element = document.createElement("devi-deviation");

    const gallery = document.querySelector("devi-gallery");
    const deviations = gallery.getDeviations();

    let deviation;
    for (let d of deviations) {
      if (d.id === deviationId) deviation = d;
    }

    element.markdown = deviation["markdown"];
    element.title = deviation["title"];
    element.date = deviation["date"];
    element.image = deviation["image"];

    document.body.appendChild(lightbox);
    let dialog = lightbox.shadowRoot.querySelector("#lightbox-content");
    dialog.appendChild(element);
    lightbox.open();
  }

  closeLightbox() {
    if (document.body.querySelector("devi-lightbox")) {
      document.body.removeChild(document.body.querySelector("devi-lightbox"));
    }
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }

  hasNext() {
    return !!this.next(false);
  }

  hasPrevious() {
    return !!this.previous(false);
  }

  next(open = true) {
    const gallery = document.querySelector("devi-gallery");
    const deviations = gallery.getDeviations();

    let deviation;
    let found;
    for (let d of deviations) {
      if (deviation) {
        deviation = d;
        found = true;
        break;
      }
      if (d.id === this.#deviationId) {
        deviation = d;
      }
    }

    if (deviation && open) this.openLightbox(deviation.id);
    return found ? deviation?.id : undefined;
  }

  previous(open = true) {
    const gallery = document.querySelector("devi-gallery");
    const deviations = gallery.getDeviations();

    let deviation;
    for (let d of deviations) {
      if (d.id === this.#deviationId) {
        break;
      }
      deviation = d;
    }

    if (deviation && open) this.openLightbox(deviation.id);
    return deviation?.id;
  }
}

window.lightboxService = new LightboxService();
