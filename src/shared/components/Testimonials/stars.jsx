export default function Stars({ rating }) {
    const stars = [];
    const scaledRating = rating / 2;
  
    for (let i = 0; i < 5; i++) {
      if (scaledRating >= i + 1) {
        stars.push(<span key={i}>★</span>); 
      } else if (scaledRating > i && scaledRating < i + 1) {
        stars.push(<span key={i}>☆</span>); 
      } else {
        stars.push(<span key={i}>☆</span>); 
      }
    }
  
    return <div style={{ color: 'rgba(255, 107, 188, 1)', fontSize: '1.4rem' }}>{stars}</div>;
  }
  