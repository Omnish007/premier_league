import { useNavigate } from "react-router-dom";
import style from "../assets/css/LeagueTable.module.scss";

const LeagueTable = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className={style.leagueTableHeading}>League Standings</h1>
      <div className={style.leagueStandingWrapper}>
        <table>
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Team</th>
              <th>Matches Played</th>
              <th>W</th>
              <th>L</th>
              <th>D</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).length > 0 &&
              Object.keys(data)
                .sort((a, b) => data[a].points < data[b].points)
                .map((e, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td
                      className="team-name"
                      onClick={() =>
                        navigate("/fixtures", {
                          state: {
                            fixtures: data[e].fixtures,
                            pastMatches: data[e].pastMatches
                          }
                        })
                      }
                    >
                      {e}
                    </td>
                    <td>{data[e].totalMatches}</td>
                    <td>{data[e].wins}</td>
                    <td>{data[e].loses}</td>
                    <td>{data[e].draws}</td>
                    <td>{data[e].gf}</td>
                    <td>{data[e].ga}</td>
                    <td>{data[e].gd}</td>
                    <td>{data[e].points}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeagueTable;
