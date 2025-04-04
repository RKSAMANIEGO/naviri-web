import React, { useState } from "react";
import AdminConfi from "../../components/AdminPanel/Admin";
import UserSettings from "../../components/AdminPanel/AdminConfi";

export default function AdminPanel() {
  const [onChangeStyle, setOnChangeStyle] = useState(false);

  const recibirEstilo = (data) => {
    setOnChangeStyle(data);
  };

  return (
    <div>
      <AdminConfi setRecibirEstilo={recibirEstilo} />
      <UserSettings />
    </div>
  );
}
