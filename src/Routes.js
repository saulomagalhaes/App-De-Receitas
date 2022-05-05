import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodRecipe from './pages/FoodRecipe';
import DrinkRecipe from './pages/DrinkRecipe';
import FoodProgress from './pages/FoodProgress';
import DrinkProgress from './pages/DrinkProgress';
import Explore from './pages/Explore';
import FoodExplore from './pages/FoodExplore';
import DrinkExplore from './pages/DrinkExplore';
import FoodIgredients from './pages/FoodIgredients';
import DrinkIgredients from './pages/DrinkIgredients';
import FoodNationalities from './pages/FoodNationalities';
import Profile from './pages/Profile';
import RecipesDone from './pages/RecipesDone';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route exact path="/foods" render={ (props) => <Foods { ...props } /> } />
      <Route exact path="/drinks" render={ (props) => <Drinks { ...props } /> } />
      <Route exact path="/foods/:id" render={ (props) => <FoodRecipe { ...props } /> } />
      <Route
        exact
        path="/drinks/:id"
        render={ (props) => <DrinkRecipe { ...props } /> }
      />
      <Route
        exact
        path="/foods/:id/in-progress"
        render={ (props) => <FoodProgress { ...props } /> }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        render={ (props) => <DrinkProgress { ...props } /> }
      />
      <Route exact path="/explore" render={ (props) => <Explore { ...props } /> } />
      <Route
        exact
        path="/explore/foods"
        render={ (props) => <FoodExplore { ...props } /> }
      />
      <Route
        exact
        path="/explore/drinks"
        render={ (props) => <DrinkExplore { ...props } /> }
      />
      <Route
        exact
        path="/explore/foods/ingredients"
        render={ (props) => <FoodIgredients { ...props } /> }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        render={ (props) => <DrinkIgredients { ...props } /> }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        render={ (props) => <FoodNationalities { ...props } /> }
      />
      <Route path="/explore/drinks/nationalities" component={ NotFound } />
      {/* <Route
        exact
        path="/explore/drinks/nationalities"
        render={ (props) => <NotFound { ...props } /> }
      /> */}
      <Route exact path="/profile" render={ (props) => <Profile { ...props } /> } />
      <Route
        exact
        path="/done-recipes"
        render={ (props) => <RecipesDone { ...props } /> }
      />
      <Route
        exact
        path="/favorite-recipes"
        render={ (props) => <FavoriteRecipes { ...props } /> }
      />
    </Switch>
  );
}

export default Routes;
