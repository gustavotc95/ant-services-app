import './styles.scss';

interface IStarRatingProps {
  starRatingValue: number;
  setStarRatingValue: Function;
}

export default function StarRating({
  starRatingValue,
  setStarRatingValue,
}: IStarRatingProps) {
  function handleOptionChange(option: string) {
    setStarRatingValue(Number(option));
  }

  return (
    <>
      <div className="star-rating">
        <div className="radio-stars">
          <input
            type="radio"
            name="stars"
            id="star-null"
            value="0"
            checked={starRatingValue === 0}
            onChange={e => handleOptionChange(e.target.value)}
          />
          <input
            type="radio"
            name="stars"
            id="star-1"
            value="1"
            checked={starRatingValue === 1}
            onChange={e => handleOptionChange(e.target.value)}
          />
          <input
            type="radio"
            name="stars"
            id="star-2"
            value="2"
            checked={starRatingValue === 2}
            onChange={e => handleOptionChange(e.target.value)}
          />
          <input
            type="radio"
            name="stars"
            id="star-3"
            value="3"
            checked={starRatingValue === 3}
            onChange={e => handleOptionChange(e.target.value)}
          />
          <input
            type="radio"
            name="stars"
            id="star-4"
            value="4"
            checked={starRatingValue === 4}
            onChange={e => handleOptionChange(e.target.value)}
          />
          <input
            type="radio"
            name="stars"
            id="star-5"
            value="5"
            checked={starRatingValue === 5}
            onChange={e => handleOptionChange(e.target.value)}
          />
        </div>
        <div className="stars-box">
          <label
            htmlFor="star-1"
            className={starRatingValue >= 1 ? 'active' : ''}
          >
            <svg width="255" height="240" viewBox="0 0 51 48">
              <path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" />
            </svg>
          </label>
          <label
            htmlFor="star-2"
            className={starRatingValue >= 2 ? 'active' : ''}
          >
            <svg width="255" height="240" viewBox="0 0 51 48">
              <path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" />
            </svg>
          </label>
          <label
            htmlFor="star-3"
            className={starRatingValue >= 3 ? 'active' : ''}
          >
            <svg width="255" height="240" viewBox="0 0 51 48">
              <path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" />
            </svg>
          </label>
          <label
            htmlFor="star-4"
            className={starRatingValue >= 4 ? 'active' : ''}
          >
            <svg width="255" height="240" viewBox="0 0 51 48">
              <path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" />
            </svg>
          </label>
          <label
            htmlFor="star-5"
            className={starRatingValue >= 5 ? 'active' : ''}
          >
            <svg width="255" height="240" viewBox="0 0 51 48">
              <path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z" />
            </svg>
          </label>
        </div>
      </div>
    </>
  );
}
