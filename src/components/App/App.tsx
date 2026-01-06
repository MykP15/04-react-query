import styles from "./App.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import { useEffect, useState } from "react";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useQuery, keepPreviousData } from '@tanstack/react-query';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')

  

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  })
  
  
  const totalPages = data?.total_pages ?? 0


  useEffect(() => {
  if ( isSuccess && data && data.results.length  === 0) {
        toast.error("No movies found for your request.");
      }
}, [data, isSuccess])

  const handleSearch = async (query: string) => {
    setQuery(query)
    setPage(1)
    
  };
  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {data && data.results.length > 0 && !isLoading && totalPages > 1 &&<ReactPaginate
        pageCount={totalPages} 
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        nextLabel="→"
        previousLabel="←"
      />}
      { isLoading ? <Loader /> : null}
      {isError ? <ErrorMessage /> : null}
      {data && data.results.length > 0 && !isLoading && (
        <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
