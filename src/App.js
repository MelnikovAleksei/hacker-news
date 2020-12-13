import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageNotFound } from './components/PageNotFound';
import { NewsList } from './features/news/NewsList';
import { SingleNewsPage } from './features/news/SingleNewsPage';
import { UpdateNewsButton } from './features/news/UpdateNewsButton';

import { UPDATE_TIME } from './utils/constansts/constants';

import { useDispatch, useSelector } from 'react-redux';

import {
  fetchNewsIds,
  selectNewsIds,
  selectNewsIdsError,
  selectNewsIdsStatus
} from './features/news/newsSlice';

function App() {

  const dispatch = useDispatch();

  const newsIds = useSelector(selectNewsIds);
  const newsIdsStatus = useSelector(selectNewsIdsStatus);
  const newsIdsError = useSelector(selectNewsIdsError);

  React.useEffect(() => {
    const updateIds = setTimeout(() => {
      dispatch(fetchNewsIds());
    }, UPDATE_TIME)

    if (newsIdsStatus === 'idle') {
      dispatch(fetchNewsIds());
    }

    return () => {
      clearTimeout(updateIds);
    }
  }, [dispatch, newsIdsStatus])

  function handleClickUpdateButton() {
    dispatch(fetchNewsIds());
  }

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <main>
              <section>
                <UpdateNewsButton
                  text="Update the list"
                  isLoading={newsIdsStatus}
                  onClick={handleClickUpdateButton}
                />
                {newsIdsError && <p>newsIdsError</p>}
                <NewsList data={newsIds}/>
              </section>
            </main>
          )}
        />
        <Route exact path="/news/:newsId" component={SingleNewsPage}/>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
