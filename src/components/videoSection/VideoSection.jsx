import React from 'react';
import styles from './VideoSection.module.scss';

const VideoSection = () => {
    return (
        <div className={styles.section}>
            <video autoPlay muted loop playsInline className={styles.video}>
            <source src={require('../../video/code_video.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
            <div className={styles.overlay}>
                <h1>Alpha Academy</h1>
            </div>
        </div>
    );
};

export default VideoSection;
