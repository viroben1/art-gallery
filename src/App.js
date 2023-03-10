
import './App.css';
import ButtonBar from './componets/ButtonBar'
import Gallery from './componets/Gallery'
import {useState, useEffect} from 'react'

function App() {
  let [data, setData] = useState({})
  let [objectId, setObjectId] = useState(12755)
  const errorImg = 'https://placekitten.com/200/200'

  let [objectImg, setObjectImg] = useState(errorImg)


  useEffect(() => {
    document.title='Welcome to ArtWorld'
    setObjectImg(null)
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
    .then(response => response.json())
    .then(resdata => {
      setData(resdata)
      setObjectImg(resdata.primaryImage)
    })
  }, [objectId])

  const handleIterate = (e) => {
    setObjectId(objectId + Number(e.target.value))
  }

  const displayImage = () => {
    if(!objectImg) {
      return (
        <h2>Loading...</h2>
      )
    }
    return (
      <Gallery objectImg={data.primaryImage} artist={data.artistDisplayName} title={data.title} />

    )
  }

  return (
    <div className="App">
      <h1>{data.title}</h1>
      <div style={{'width': '100%'}}>
        {displayImage()}
      </div>
      <ButtonBar handleIterate={handleIterate} />
    </div>
  );
}
export default App;