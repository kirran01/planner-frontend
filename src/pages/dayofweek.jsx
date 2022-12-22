import React from 'react';
import { useParams } from 'react-router-dom'

const Dayofweek = () => {

    const { dayofweek } = useParams()

    return (
        <div>
            {dayofweek}
        </div>
    );
}

export default Dayofweek;
