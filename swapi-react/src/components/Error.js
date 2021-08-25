const Error = () => {
    return (
        <div className="error-message" style={{ color: "red" }}>
            <p>Something went wrong</p>
            <p>Could not fetch the data from the API</p>
        </div>
    );
};

export default Error;
