import React, { useState } from "react";
import Card from "./Card";

const Movie = (props) => {
    const { movie } = props;

    const [viewCard, setViewCard] = useState(false);

    const updateViewCard = () => {
        setViewCard((prev) => !prev);
    };

    return (
        <>
            <div
                key={movie.episode_id}
                className="card-wrapper"
                onClick={updateViewCard}
            >
                <div className="card-info-wrapper">
                    <h3 className="card-info">
                        {movie.title}
                        <br />
                        {movie.release_date}
                    </h3>
                </div>
            </div>

            {viewCard && (
                <div className="popup-wrapper">
                    <Card movie={movie} updateViewCard={updateViewCard} />
                </div>
            )}
        </>
    );
};

export default Movie;
