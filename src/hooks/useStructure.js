const UseStructure = (data) => {
  console.log("data2", data);

  let res = {};
  data.map((match) => {
    let teams = Object.keys(match.score);
    let winner = null;
    let draw = false;
    let firstTeam = teams[0];
    let secondTeam = teams[1];
    let firstScore = match.score[firstTeam];
    let secondScore = match.score[secondTeam];

    if (firstScore > secondScore) {
      winner = firstTeam;
    } else if (firstScore < secondScore) {
      winner = secondTeam;
    } else if (firstScore === secondScore) {
      draw = true;
    }

    if (firstScore !== null && secondScore !== null) {
      teams.map((team, i) => {
        // Dynamically switch firstTeam and SecondTeam for data sorting
        firstTeam = team;
        secondTeam = teams[i ? 0 : 1];
        let firstScore = match.score[firstTeam];
        let secondScore = match.score[secondTeam];

        if (firstTeam in res && "points" in res[firstTeam]) {
          res[firstTeam] = {
            ...res[firstTeam],
            points:
              res[firstTeam].points + (winner === firstTeam ? 3 : draw ? 1 : 0),
            wins:
              winner === firstTeam
                ? res[firstTeam].wins + 1
                : res[firstTeam].wins,
            loses:
              winner !== firstTeam && !draw
                ? res[firstTeam].loses + 1
                : res[firstTeam].loses,
            draws: draw ? res[firstTeam].draws + 1 : res[firstTeam].draws,
            gf: res[firstTeam].gf + firstScore,
            ga: res[firstTeam].ga + secondScore,
            gd: res[firstTeam].gd + firstScore - secondScore,
            totalMatches: res[firstTeam].totalMatches + 1,
            pastMatches: [
              ...res[firstTeam].pastMatches,
              {
                firstTeam: {
                  ...res[firstTeam].pastMatches.firstTeam,
                  name: firstTeam,
                  score: firstScore
                },
                secondTeam: {
                  ...res[firstTeam].pastMatches.secondTeam,
                  name: secondTeam,
                  score: secondScore
                },
                date: match.date
              }
            ]
          };
        } else {
          res[firstTeam] = {
            ...res[firstTeam],
            points: winner === firstTeam ? 3 : draw ? 1 : 0,
            wins: winner === firstTeam ? 1 : 0,
            loses: winner !== firstTeam && !draw ? 1 : 0,
            draws: draw ? 1 : 0,
            gf: firstScore,
            ga: secondScore,
            gd: firstScore - secondScore,
            totalMatches: 1,
            pastMatches: [
              {
                firstTeam: { name: firstTeam, score: firstScore },
                secondTeam: { name: secondTeam, score: secondScore },
                date: match.date
              }
            ]
          };
        }
      });
    } else {
      teams.map((team) => {
        if (team in res && "fixtures" in res[team]) {
          res[team] = {
            ...res[team],
            fixtures: [...res[team].fixtures, match]
          };
        } else {
          res[team] = {
            ...res[team],
            fixtures: [match]
          };
        }
        return true;
      });
    }
    return true;
  });

  return { res };
};

export default UseStructure;
