// You may wish to find an effective randomizer function on MDN.

function getRandomNum(min, max) {
  const min1 = Math.ceil(min);
  const max1 = Math.floor(max);
  return Math.floor(Math.random() * (max1 - min1 + 1) + min1);
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(org, comparison, key) {
  if (org[key] < comparison[key]) {
    return -1;
  } if (org[key] > comparison[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  // set fave to yes
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      console.log('fromServer', fromServer);

      const array1 = range(10);
      let array2 = array1.map (() => (fromServer[getRandomNum(0, 243)]));
      while (new Set(array2).size !== array2.length) {
        array2 = array1.map (() => (fromServer[getRandomNum(0, 243)]));
      }

      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const reversed = array2.sort((a, b) => sortFunction(b, a, 'name'));
      const ul = document.createElement('ul');
      ul.className = 'flex-inner';
      $('form').prepend(ul);

      reversed.forEach((el, i) => {
        const li =document.createElement('li');
        $(li).append(`<input type = "checkbox" id = ${el.code} value=${el.code} />`);
        $(li).append(`<label for = ${el.code}>${el.name}</label>`);
        $(ul).append(li);
      });
    })
    .catch((err) => {
      console.log(err)
      // set fave to no
    });
});