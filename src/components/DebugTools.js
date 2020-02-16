import React from 'react';
import { useStore } from '../Store';
    //             <button onClick={() => updateSites([])}>reset sites DOESNT WORK NOW</button>

export default () => {
    const [store, dispatch] = useStore();

    return (
        <div>
            DEBUG TOOLS
        </div>
    );
};