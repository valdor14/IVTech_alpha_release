import axios from "axios";
import React from "react";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import "./User.scss";

function VerifiedUser({ user, getUsers}) {

  const { t } = useTranslation();
  async function deleteUser() {
    if (window.confirm("Do you want to delete this user?")) {
      await axios.delete(`${domain}/auth/admin/${user._id}`);
      getUsers();
    }
  }

  async function updateUser() {
    var e = document.getElementById("selectNewRole");
    var strUser = e.value;
    await axios.post(`${domain}/auth/admin/${user._id}`, {role: `${strUser}`});
    getUsers();
  }

  return (
    <div className='user'>
      <h2 className='usertext'>Email: {user.email}</h2>
      <h2 className='usertext'>{t("Username")}: {user.username}</h2>
      <h2 className='usertext'>{t("Role")}: {t(user.role)}</h2>
      <h2>{t("NewRole")}:</h2>
      <select id="selectNewRole" className="roleSelector">
          <option value="User">{t("User")}</option>
          <option value="Support">{t("Support")}</option>
      </select>
      <div></div>
      <button className='btn-save' onClick={updateUser}>
      {t("Save")}
      </button>
      <button className='btn-delete' onClick={deleteUser}>
      {t("Delete")}
      </button>
    </div>
  );
}

export default VerifiedUser;
