import React, { useState, useEffect } from "react";
import { LinearProgress } from "@material-ui/core";
import Error from "./Error";

const Card = (props) => {
    const { movie, updateViewCard } = props;
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        Promise.all(
            movie.characters.map((url) =>
                fetch(url)
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error(res.status);
                        }
                        return res.json();
                    })
                    .then((data) => {
                        setCharacters((prev) => [...prev, data.name]);
                    })
            )
        )
            .then(() => {
                setLoading(false);
            })
            .catch((e) => {
                setHasError(true);
                setLoading(false);
            });

        // Cleanup
        return () => setHasError(false);
    }, [movie.characters]);

    return (
        <div className="popup">
            {loading ? (
                <>
                    <LinearProgress
                        color="secondary"
                        style={{ top: "6.5rem" }}
                    />
                    <h1 className="loading-message" style={{ color: "red" }}>
                        Loading Data . . .
                    </h1>
                </>
            ) : (
                <>
                    <div className="popup-content-wrapper">
                        <button
                            className="close-icon"
                            onClick={() => updateViewCard()}
                        >
                            X
                        </button>

                        <div className="popup-content">
                            {hasError && <Error />}

                            <h1 className="popup-title">{movie.title}</h1>
                            <h2>{movie.opening_crawl}</h2>
                            <br />

                            <h1 className="popup-title">Characters</h1>

                            <div className="popup-character-list">
                                {characters
                                    .sort((a, b) => a.localeCompare(b))
                                    .map((character, i) => (
                                        <h3 className="popup-character" key={i}>
                                            {character}
                                        </h3>
                                    ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;
