import React, { useEffect, useState } from "react";

import Charts from "./components/Charts";
import Navbar from "./components/Navbar";
import { data } from "./data.js";
import { useDarkMode } from "./hooks/useDarkMode.jsx";

const App = () => {
  const [coinData, setCoinData] = useState(data);
  const [geceModu, setGeceModu] = useDarkMode(false);

  // console.log("gecemodu", geceModu);

  return (
    <div className={geceModu ? "App dark-mode" : "App"}>
      <Navbar geceModu={geceModu} setGeceModu={setGeceModu} />
      <Charts coinData={coinData} />
    </div>
  );
};

export default App;
