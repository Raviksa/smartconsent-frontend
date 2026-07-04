import "../styles/table.css";

export default function ConsentTable() {
  return (
    <div className="table-card">

      <h3>
        Recent Consents
      </h3>

      <table>

        <thead>

          <tr>

            <th>
              Patient
            </th>

            <th>
              Procedure
            </th>

            <th>
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          <tr>
            <td>John Doe</td>
            <td>TKR</td>
            <td>Completed</td>
          </tr>

          <tr>
            <td>Mary Smith</td>
            <td>ACL</td>
            <td>Pending</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}