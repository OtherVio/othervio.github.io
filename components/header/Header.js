fetch("/components/header/Header.html")
  .then((stream) => stream.text())
  .then((html) => {
    const template = document.createElement("template");
    template.innerHTML = html;
    const element = document.body.appendChild(template);

    class Header extends HTMLElement {
      #shadowRoot;

      constructor() {
        super();

        let template = element;
        let templateContent = template.content;

        this.#shadowRoot = this.attachShadow({
          mode: "open",
        });
        this.#shadowRoot.appendChild(templateContent.cloneNode(true));

        window.themeService.addObserver(this.render.bind(this));
        this.render();
      }

      render() {
        let title = this.#shadowRoot.querySelector("h1");
        title.innerText = window.themeService.title;

        let description = this.#shadowRoot.querySelector(".description");
        description.innerText = window.themeService.description;

        let footer = this.#shadowRoot.querySelector(".footer");
        footer.innerText = window.themeService.footer;
      }
    }
    customElements.define("devi-header", Header);
  });
