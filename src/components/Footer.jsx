import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="position-absolute bottom-0 w-100 left-100 row">
      <div className="col">
        <p className="text-center text-white">
          Made by{" "}
          <Link
            className="text-white font-weight-bold"
            to="https://github.com/bhanu-sh"
          >
            Bhanu
          </Link>
        </p>
      </div>
      <div className="col">
        <Link className="text-white" to="/contact">
          <p className="text-center text-white">Contact Us</p>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
