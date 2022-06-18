import App from '@/app';
import validateEnv from '@utils/validateEnv';

import AuthRoute from '@routes/auth.route';
import SoftSkillRoute from '@routes/softSkill.route';
import ProfileRoute from './routes/profile.route';
import JobsRoute from './routes/jobs.route';
import UtilsRoute from './routes/utils.route';

validateEnv();

const app = new App([new AuthRoute(), new SoftSkillRoute(), new ProfileRoute(), new JobsRoute(), new UtilsRoute()]);

app.listen();
