import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cards from "./Cards";
import Search from "./Search";
import Pagination from "./Pagination";

const newsAPI = {
  key: "1321740c80c3874a09a04e802b81c02a",
  base: "https://gnews.io/api/v4/",
};

export default function News() {
  let { lan } = useParams();
  const [counter, setCounter] = useState(0);
  const [news_data, setNews_data] = useState(undefined);
  const [query, setQuery] = useState(undefined);
  const [val, setVal] = useState("");

  useEffect(() => {
    const fetchNews = async (params) => {
      console.log(
        `${newsAPI.base}${params}&lang=${lan || "en"}&max=${
          counter * 3 + 3
        }&token=${newsAPI.key}`
      );
      await fetch(
        `${newsAPI.base}${params}&lang=${lan || "en"}&max=${
          counter * 3 + 3
        }&token=${newsAPI.key}`
      )
        .then(function (response) {
          if (response.ok) return response.json();
          else throw new Error("Something went wrong");
        })
        .then(function (data) {
          setNews_data(data.articles.slice(counter * 3, counter * 3 + 3));
          console.log(data);
        })
        .catch((error) => console.log(error));
    };
    if (!query) fetchNews("top-headlines?");
    if (query) fetchNews(`search?q=${query}`);
    // console.log(isSearching);
  }, [counter, query, lan]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = e.target.query.value;
    if (!q || q.length === 0) return;
    setQuery(q);
    setCounter(0);
  };
  const handleExit = () => {
    setVal("");
    setCounter(0);
    setQuery(undefined);
  };
  return (
    <div className="news">
      <Search handleSearch={handleSearch} val={val} setVal={setVal} />
      {query ? <button onClick={handleExit}>Exit Search Mode</button> : ""}
      <Pagination counter={counter} setCounter={setCounter} />
      <Cards news_data={news_data} />
    </div>
  );
}
