

   

 import { useState } from "react";

function Rating() {
  // состояние рейтинга
  const [ratingValue, setRatingValue] = useState(0);

  // список изображений
  const ratingList = [
    'https://w7.pngwing.com/pngs/448/242/png-transparent-star-rating-rating-feedback-star-rate-review-3d-icon-thumbnail.png',
    'https://w7.pngwing.com/pngs/782/289/png-transparent-star-rating-one-illustration-thumbnail.png', 
     'https://w7.pngwing.com/pngs/38/1003/png-transparent-two-star-rating-star-rating-rating-feedback-star-rate-3d-icon-thumbnail.png',
     'https://w7.pngwing.com/pngs/617/482/png-transparent-three-star-rating-star-rating-rating-feedback-star-rate-3d-icon-thumbnail.png',
     'https://w7.pngwing.com/pngs/514/480/png-transparent-star-review-rating-icon-thumbnail.png',
     'https://w7.pngwing.com/pngs/538/719/png-transparent-five-star-graybeal-s-all-service-heating-and-cooling-hotel-star-val-gardena-restaurant-five-pointed-star-ratings-chart-angle-food-leaf-thumbnail.png '
  ];

  // подписи кнопок
  const ratingNames = ["Ужасно","Плохо", "Приемлемо", "Хорошо", "Отлично"];

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      {/* изображение рейтинга */}
      <img
        src={ratingList[ratingValue]}
        alt="rating"
        style={{
          width: "180px",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      />

      {/* кнопки рейтинга */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {ratingNames.map((label, index) => (
          <button
            key={index}
            onClick={() => setRatingValue(index)}
            style={{
              padding: "10px 16px",
              backgroundColor: ratingValue === index ? "#4CAF50" : "#008CBA",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Rating;