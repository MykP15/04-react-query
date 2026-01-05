import css from "./MovieModal.module.css"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import type { Movie } from "../../types/movie"

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById("modal-root")

function MovieModal({onClose, movie}: MovieModalProps) {

  useEffect(() => {
const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose])

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };
 



  return createPortal(
    <>
      <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdrop}>
  <div className={css.modal}>
    <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
      &times;
    </button>
    <img
      src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
      className={css.image}
    />
    <div className={css.content}>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {`${movie.vote_average}/10`}
      </p>
    </div>
  </div>
</div>
    </>,
    modalRoot as HTMLDivElement
  )
}

export default MovieModal