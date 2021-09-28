import React, { Suspense, lazy } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { isAuth, isNotAuth } from '../hoc/isAuth';
import { Layout } from '../components/styleguide';
import Sider from '../components/shared/Layout/Sider';
import Header from '../components/shared/Layout/Header/Header';
import MainLoader from '../components/shared/MainLoader';
import { AppContext } from '../contexts/global.context';
import { getToken } from '../configs/local-storage';

const { Content } = Layout;

const PublicApp = lazy(() => import('../containers/Public'));
const Profile = lazy(() => import('../containers/Profile.container'));
const Programs = lazy(() => import('../containers/Programs.container'));
const Week = lazy(() => import('../containers/Week.container'));
const CreateActivity = lazy(() =>
  import('../containers/CreateActivity.container'),
);
const Activity = lazy(() => import('../containers/Activity.container'));
const CreateArticle = lazy(() =>
  import('../containers/CreateArticle.container'),
);
const EditArticle = lazy(() => import('../containers/EditArticle.container'));
const CreateAudio = lazy(() => import('../containers/CreateAudio.container'));
const EditAudio = lazy(() => import('../containers/EditAudio.container'));
const CreateVideo = lazy(() => import('../containers/CreateVideo.container'));
const EditVideo = lazy(() => import('../containers/EditVideo.container'));
const CreateLesson = lazy(() => import('../containers/CreateLesson.container'));
const EditLesson = lazy(() => import('../containers/EditLesson.container'));

const Versions = lazy(() => import('../containers/Versions.container'));
const Media = lazy(() => import('../containers/Media.container'));
const Category = lazy(() => import('../containers/Category.container'));
const CreateMediaAudio = lazy(() =>
  import('../containers/CreateMediaAudio.container'),
);
const EditMediaAudio = lazy(() =>
  import('../containers/EditMediaAudio.container'),
);
const CreateMediaVideo = lazy(() =>
  import('../containers/CreateMediaVideo.container'),
);
const EditMediaVideo = lazy(() =>
  import('../containers/EditMediaVideo.container'),
);

const NotFound = lazy(() => import('../containers/NotFound.container'));

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Layout className={'main-layout'}>
          <AppContext.Consumer>
            {({ currentUser }) =>
              !!getToken() && !!currentUser?.id && <Header />
            }
          </AppContext.Consumer>
          <Layout>
            <AppContext.Consumer>
              {({ siderVisible }) => siderVisible && <Sider />}
            </AppContext.Consumer>
            <Suspense fallback={<MainLoader />}>
              <Content>
                <Switch>
                  <Route path="/" exact component={isNotAuth(PublicApp)} />
                  <Route path="/profile" component={isAuth(Profile)} />

                  {/* Programs */}

                  <Route path="/programs" exact component={isAuth(Programs)} />
                  <Route
                    path="/programs/program/:programId/group/create"
                    component={isAuth(CreateActivity)}
                  />
                  <Route
                    path="/programs/program/:programId/group/:activityId/article/create"
                    component={isAuth(CreateArticle)}
                  />
                  <Route
                    path="/programs/program/:programId/group/:activityId/article/:articleId"
                    component={isAuth(EditArticle)}
                  />
                  <Route
                    path="/programs/program/:programId/group/:activityId/audio/create"
                    component={isAuth(CreateAudio)}
                  />
                  <Route
                    path="/programs/program/:programId/group/:activityId/audio/:audioId"
                    component={isAuth(EditAudio)}
                  />
                  <Route
                    path="/programs/program/:programId/group/:activityId/video/create"
                    component={isAuth(CreateVideo)}
                  />
                  <Route
                    path="/programs/program/:programId/group/:activityId/video/:videoId"
                    component={isAuth(EditVideo)}
                  />
                  <Route
                    path="/programs/program/:programId/group/:activityId"
                    component={isAuth(Activity)}
                  />
                  <Route
                    path="/programs/program/:programId/audio/create"
                    component={isAuth(CreateLesson)}
                  />
                  <Route
                    path="/programs/program/:programId/audio/:audioId"
                    component={isAuth(EditLesson)}
                  />
                  <Route
                    path="/programs/program/:programId"
                    component={isAuth(Week)}
                  />

                  {/* Versions */}

                  <Route path="/versions" component={isAuth(Versions)} />

                  {/* Media */}

                  <Route
                    path="/media/category/:categoryId/audio/create"
                    component={isAuth(CreateMediaAudio)}
                  />
                  <Route
                    path="/media/category/:categoryId/audio/:audioId"
                    component={isAuth(EditMediaAudio)}
                  />

                  <Route
                    path="/media/category/:categoryId/video/create"
                    component={isAuth(CreateMediaVideo)}
                  />
                  <Route
                    path="/media/category/:categoryId/video/:videoId"
                    component={isAuth(EditMediaVideo)}
                  />
                  <Route
                    path="/media/category/:categoryId"
                    component={isAuth(Category)}
                  />
                  <Route path="/media" component={isAuth(Media)} />

                  <Route component={NotFound} />
                </Switch>
              </Content>
            </Suspense>
          </Layout>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </Layout>
    </Router>
  );
};

export default AppRouter;
