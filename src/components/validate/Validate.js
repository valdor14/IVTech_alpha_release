import axios from "axios";
import domain from "../../util/domain";
import { useTranslation } from "react-i18next";
import "./Validate.css";

function Validate() {
  const { t } = useTranslation();
  return (
    <div className='wrapper'>
      <a href='http://localhost:3000/login'>
        <button
          className='validate-button'
          onClick={async (e) => {
            let link = window.location.href.split("/");
            const uid = link.pop();
            await axios.post(`${domain}/auth/validate/${uid}`);
          }}>
          {t("Validate")}
        </button>
      </a>
    </div>
  );
}

export default Validate;
