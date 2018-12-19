const greetingMessage = () => {
  console.log(`  #####   `)
  console.log(` #######  `)
  console.log(`#  ###  #  Hello There`)
  console.log(`#   #   # `)
  console.log(`#########  Come contribute to the code !`)
  console.log(` ### ###  `)
  console.log(`  #####    github.com/SkullMasher/skullfinder`)
  console.log(`  # # #   `)
}

let map
let skullMarker

const db = {
  'remote': '127.0.0.1:5984',
  'name': 'skullfinder_marker'
}

// Init the local and remote database
const localDb = new PouchDB(db.name)
const remoteDb = `http://${db.remote}/${db.name}`

let initSync = () => {
  return localDb.sync(remoteDb, {
    live: true,
    retry: true
  }).on('change', (info) => {
    // handle change
    console.log('Change Information : ', info)
  }).on('paused', (err) => {
    // replication paused (e.g. replication up to date, user went offline)
    console.log('Paused (replication up to date, user went offline) : ', err)
  }).on('active', () => {
    // replicate resumed (e.g. new changes replicating, user went back online)
    console.log('Active')
  }).on('denied', (err) => {
    // a document failed to replicate (e.g. due to permissions)
    console.log('Denied : ', err)
  }).on('complete', (info) => {
    // handle complete
    console.log('Complete info : ', info)
  }).on('error', (err) => {
    // handle error
    console.log('err : ', err)
  })
}

let mapFlyTo = (location) => {
  skullMarker.setLatLng([location.lat, location.lng])
    .bindPopup(location.text)
    .openPopup()

  map.flyTo([lat, lng], 13)
}

function initMap (res) {
  const lat = res.lat
  const lng = res.lng
  const txt = res.text
  // const frCenter = [46.9048494736673, 2.61474609375]
  // const skullOnRoad = [aix, paris]
  // const markerText = 'Florian est en route pour Paris !'

  map = L.map('map', {
    zoomControl: true
  }).setView([lat, lng], 8)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  skullMarker = L.marker([lat, lng]).addTo(map)
    .bindPopup(txt)
    .openPopup()

  // let line = new L.Polyline(skullOnRoad, {
  //   color: 'red',
  //   weight: 3,
  //   opacity: 0.5,
  //   smoothFactor: 1
  // })
  // line.addTo(map)
}

document.addEventListener('DOMContentLoaded', (event) => {
  greetingMessage()
  // initSync()
  localDb.get('currentMarker')
    .then(initMap)
    .catch(err => console.log(err))
})
