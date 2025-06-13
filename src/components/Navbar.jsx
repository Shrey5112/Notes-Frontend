import React from "react";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <span className="logo mb-0 h1">Notes App</span>

      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          className="form-control"
          style={{ padding: "6px 10px" }}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </nav>
  );
};

export default Navbar;
