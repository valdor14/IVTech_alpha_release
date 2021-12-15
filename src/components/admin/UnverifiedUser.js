import axios from "axios";
import React from "react";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import "./User.scss";

function UnverifiedUser({ user, getUsers}) {

  const { t } = useTranslation();
  async function deleteUser() {
    if (window.confirm("Do you want to delete this user?")) {
      await axios.delete(`${domain}/auth/admin/delete/${user._id}`);
      getUsers();
    }
  }

  async function verifyUser() {
    await axios.post(`${domain}/auth/admin/verify/${user._id}`);
    getUsers();
  }

  return (
    <div className='user'>
      <h2 className='usertext'>Email: {user.email}</h2>
      <h2 className='usertext'>{t("Username")}: {user.username}</h2>
      <button className='btn-save' onClick={verifyUser}>
        {t("Activate")}
      </button>
      <button className='btn-delete' onClick={deleteUser}>
        {t("Delete")}
      </button>
    </div>
  );
}

export default UnverifiedUser;
