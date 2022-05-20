import App from '@/app';
import validateEnv from '@utils/validateEnv';

import AuthRoute from '@routes/auth.route';
import SoftSkillRoute from '@routes/softSkill.route';

validateEnv();

const app = new App([new AuthRoute(), new SoftSkillRoute()]);

app.listen();
