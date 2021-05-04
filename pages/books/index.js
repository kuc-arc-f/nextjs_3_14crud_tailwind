import Link from 'next/link';
import React from 'react';
import Router from 'next/router'
import Dexie from 'dexie';

import Layout from '../../components/layout'
import LibTask from '../../lib/LibTask';
import LibDexie from '../../lib/LibDexie';
import LibCms from '../../lib/LibCms'
import LibCommon from '../../lib/LibCommon'
import IndexRow from './IndexRow';
//
export default class Page extends React.Component {
  static async getInitialProps(ctx) {
// console.log(json)
    return { 
      items: [] ,user_id :""
    }
  }
  constructor(props){
    super(props)
    this.state = {data: '', items_org: ''}
//console.log(this.props)
  }
  async componentDidMount(){
    var config = LibTask.get_const()
    this.db = new Dexie( config.DB_NAME );
    this.db.version(config.DB_VERSION).stores( config.DB_STORE );  
    var items = await this.db.books.toArray()
    items = LibDexie.get_reverse_items(items)
    this.setState({ data: items })    
  }     
  tabRow(){
    if(this.state.data instanceof Array){
// console.log(this.state.data )
      return this.state.data.map((item, index) => {
        return (<IndexRow key={index}
          category_name=""
          id={item.id} title={item.title} date="" />       
        )
      })      
    }
  }  
  render() {
    const items = this.state.data
//console.log(items)
    return (
    <div className="bg-white">
    <Layout>
      <div className="container mx-auto px-5 py-2 bg-gray-100">
        <h1 className="text-5xl font-bold my-2">Books</h1>
        <hr className="mt-2 mb-4" />
        <Link href="/books/create">
          <a className="btn-blue">Create</a>
        </Link>  
        {this.tabRow()}
      </div>
    </Layout>
    </div>
    )
  }
}
