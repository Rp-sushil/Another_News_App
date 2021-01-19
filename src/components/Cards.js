import React, { useState, useEffect } from "react";
import Card from "./Card";

export default function Cards({ news_data }) {
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    if (news_data) setIsloading(false);
  }, [news_data]);
  return (
    <div className="cards">
      {isloading ? (
        <p>Loading</p>
      ) : (
        news_data.map((article, i) => {
          return <Card props={article} key={i} />;
        })
      )}
    </div>
  );
}
