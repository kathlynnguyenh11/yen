import React from 'react';

import '../css/PageTabs.css';

class PageTabs extends React.Component {

  isActiveTab(tabName) {
    return (tabName === this.props.currentView) ? 'nav-link active' : 'nav-link';
  }

  onTabClick(event, tabName) {
    event.preventDefault();
    this.props.onViewChange(tabName);
  }

  render () {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
         <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className={this.isActiveTab('GridView')}
              onClick={(e) => this.onTabClick(e, 'GridView')}>
              Grid View
            </a>
          </li>
          <li className='nav-item'>
            <a className={this.isActiveTab('ListView')}
              onClick={(e) => this.onTabClick(e, 'ListView')}>
              List View
            </a>
          </li>
          <li className='nav-item'>
            <a className={this.isActiveTab('TaskView')}
              onClick={(e) => this.onTabClick(e, 'TaskView')}>
              Add Task
            </a>
          </li>
        </ul>
        </div>
      </nav>
    )
  }
};

export default PageTabs;