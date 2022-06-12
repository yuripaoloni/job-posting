import expiredJobOffers from './expiredJobOffers';
import updateJobOffersScores from './updateJobOffersScores';

const startJobs = () => {
  expiredJobOffers.start();
  updateJobOffersScores.start();
};

export default startJobs;
