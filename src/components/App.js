import React, { Component } from 'react'
import Header from './Header'
import { Switch, Route, Redirect } from 'react-router-dom'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Login from './Login'
import Search from './Search'
import Hi from './Hi'
import FilterList from './FilterList'
import UserList from './UserList'
import FaqList from './FaqList'
import CreateFaq from './CreateFaq'


class App extends Component {
  render() {
    return (
      <div className='center w85'>
        <Header />
        <div className='ph3 pv1 background-gray'>
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/new/1' />} />
            <Route exact path='/create' component={CreateLink} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/top' component={LinkList} />
            <Route exact path='/new/:page' component={LinkList} />
            <Route exact path='/hi' component={Hi} />
            <Route exact path='/filterlist' component={FilterList} />
            <Route exact path='/userlist' component={UserList} />
            <Route exact path='/faqs' component={FaqList} />
            <Route exact path='/newfaq' component={CreateFaq} />
          </Switch>
        </div>
      </div>
    )
  }  
  
}

export default App