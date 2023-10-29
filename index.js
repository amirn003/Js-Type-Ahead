const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

const prom = fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data))

console.log(cities)

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  })
}

function numberWithCommas(x) {
  x = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
  return x;
}

function displayMatches() {
  // console.log(this.value);
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
    return `
      <li>
        <span class="name">${cityName}, ${stateName} </span>
        <span class="population"><b>${numberWithCommas(place.population)} </b></span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
  console.log(html);
}

const searchValue = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchValue.addEventListener('change', displayMatches);
searchValue.addEventListener('keyup', displayMatches);
