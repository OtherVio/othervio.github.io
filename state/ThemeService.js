class ThemeService {
  constructor() {
    fetch("/theme/theme.txt")
      .then((stream) => stream.text())
      .then((txt) => {
        let lines = txt.split(/\r?\n/);

        let dict = {};

        for (let i = 0; i < lines.length; i++) {
          let idx = lines[i].indexOf(":");
          let variable = lines[i].substring(0, idx).replace(": ", "");
          let value = lines[i].substring(idx).replace(": ", "");

          if (variable && value) {
            dict[variable] = value;
          }
        }

        document.documentElement.style.cssText =
          "--gallery-background-color: " +
          dict["gallery-background-color"] +
          ";";
        document.documentElement.style.cssText +=
          "--panel-background-color: " + dict["panel-background-color"] + ";";
        document.documentElement.style.cssText +=
          "--text-color: " + dict["text-color"] + ";";

        document.documentElement.style.cssText +=
          "--filter-button-border-color: " +
          dict["filter-button-border-color"] +
          ";";
        document.documentElement.style.cssText +=
          "--filter-button-text-color: " +
          dict["filter-button-text-color"] +
          ";";
        document.documentElement.style.cssText +=
          "--filter-button-color: " + dict["filter-button-color"] + ";";
      });
  }
}

window.themeService = new ThemeService();
