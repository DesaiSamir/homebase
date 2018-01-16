import React, { Component } from 'react';
import requests from '../utils/requestHelper';
import Table from '../common/TableComponent';
import '../style/category.css'

export default class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  onSubmit(e){
    e.preventDefault();
        console.log("Button Clicked!!")
        const category = document.getElementById("categoryName").value;
        requests.postData('/createCategory', { category })
            .then(({ status }) => {
            if (status === 200) {
                window.location= "/Category";
            }
            })
  }

  renderCategoryForm(){
    let categoryForm = (
      <form id="Category" onSubmit={this.onSubmit}>
            <h1>Category</h1>
            <div className="category-input">
                <input className="form-field" type="text" id="categoryName" placeholder="Category Name" />
                <input className="form-field" type="submit" value="Add Category"/>
            </div>
        </form>
    );
    return categoryForm;
  }

  getCategory(){
    
    requests.getData('/category')
    .then(function(res, that) {
      
      if (res.ok) {
        res.json().then(function(data, that) {
          this.setState({ data: data });
        }.bind(this));
      } else {
        console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    }.bind(this))
  }


  render() {
    this.getCategory()
    var data = {}
    if(this.state)
      data = this.state.data
    return (
      <div>
        {this.renderCategoryForm()}
        <Table data={data} tableHight={window.innerHeight - 160}/>
      </div>
    )
  }
};
