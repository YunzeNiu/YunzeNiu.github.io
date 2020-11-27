function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function getRandomIntInclusive(min, max) {
  const min1 = Math.ceil(min);
  const max1 = Math.floor(max);
  return Math.floor(Math.random() * (max1 - min1 + 1) + min1); // The maximum is inclusive and the minimum is inclusive
}

function changeDataShape(array) {
  return array.reduce((collection, item, i) => {
    // for each item, check if we have a category for that item already
    const findCat = collection.find((findItem) => findItem.label === item.category);
    if (!findCat) {
      collection.push({
        label: item.category,
        y: 1
      });
    } else {
      const position = collection.findIndex((el) => el.label === item.category);
      collection[position].y += 1;
    }
    return collection;
  }, []);
}

function manipulateAndBind(incomingArray) {
  const arrayOfTenItems = range(10);
  const randomRestaurantsArray = arrayOfTenItems.map((item) => {
    const which = getRandomIntInclusive(0, incomingArray.length);
    const restaurant = incomingArray[which]; // we are not worrying about uniqueness here
    return restaurant;
  });

  sessionStorage.setItem('shortRestaurantList', JSON.stringify(randomRestaurantsArray)); // Setting a globally available storage object;

  const div = document.createElement('div');
  div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(randomRestaurantsArray[0])}<br /><br />`;
  $('.flex-outer').append(div);

  /// And now, how to get what we want
  const newDataShape = changeDataShape(randomRestaurantsArray);

  const div2 = document.createElement('div');
  const obj = {
    label: randomRestaurantsArray[0].category,
    y: randomRestaurantsArray.length
  };
  div2.innerHTML = `<h2>What we want</h2> <br /> <h4>A category, how many things are in the category</h4><pre><code class="language-javascript">${JSON.stringify(obj)}</pre></code>`;

  $('.flex-outer').append(div2);
}

async function loadData() {
  const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const json = await data.json();
  return json;
}

function changeThings(evt, list) {
  console.log(evt.target.value);
    const block = document.querySelector('.catchMe');
    block.innerText = list;
}

async function mainThread() {
  console.log('Firing main thread');
  const manip = await loadData();
  console.log('Check session storage', sessionStorage);
  const restaurantData = JSON.parse(sessionStorage.getItem('shortRestaurantList'));
  // manipulateAndBind(manip);
  console.table(manip);
  restaurantData.forEach(item => {
    const target = document.querySelector('.flex-outer');
    const element = document.createElement('span');
    element.innerText = item.proper_hand_washing;
    target.append(element);
  })

  const list = range(10);
  document.addEventListener('change', (event) => { changeThings(event, list) });
}

// What does this do? It waits for the window to load, then it calls the function.
window.onload = mainThread;