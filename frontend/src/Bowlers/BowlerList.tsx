import { useState, useEffect } from 'react';
import { Bowler } from '../types/Bowler';
function BowlerList() {
  const [bowlerData, setBowlerData] = useState<Bowler[]>([]);

  useEffect(() => {
    const fetchBowlerData = async () => {
      const rsp = await fetch('https://localhost:44360/Bowler');
      const f = await rsp.json();
      setBowlerData(f);
    };

    fetchBowlerData();
  }, []);
  return (
    <>
      <div className="row">
        <h2 className="text-center">Bowling League Members</h2>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Bowler Name</th>
            <th>Team Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {bowlerData
            .filter(
              (b) =>
                b.team.teamName === 'Marlins' || b.team.teamName === 'Sharks',
            )
            .map((b) => (
              <tr key={b.bowlerId}>
                <td>{`${b.bowlerFirstName} ${b.bowlerMiddleInit ? b.bowlerMiddleInit + '. ' : ''}${b.bowlerLastName}`}</td>
                <td>{b.team.teamName}</td>
                <td>{b.bowlerAddress}</td>
                <td>{b.bowlerCity}</td>
                <td>{b.bowlerState}</td>
                <td>{b.bowlerZip}</td>
                <td>{b.bowlerPhoneNumber}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
export default BowlerList;
