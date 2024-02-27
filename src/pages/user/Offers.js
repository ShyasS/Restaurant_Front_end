import React from 'react';

import PromotionCard from '../../components/Offers';

const Offers = () => {
  const promotionData1 = {
    title: 'Special Discount',
    description: 'Get 20% off on selected items'
  };
  const promotionData2 = {
    title: 'Free delivery',
    description: 'Free delivery on first order'
  };
  const promotionData3 = {
    title: 'Special Discount',
    description: 'Get 50% off on selected items'
  };
  return (
    <div className="row">
      <div className="col justify-content-center d-flex">
        <PromotionCard {...promotionData1} />
        <PromotionCard {...promotionData2} />
        <PromotionCard {...promotionData3} />
      </div>
    </div>
  );
};

export default Offers;
