import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDataProvider } from "../../context/Data";
import LoadingScreen from "../../components/loading_screen/LoadingScreen";
import styles from "./admin_page.module.css";
const AdminPage = () => {
  const { changeLanguage, serverUrl } = useDataProvider();
  const [spinner, setSpinner] = useState(false);
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    setSpinner(true);
    const response = await axios.get(`${serverUrl}/admin`);
    setUsers(response.data);
    setSpinner(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      {spinner && <LoadingScreen text={"loading"} />}
      <table className={styles.table_container}>
        <tbody className={styles.tbody_container}>
          <tr className={styles.tr_container}>
            <td className={styles.user_info}> {changeLanguage("username")}</td>
            <td className={styles.user_info}>{changeLanguage("balance")}</td>
            <td className={styles.user_info}>{changeLanguage("income")}</td>
            <td className={styles.user_info}>{changeLanguage("maxLoan")}</td>
            <td style={{border : 'none'}} className={styles.user_info}>{changeLanguage("status")}</td>
          </tr>

          {users.map((user, index) => {
            const { username, balance, maxLoan, income } = user;
            return (
              <tr key={index} className={styles.tr_container}>
                <td className={styles.user_info} key={index}>
                  {username}
                </td>
                <td className={styles.user_info}>{balance}₪</td>
                <td className={styles.user_info}>{income}₪</td>
                <td className={styles.user_info}>{maxLoan}₪</td>
                <tr className={styles.status_container}>
                  <p className={balance > 0 ? styles.noun : styles.overdraft}></p>
                </tr>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AdminPage;
