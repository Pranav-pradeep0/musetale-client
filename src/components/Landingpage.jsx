import React, { useState, useEffect } from 'react';
import '../css/landingpage.css';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

const Landingpage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className='loading-container'>
                    <div class="lds-hourglass"></div>
                </div>
            ) : (
                <div className='landing-main-div'>
                    <div className='spline-div'>
                        <div className='res-brand d-none'>
                            <h1 className='landing-brand'>MUSETALES</h1>
                        </div>
                        <Spline className='spline' rel='preload' scene="https://prod.spline.design/vBtQGrRSgaPhrZQC/scene.splinecode" />
                        <div className='res-gs d-none'>
                            <Link to={"./home"} className='get-started-btn'>Get Started</Link>
                        </div>
                    </div>
                    <div className='landing-get-started'>
                        <h1 className='landing-brand'>MUSETALES</h1>
                        <Link to={"./home"} className='get-started-btn'>Get Started</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Landingpage;
