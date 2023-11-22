import React, { useState, useEffect } from "react";
import "../css/landingpage.css";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";

const Landingpage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    // <div>

    //     <Spline className='background' scene="https://prod.spline.design/vvNb8ZSHuLB7wQEu/scene.splinecode" />

    //     {isLoading ? (
    //         <div className='loading-container'>
    //             <div class="lds-hourglass"></div>
    //         </div>
    //     ) : (
    //         <div className='landing-main-div'>
    //             <div className='spline-div'>
    //                 <div className='res-brand d-none'>
    //                     <h1 className='landing-brand'>MUSETALES</h1>
    //                 </div>
    //                 <Spline className='spline' scene="https://prod.spline.design/vBtQGrRSgaPhrZQC/scene.splinecode" />
    //                 <div className='res-gs d-none'>
    //                     <Link to={"./home"} className='get-started-btn'>Get Started</Link>
    //                 </div>
    //             </div>
    //             <div className='landing-get-started'>
    //                 <h1 className='landing-brand'>MUSETALES</h1>
    //                 <Link to={"./home"} className='get-started-btn'>Get Started</Link>
    //             </div>
    //         </div>
    //     )}
    // </div>

    <div>
      {isLoading || (
        <Spline
          className="background"
          scene="https://prod.spline.design/vvNb8ZSHuLB7wQEu/scene.splinecode"
        />
      )}

      {isLoading ? (
          <div className="loader-cont">
            <Spline
              className="spline-loader"
              scene="https://prod.spline.design/vBtQGrRSgaPhrZQC/scene.splinecode"
            />
          </div>
      ) : (
        <div className="landing-main-div">
          <div className="spline-div">
            <div className="res-brand d-none">
              <h1 className="landing-brand">MUSETALES</h1>
            </div>
            <div className="res-gs d-none">
              <Link to={"./home"} className="get-started-btn">
                Get Started
              </Link>
            </div>
          </div>
          <div className="landing-get-started">
            <h1 className="landing-brand">MUSETALES</h1>
            <Link to={"./home"} className="get-started-btn">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landingpage;
