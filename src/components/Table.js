import styles from "./Table.module.css";

export default function Table({ tableData, deleteHandler }) {
    return (tableData.length > 0 && (
        <div className={`${styles.result}`}>
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Weekdays</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Edit Data</th>
              <th>Delete Data</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.weekdays.join(', ')}</td>
                <td>{data.gender}</td>
                <td>{data.dob}</td>
                <td><button>Edit</button></td>
                <td><button onClick={() =>deleteHandler(index)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ));
}