import React, { useState } from 'react';

const AdminConfi = ({ setRecibirEstilo }) => {
    const [onChangeStyle, setOnChangeStyle] = useState(false);

    const cambiarEstilo = () => {
        setRecibirEstilo(!onChangeStyle);
        setOnChangeStyle(!onChangeStyle);
    }
}

export default AdminConfi;
