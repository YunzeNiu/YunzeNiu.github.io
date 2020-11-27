function matchWord(wordMatch, data) {
  return data.filter((item) => {
    const regex = new RegExp(wordMatch, 'gi'); // This matches case-insensitively through the whole string
    // check names first
    // we could also check owners or compliance!
    return item.name.match(regex) || item.category.match(regex);
  });
}

function displayMatches(e, dataSet) {
  console.log(e.target.value);
  const matches = matchWord(e.target.value, dataSet);
  let placesHTML = matches.map((place) => `
    <li>
        <span class="name">${place.name}</span><br>
        <span class="category">${place.category}</span>
        <address>${place.address_line_1}<br>
        ${place.city}<br>
        ${place.zip}<address>
    </li>
    `);
  if (e.target.value.length == 0) {
    placesHTML = [];
  }
  return placesHTML;
}

async function mainThread() {
  const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const json = await data.json();
  const input = document.querySelector('input[type="text"]');
  input.addEventListener('input', (e) => {
    const makeMatchesList = displayMatches(e, json);
    const target = document.querySelector('.suggestions');
    target.innerHTML = makeMatchesList;
  });
}

window.onload = mainThread;