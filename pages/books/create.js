import Link from 'next/link';
import Router from 'next/router'
import React, {Component} from 'react';
import moment from 'moment';
import Dexie from 'dexie';

import Layout from '../../components/layout'
import LibBook from '../../lib/LibBook'
import LibTask from '../../lib/LibTask';
//
export default class extends Component {
  static async getInitialProps(ctx) {
    var category_items = LibBook.get_category_items()
    var tags = LibBook.get_tag_items()
//console.log(tags)    
    return { 
      user_id :"",
      csrf: {},
      category_items: category_items,
      tags: tags,
    }
  }  
  constructor(props){
    super(props)
    this.state = {
      title: '', content: '', _token : '',category_id:'',
      pub_date: '', price :0,
    }
    this.handleClick = this.handleClick.bind(this);
    this.database = null
//console.log(props)
  }
  componentDidMount(){
    var config = LibTask.get_const()
    this.db = new Dexie( config.DB_NAME );
    this.db.version(config.DB_VERSION).stores( config.DB_STORE );                     
    var dt = moment().format('YYYY-MM-DD')
    var elem = document.getElementById('pub_date');
    elem.value = dt
//    console.log(d)
    this.setState({ 
      _token: this.props.csrf.token 
    });
  }   
  handleChangeTitle(e){
    this.setState({title: e.target.value})
  }
  handleChangePrice(e){
    this.setState({price: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }   
  handleClick(){
    this.add_item()
  } 
  async add_item(){
    try {
      var myForm = document.getElementById('myForm');
      var formData = new FormData(myForm); 
      var elemDate = document.getElementById('pub_date');
      var elem = [] 
      var tags = this.props.tags     
      tags.map((item, index) => {
//console.log(item.name)
        var elemName = "check_" + item.id
        var value = formData.get( elemName )
        if(value ==  "on"){
          console.log(item.name, value)
          elem.push(item.id)
        }
      }) 
      var json= JSON.stringify( elem );
// console.log(json)
      var elem = document.getElementById('category_id');
      var item = {
        category_id: elem.value,
        tag_ids: json,
        title: this.state.title,
        content: this.state.content,
        pub_date : elemDate.value,
        price: this.state.price,
        created_at: new Date(),
      }
console.log(item)
      await this.db.books.add( item )
      Router.push('/books');
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  }
  tabCategory(){
    var category = this.props.category_items 
//console.log(category)
    return (
      <div>
        <hr className="my-2"/>
        <label>Category :</label>
        <select id="category_id" name="category_id"
          className="block w-full mt-1 py-2 rounded">
          <option value="0">Select please</option>
          {category.map((item, index) => {
//            console.log(item.name)
            return(<option key={index}
              value={item.id}>{item.name}</option>)            
          })}          
        </select>          
      </div>
    )
  } 
  checkRow(){
    var tags = this.props.tags
//console.log(tags)
    return tags.map((item, index) => {
// console.log(item )
      var name = "check_" + item.id
      return(
        <label key={index} className="inline-flex items-center">
          <input type="checkbox" name={name} id={name}
           className="rounded-full mx-1 text-cyan-600 focus:outline-none" />
          <span className="mr-2">{item.name}</span>
        </label>           
      )
    })    
  }  
  render() {
    return (
    <Layout>
      <div className="container mx-auto px-5 py-2 my-2">      
        <Link href="/books">
          <a className="btn-outline-blue mb-2">Back</a>
        </Link>
        <div className="w-full max-w-md p-4 my-4 bg-blue-100 rounded-lg shadow-lg">
          <form action="/api/content/new" method="post" id="myForm" name="myForm">
            <h1 className="text-5xl font-bold">Books - Create</h1>
            {this.tabCategory()}
            <hr className="my-2" />          
            <label>Title:</label>
            <input type="text" className="input_text_gray my-2"
            onChange={this.handleChangeTitle.bind(this)} />
            <hr className="my-2" />
            <label>Content:</label>
            <textarea type="text" onChange={this.handleChangeContent.bind(this)}
            className="input_text_gray my-2" rows="6"></textarea> 
            <hr className="my-2" />
            <label>Price:</label>
            <input type="number" className="input_text_gray my-2"
            onChange={this.handleChangePrice.bind(this)} />
            <hr className="my-2" />
            <label>Pub date:</label>
            <input className="input_date_gray my-2"
              name="pub_date" id="pub_date" type="date" required />          
            <hr className="my-2" />
            <label>Tag :</label>
            {this.checkRow()} 
          </form>
          <hr className="my-4" /> 
          <button className="btn-blue" onClick={this.handleClick}>Create
          </button>        
        </div>
      </div>
    </Layout>
    )    
  } 
}

