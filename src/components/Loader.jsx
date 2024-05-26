import React from "react";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border loader text-danger mt-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
