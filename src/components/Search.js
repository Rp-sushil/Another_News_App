import React from "react";

export default function Search({ handleSearch, val, setVal }) {
  return (
    <div className="Search">
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search"
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          name="query"
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
