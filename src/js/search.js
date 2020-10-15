const URI = '/poisk?';

const search = {
  results: document.querySelector('.search__results'),
  reset: document.querySelector('.search__reset'),
  resultsText: document.querySelector('.search__results-not-found'),
  input: document.querySelector('.search__input'),
  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  },
  typeEvent() {
    console.log(this.input);
    this.input.addEventListener('input', () => {
      setTimeout(search.render, 500);
    });
  },
  render() {
    const query = search.input.value;
    fetch(`${URI}q=${query}`)
      .then((response) => response.text())
      .then(function (data) {
        if (!search.isEmptyOrSpaces(data)) {
          search.results.innerHTML = data;
          search.resultsText.innerHTML = '';
        } else {
          search.resultsText.innerHTML = `По запросу « ${query} » ничего не найдено`;
          search.results.innerHTML = '';
        }
      });
  },
  init() {
    this.typeEvent();
  },
};

export default search;
