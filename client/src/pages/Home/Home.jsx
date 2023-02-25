import React from "react";
import Question from "../../components/Question/Question";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Question />
      <Link to="me">profile</Link>
    </div>
  );
};

export default Home;
