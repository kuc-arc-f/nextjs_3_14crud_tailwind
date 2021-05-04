import Head from 'next/head'
import React from 'react'
import Link from 'next/link';
import Dexie from 'dexie';

import Layout from '../../components/layout'
import LibBook from '../../lib/LibBook'
import LibTask from '../../lib/LibTask';
import LibCommon from '../../lib/LibCommon'
//
export default class extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx.query.id)
    var category_items = LibBook.get_category_items()
    var tags = LibBook.get_tag_items() 
    var id = ctx.query.id
      return {
          id: id, category_items: category_items,
          tags: tags
      };
  }  
  constructor(props){
    super(props)
    this.state = { item: {} , tags: [] }
    this.id  = parseInt(this.props.id)
  //console.log(props )
  }
  componentDidMount(){
    var config = LibTask.get_const()
    this.db = new Dexie( config.DB_NAME );
    this.db.version(config.DB_VERSION).stores( config.DB_STORE )
    this.get_items(this.id)
  }
  async get_items(id){
    try{
      var item = await this.db.books.get(id);
      item.category = LibBook.get_category_item(
        parseInt(item.category_id ), this.props.category_items
      )  
      var tag_arr = JSON.parse(item.tag_ids || '[]')
      var tags = LibBook.get_tags(tag_arr , this.props.tags)
console.log(item)
      this.setState({ item: item , tags: tags }); 
    } catch (err) {
        console.log(err);
    }
  }      
  render(){
    var tags = this.state.tags
    var item = this.state.item
    var categoryName = ""
    if(typeof (item.category) != 'undefined'){
      categoryName = item.category.name
    }
    return (
    <div className="bg-gray-100">
    <Layout>
      <div className="container mx-auto px-5 py-5">
        <Link href="/books">
          <a className="btn-outline-blue my-2">Back</a></Link>
        <hr className="my-2"/>
        <div className="show_title_wrap pb-2 px-4 bg-white shadow-lg rounded-lg">
          <h1 className="text-gray-900 font-bold text-5xl my-4 mx-2 p-2">
            {item.title}
          </h1>
          <hr className="my-2" />
          ID : {this.id} <br />
          Category : {categoryName}
          <hr className="my-2"/>          
          Tag : 
          <pre className="pre_text">
          {tags.map((item, index) => {
    //console.log(item)
            return (<span key={index}> #{item.name}</span>)
          })}      
          </pre>
          <hr className="my-2"/>
          <div>Content:  {item.content}
          </div>
          <hr className="my-2"/>
          Pub date : {item.pub_date}      
        </div>
        <hr />
      </div>
    </Layout>
    </div>
    )
  }
}

