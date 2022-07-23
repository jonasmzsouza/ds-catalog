import ContentLoader from 'react-content-loader';

const CardLoader = () => (
  <div className="card-loader-container">
    <ContentLoader
      speed={2}
      width={300}
      height={330}
      viewBox="0 0 300 330"
      backgroundColor="#ECECEC"
      foregroundColor="#D2D2D2"
    >
      <rect x="0" y="0" rx="10" ry="10" width="300" height="300" />
    </ContentLoader>
  </div>
);

export default CardLoader;
