import expiredJobOffers from './expiredJobOffers';
import notifyUsers from './notifyUsers';
import updateJobOffersScores from './updateJobOffersScores';

const startJobs = () => {
  expiredJobOffers.start();
  updateJobOffersScores.start();
  notifyUsers.start();
};

export default startJobs;
