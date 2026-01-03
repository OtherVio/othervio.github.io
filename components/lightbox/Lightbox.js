fetch("/components/lightbox/Lightbox.html")
  .then((stream) => stream.text())
  .then((html) => {
    const template = document.createElement("template");
    template.innerHTML = html;
    const element = document.body.appendChild(template);

    class Lightbox extends HTMLElement {
      #shadowRoot;
      #deviation;

      constructor() {
        super();

        let template = element;
        let templateContent = template.content;

        this.#shadowRoot = this.attachShadow({
          mode: "open",
        });
        this.#shadowRoot.appendChild(templateContent.cloneNode(true));
      }

      get deviation() {
        return this.#deviation;
      }

      set deviation(deviationName) {
        this.#deviation = deviationName;
        this.render();
      }

      open() {
        this.shadowRoot.querySelector("#next").onclick = () => {
          window.lightboxService.next();
          this.render.bind(this)();
        };
        this.shadowRoot.querySelector("#previous").onclick = () => {
          window.lightboxService.previous();
          this.render.bind(this)();
        };
        this.#shadowRoot.querySelector("dialog").showModal();
        this.render();
      }

      render() {
        let nextButton = this.#shadowRoot.querySelector("#next");
        if (window.lightboxService.hasNext()) {
          nextButton.classList.remove("hidden");
        } else {
          nextButton.classList.add("hidden");
        }

        let prevButton = this.#shadowRoot.querySelector("#previous");
        if (window.lightboxService.hasPrevious()) {
          prevButton.classList.remove("hidden");
        } else {
          prevButton.classList.add("hidden");
        }
      }
    }
    customElements.define("devi-lightbox", Lightbox);
  });
