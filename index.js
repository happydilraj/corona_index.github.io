function update() {
    fetch("/corona_index.github.io/data.json") //api for the get request
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
  
        res.data.forEach((element) => {
          longitude = element.longitude;
          latitude = element.latitude;
          cases = element.infected;
          country = element.name;
  
          const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            `Corona Cases in ${country} are ${cases}`
          );
  
          // create DOM element for the marker
          const el = document.createElement("div");
          el.id = "marker";
  
          // create the marker
          new mapboxgl.Marker(el)
            .setLngLat([longitude, latitude])
            .setPopup(popup) // sets a popup on this marker
            .addTo(map);
        });
        map.addControl(new mapboxgl.FullscreenControl());
        map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
        );
      });
  }
  
  update();
  