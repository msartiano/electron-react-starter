import React, { useContext } from 'react';
import { AppContext, Store } from '../app';

export default () => {
    const store = Store();
    const [ctx, setCtx] = useContext(AppContext);
    console.log('c', ctx);

    console.log(store);
    return (
        <div>
            Categories 
        </div>
    );
};