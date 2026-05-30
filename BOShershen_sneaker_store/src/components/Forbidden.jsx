import React from "react";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>403 - Шершень не зміг залетіти на цю сторінку</h1>
      <p>У вас немає прав доступу до цієї сторінки.</p>
      <button onClick={() => navigate(-1)}>Повернутись назад</button>
    </div>
  );
};

export default Forbidden;
