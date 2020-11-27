function convertRestaurantsToCategories(restaurantList) {
  const categoryArray = [];
  const result = {};
  for (let i = 0; i < restaurantList.length; i += 1) {
    categoryArray.push(restaurantList[i].category);
  }
  // console.log(categoryArray);
  for (let i = 0; i < categoryArray.length; i += 1) {
    if (!result[categoryArray[i]]) {
      result[categoryArray[i]] = 0;
    }
    result[categoryArray[i]] += 1;
  }

  const reply = Object.keys(result).map((category) => ({
    y: result[category],
    label: category
  }));

  console.log('reply',reply);
  return reply;
}

function convertRestaurantsToCategories(restaurantList) {
  return restaurantList.reduce((collection, currentItem, index) => {
    const findCat = collection.find((f) => f.label === currentItem.category);
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

// return array.reduce((collection, item, i) => {
//   // for each item, check if we have a category for that item already
//   const findCat = collection.find((findItem) => findItem.label === item.category);
//   if (!findCat) {
//     collection.push({
//       label: item.category,
//       y: 1
//     });
//   } else {
//     const position = collection.findIndex((el) => el.label === item.category);
//     collection[position].y += 1;
//   }
//   return collection;
// }, []);

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  return {
    animationEnabled: true,
    colorSet: 'miscAdobe',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Restaurants By Category',
      labelFontSize: 12,
      scaleBreaks: {
        customBreaks: [{
          startValue: 40,
          endValue: 50,
          color: 'orange'
        },
        {
          startValue: 85,
          endValue: 100,
          color: 'orange'
        },
        {
          startValue: 140,
          endValue: 175,
          color: 'orange'
        }]
      }
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  // This should become a list of restaurants by category
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer));
  CanvasJS.addColorSet('miscAdobe',
    [// colorSet Array

      '#4F61F7',
      '#5DDDFC',
      '#60E69F',
      '#94FC5D',
      '#F2E75A'
    ]);

  const dataPoints = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(dataPoints);

  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
  $(window).on('resize', () => {
    chart.render();
  });
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});