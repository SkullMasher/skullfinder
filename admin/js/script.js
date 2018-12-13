const greetingMessage = () => {
  console.log('  #####   ')
  console.log(' #######  ')
  console.log('#  ###  # ' + ' Hello There')
  console.log('#   #   # ')
  console.log('######### ' + ' Come contribute to the code !')
  console.log(' ### ###  ')
  console.log('  #####   ' + ' github.com/SkullMasher/skullfinder')
  console.log('  # # #   ')
}


let initMap = () => {
  const skullLatLng = [43.531127, 5.446]
  const markerText = 'Florian est à Aix en Provence !'
  let $form = document.getElementById('formMarker')

  let map = L.map('map',{
    zoomControl: true
  }).setView(skullLatLng, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  let skullMarker = new L.marker(skullLatLng).addTo(map)
    .bindPopup(markerText)
    .openPopup()

  map.on('click', (e) => {
    skullMarker.setLatLng(e.latlng)
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  greetingMessage()
  initMap()
});
