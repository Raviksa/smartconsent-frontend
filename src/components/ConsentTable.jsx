import "../styles/table.css";

export default function ConsentTable({
  recentConsents
}) {
  return (
    <div className="table-card">

      <h3>
        Recent Consents
      </h3>

      <table>

        <thead>
          <tr>
            <th>Patient</th>
            <th>Procedure</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>

          {
            recentConsents.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    textAlign: "center"
                  }}
                >
                  No consents yet
                </td>
              </tr>
            ) : (
              recentConsents.map(
                consent => (
                  <tr
                    key={consent.id}
                  >
                    <td>
                      {consent.full_name}
                    </td>

                    <td>
                      {
                        consent.procedure_name
                      }
                    </td>

                    <td>
                      {consent.status}
                    </td>

                    <td>
                      {
                        new Date(
                          consent.created_at
                        ).toLocaleDateString()
                      }
                    </td>
                  </tr>
                )
              )
            )
          }

        </tbody>

      </table>

    </div>
  );
}