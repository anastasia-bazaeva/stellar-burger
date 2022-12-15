import React from 'react';
import { OrderCard } from '../order-card/order-card';

import Cheese from '../../images/Сыр.svg';
import Kolca from '../../images/Kольца.svg';
import Sauce from '../../images/spicyx.svg';

import FeedStyles from '../../pages/feed.module.css';

export function ProfileFeed () {

    const images = [
        Cheese,
        Kolca,
        Sauce,
        Kolca,
        Sauce,
        Kolca,
        Sauce,
        Kolca,
        Sauce
    ]

    return (
        <div className={FeedStyles.feed}>
                <div className={FeedStyles.scrollzone}>
                    {images.map((image) => {
                        return (<OrderCard images={images} status='done'/>)
                    })}
                </div>
            </div>
    )
}