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
  // const skullLatLng = [43.531127, 5.446]
  const frCenter = [46.9048494736673, 2.61474609375]
  let aix = new L.LatLng(43.531127, 5.446)
  let paris = new L.LatLng(48.8567605687911, 2.34334945678711)
  const skullOnRoad = [aix, paris]
  // const markerText = 'Florian est en route pour Paris !'

  let map = L.map('map', {
    zoomControl: true
  }).setView(frCenter, 6)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  // L.marker(skullLatLng).addTo(map)
  //   .bindPopup(markerText)
  //   .openPopup()

  let line = new L.Polyline(skullOnRoad, {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
  })
  line.addTo(map)
}

document.addEventListener('DOMContentLoaded', (event) => {
  greetingMessage()
  initMap()
})
