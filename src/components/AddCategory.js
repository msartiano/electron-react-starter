import React, { useRef } from 'react';
import { useStore } from '../Store';

export default () => {
    const [store, dispatch] = useStore();
    const categoryText = useRef('');

    return (
        <div className="add-category">
            <input ref={categoryText} type="text" placeholder="Category Name, f.e. MACBOOK" />
            <button type="button" onClick={() => dispatch('ADD_CATEGORY', { category: categoryText.current.value })}>ADD CATEGORY</button>
        </div>
    );
};
