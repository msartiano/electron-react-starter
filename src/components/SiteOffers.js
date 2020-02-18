import React from 'react';

export default ({ offers, hotSite }) => {
    let offersToRender = [];
    if (offers) offersToRender = offers.length > 2 ? offers.slice(0, 2) : offers;

    return (
        <>
            {offersToRender.map((offer, index) => (
                <div className="offer">
                    <span className={hotSite && index === 0 ? 'hot price' : 'price'}>{offer.price}</span>
                    {offer.prime && <span className="prime">&nbsp;P</span>}
                    {offer.condition !== 'New' && <span className="condition">&nbsp;U</span>}
                    {offer.seller === 'Amazon' && <span className="seller">&nbsp;A</span>}
                </div>
            ))}
        </>
    );
};
