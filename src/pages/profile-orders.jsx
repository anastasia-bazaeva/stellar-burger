import React from 'react';
import { OrderCard } from '../components/order-card/order-card';
import { ProfileFeed } from '../components/order-feed/order-feed';
import { ProfileNav } from '../components/profile-nav/profile-nav';
import profileStyles from './profile.module.css';

export function ProfileOrders () {
    return (
        <div className={profileStyles.profileBox}>
            <ProfileNav activeClass='orders'/>
            <ProfileFeed />
        </div>
    )
}