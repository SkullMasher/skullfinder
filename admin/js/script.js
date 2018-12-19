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

const db = { // Yeah I know
  'remote': '127.0.0.1:5984',
  'name': 'skullfinder_marker',
  'user': 'skullfinder-editor',
  'pass': 'topkek'
}
// Init the local and remote database
const markerDb = new PouchDB(db.name)
const remoteDbURL = `http://${db.user}:${db.pass}@${db.remote}/${db.name}`

let initSync = () => {
  let sync = PouchDB.sync(db.name, remoteDbURL, {
    live: true,
    retry: true
  }).on('change', info => {
    // handle change
    console.log('Change Information : ', info)
  }).on('paused', err => {
    // replication paused (e.g. replication up to date, user went offline)
    console.log('Paused (replication up to date, user went offline) : ', err)
  }).on('active', () => {
    // replicate resumed (e.g. new changes replicating, user went back online)
    console.log('Active')
  }).on('denied', err => {
    // a document failed to replicate (e.g. due to permissions)
    console.log('Denied : ', err)
  }).on('complete', info => {
    // handle complete
    console.log('Complete info : ', info)
  }).on('error', err => {
    // handle error
    console.log('err : ', err)
  })
}

let map
let skullMarker

let initMap = () => {
  let $formMarker = document.getElementById('formMarker')
  let $inputLat = $formMarker[0]
  let $inputLng = $formMarker[1]
  let $inputText = $formMarker[2]
  let $inputSubmit = $formMarker[3]

  markerDb.get('currentMarker')
    .then(res => {
      $inputLat.value = res.lat
      $inputLng.value = res.lng
      $inputText.value = res.text

      map = L.map('map', {
        zoomControl: true
      }).setView([res.lat, res.lng], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      skullMarker = new L.marker([res.lat, res.lng]).addTo(map)
        .bindPopup(res.text)
        .openPopup()

      map.on('click', (event) => {
        skullMarker.setLatLng(event.latlng)
        $inputLat.value = event.latlng.lat
        $inputLng.value = event.latlng.lng
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

let showAllDocs = () => {
  markerDb.allDocs({ include_docs: true })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.error(err)
    })
}

let mapFlyTo = (location) => {
  let lat = location.lat
  let lng = location.lng

  skullMarker.setLatLng([lat, lng])
    .bindPopup(location.text)
    .openPopup()

  map.flyTo([lat, lng], 13)
}

let setFeedback = (text, state) => {
  let elmt = document.querySelector('.js-feedbackText')
  let colorClass = [
    'color--success', 'color--error', 'color--warn', 'color--muted'
  ]

  elmt.classList.remove(...colorClass)
  switch (state) {
    case 'success':
      elmt.classList.add('color--success')
      break
    case 'warn':
      elmt.classList.add('color--warn')
      break
    case 'error':
      elmt.classList.add('color--error')
      break
    case 'muted':
      elmt.classList.add('color--muted')
      break
  }

  elmt.textContent = text
}

let initFastMarker = () => {
  let buttons = document.querySelectorAll('.js-fastmarkers button')

  Array.prototype.forEach.call(buttons, (btn, index) => {
    btn.addEventListener('click', (event) => {
      let location = btn.dataset.markername
      // Put the info into the currentMarker
      markerDb.bulkGet({
        docs: [
          { id: 'currentMarker' },
          { id: location }
        ]
      })
        .then((res) => {
          let updatedMarker = res.results[0].docs[0].ok
          let newLocation = res.results[1].docs[0].ok

          if (updatedMarker.lat === newLocation.lat) {
            let feedbackText = `Marker already set on ${newLocation._id}`
            return setFeedback(feedbackText, 'warn')
          } else {
            updatedMarker.lat = newLocation.lat
            updatedMarker.lng = newLocation.lng
            updatedMarker.text = newLocation.text
            // Weird but Nolan told me it's ok
            // https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
            return markerDb.put(updatedMarker).then((res) => {
              let feedbackText = `Marker as been set to ${location}`
              setFeedback(feedbackText, 'success')
              mapFlyTo(updatedMarker)
            })
          }
        })
        // .then((res) => {
        // })
        .catch((err) => {
          console.error(err)
        })
    })
  })
}

document.addEventListener('DOMContentLoaded', (event) => {
  initSync()
  initMap()
  initFastMarker()
  greetingMessage()
})
