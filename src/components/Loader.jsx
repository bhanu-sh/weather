import React from "react";

const Loader = () => {
  return (
    <div class="d-flex justify-content-center">
      <div class="spinner-border loader text-danger mt-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
