import React from 'react';
import HomeFirstComp from './HomeFirstComp';
import HomeSecondComp from './HomeSecondComp';
import HomeThirdComponent from './HomeThirdComponent';
import HomeFourthComp from './HomeFourthComp';
import './index.css';

const Home = () => {
  return (
    <div>
      <div>
        <HomeFirstComp />
      </div>
      <div>
        <HomeSecondComp />
      </div>
      <div>
        <HomeThirdComponent />
      </div>
      <div>
        <HomeFourthComp />
      </div>
    </div>
  );
};

export default Home;
