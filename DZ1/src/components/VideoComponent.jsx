export default function VideoComponent() {
  // демо-видео из W3Schools; можно заменить на файл из /public
  return (
    <div>
      <h2>VideoComponent</h2>
      <video
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
        width={600}
        style={{ display: 'block', maxWidth: '100%', borderRadius: '12px' }}
      />
    </div>
  );
}