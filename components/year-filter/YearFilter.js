fetch("/components/year-filter/YearFilter.html")
  .then((stream) => stream.text())
  .then((html) => {
    const template = document.createElement("template");
    template.innerHTML = html;
    const element = document.body.appendChild(template);

    class YearFilter extends HTMLElement {
      #shadowRoot;

      constructor() {
        super();

        let template = element;
        let templateContent = template.content;

        const shadowRoot = this.attachShadow({
          mode: "open",
        });
        this.#shadowRoot = shadowRoot;
        shadowRoot.appendChild(templateContent.cloneNode(true));

        this.render();
      }

      render() {
        let to = this.#shadowRoot.querySelector("#to");
        to.onchange = this.selectTo.bind(this);

        let from = this.#shadowRoot.querySelector("#from");
        from.id = "from";
        from.onchange = this.selectFrom.bind(this);

        let years = window.years.years.sort((a, b) => b - a);
        for (let year of years) {
          for (let el of [to, from]) {
            let option = document.createElement("option");
            option.value = year;
            option.innerHTML = year;
            el.appendChild(option);
          }
        }
      }

      selectFrom() {
        let from = this.#shadowRoot.querySelector("#from");
        window.filters.from = from.value;
      }

      selectTo() {
        let to = this.#shadowRoot.querySelector("#to");
        window.filters.to = to.value;
      }
    }
    customElements.define("devi-year-filter", YearFilter);
  });
