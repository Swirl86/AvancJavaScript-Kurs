import React, { useState, useEffect } from "react";
import { LinearProgress } from "@material-ui/core";
import Navbar from "./components/Navbar";
import Movie from "./components/Movie";
import Error from "./components/Error";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const baseUrl = "https://swapi.dev/api/films/";

    useEffect(() => {
        fetch(baseUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.status);
                }
                return res.json();
            })
            .then((data) => {
                setMovies(data.results);
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            })
            .catch((e) => {
                setLoading(false);
                setHasError(true);
            });
    }, [hasError]);

    return (
        <div className="app">
            <Navbar />
            {hasError && <Error />}
            {loading ? (
                <>
                    <LinearProgress color="secondary" />
                    <h1 className="loading-message">Loading Data . . .</h1>
                </>
            ) : (
                <>
                    <div className="wrapper">
                        {movies
                            .sort((a, b) => a.release_date - b.release_date)
                            .map((movie, i) => (
                                <Movie key={i} movie={movie} />
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
