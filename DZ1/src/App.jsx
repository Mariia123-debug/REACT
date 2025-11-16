
import './App.css'

import ImageComponent from './components/ImageComponent';
import VideoComponent from './components/VideoComponent';
import ParagraphsComponent from './components/ParagraphsComponent';
import ListsComponent from './components/ListsComponent';

export default function App() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24, lineHeight: 1.5 }}>
      <h1>Моё первое React-приложение</h1>
      <ImageComponent />
      <hr />
      <VideoComponent />
      <hr />
      <ParagraphsComponent />
      <hr />
      <ListsComponent />
    </main>
  );
}

