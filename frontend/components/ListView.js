	import React from 'react';

import List from './List';
import '../css/List.css';

class ListView extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          tasks: [],
          orderByOption : 'id',
          categoryOption: "all"
      } 
      this.handleChangeOrderBy = this.handleChangeOrderBy.bind(this);
      this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }

  handleChangeOrderBy(event){
    this.setState({orderByOption: event.target.value});
  }

  handleChangeCategory(event){
    this.setState({categoryOption: event.target.value});
  }

  render(){
    return (
      <div className="page-two">
        <h2>List View</h2>
        <div className="filter-wrapper">
            <div className="form-group">
                <label>Order By</label>
                <select value={this.state.orderByOption} onChange={this.handleChangeOrderBy}>
                    <option value="none">Please choose</option>
                    <option value="title">Title</option>
                    <option value="id">ID</option>
                </select>
            </div>
            <div className="form-group">
                <label>Category</label>	
                <select value={this.state.categoryOption} onChange={this.handleChangeCategory}>
                    <option value="all">All</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="done">Done</option>
                </select>
            </div>
        </div>
        <List orderBy={this.state.orderByOption} category={this.state.categoryOption}/>
      </div>
    )
  }
}

export default ListView;
