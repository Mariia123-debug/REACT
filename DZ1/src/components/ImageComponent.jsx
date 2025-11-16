export default function ImageComponent() {
  // можно использовать любое изображение из сети или из /public
  return (
    <div>
      <h2>ImageComponent</h2>
      <img
        src="https://picsum.photos/600/400"
        alt="Random"
        width={600}
        height={400}
        style={{ display: 'block', maxWidth: '100%', borderRadius: '12px' }}
      />
    </div>
  );
}