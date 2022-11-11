import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "../assets/css/FixtureList.module.scss";
import { logo } from "../utils/clubLogo.js";

const FixtureList = ({ data, details }) => {
  const { state: matches } = useLocation();
  const [sortedMathces, setSortedMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!matches) {
      navigate("/");
    } else {
      const sorted = matches.fixtures.sort(function (a, b) {
        return new Date(b.date) < new Date(a.date);
      });
      setSortedMatches(sorted);
    }
  }, [matches, navigate]);

  useEffect(() => {
    console.log("matches", matches);
  }, [matches]);

  return (
    <>
      <h1 className={style.fixturesListHeading}>Past Matches</h1>
      {matches?.pastMatches?.length > 0 &&
        matches.pastMatches.map((e, i) => (
          <div className={style.pastMatchesMainWrapper} key={i}>
            <div className={style.teamsWrapper}>
              <div
                className={`${style.singleTeamWrapper} ${
                  e.firstTeam.score > e.secondTeam.score && style.winnerTeam
                }`}
              >
                <p className={style.pastMatchTeamName}>
                  (H) {e.firstTeam.name}
                </p>
                <img
                  className={style.pastMatchTeamLogo}
                  src={logo[e.firstTeam.name]}
                  alt=""
                />
                <p className={style.pastMatchTeamScore}>{e.firstTeam.score}</p>
              </div>
              <div className={style.versuswrapper}>
                <h3>{format(parseISO(e.date), "dd/MM")}</h3>
              </div>
              <div
                className={`${style.singleTeamWrapper} ${
                  e.firstTeam.score < e.secondTeam.score && style.winnerTeam
                }`}
              >
                <p className={style.pastMatchTeamScore}>{e.secondTeam.score}</p>
                <img
                  className={style.pastMatchTeamLogo}
                  src={logo[e.secondTeam.name]}
                  alt=""
                />
                <p className={style.pastMatchTeamName}>
                  (A) {e.secondTeam.name}
                </p>
              </div>
            </div>
          </div>
        ))}

      <h1 className={style.fixturesListHeading}>Fixtures List</h1>
      {matches &&
        sortedMathces.map((e, i) => (
          <div className={style.mainWrapper} key={i}>
            <div className={style.teamsWrapper}>
              <div className={style.singleTeamWrapper}>
                <p> (H) {Object.keys(e.score)[0]} </p>
                <img src={logo[Object.keys(e.score)[0]]} alt="" />
              </div>
              <div className={style.versuswrapper}>
                <h3>{format(parseISO(e.date), "dd/MM, HH:mm")}</h3>
              </div>
              <div className={style.singleTeamWrapper}>
                <img src={logo[Object.keys(e.score)[1]]} alt="" />
                <p>(A) {Object.keys(e.score)[1]} </p>
              </div>
            </div>
          </div>
        ))}
      <h1 onClick={() => navigate("/")} className={style.homeBtn}>
        <i className="fa-solid fa-house-chimney"></i>
      </h1>
    </>
  );
};

export default FixtureList;
