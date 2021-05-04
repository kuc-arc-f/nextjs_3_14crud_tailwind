import Head from 'next/head'
import React from 'react'
import Link from 'next/link';
import Dexie from 'dexie';

import LibTask from '../../lib/LibTask';
import Layout from '../../components/layout'
//
export default class extends React.Component {
  constructor(props){
    super(props)
    this.state = { title: "", content: "", }
    this.id  = parseInt(this.props.id)
console.log(this.id )
  }
  componentDidMount(){
    var config = LibTask.get_const()
    this.db = new Dexie( config.DB_NAME );
    this.db.version(config.DB_VERSION).stores( config.DB_STORE )
    this.get_items(this.id)                 
  } 
  static async getInitialProps(ctx) {
    console.log(ctx.query.id)
    var id = ctx.query.id
      return {
          id: id,
      };
  }     
  async get_items(id){
    try{
      const item = await this.db.tasks.get(id);
      this.setState({ 
          title: item.title, 
          content: item.content,
          created_at: item.created_at
      });        
    } catch (err) {
        console.log(err);
    }
  }  
  render() {
//console.log(typeof this.state.created_at);       
    return (
    <div className="bg-gray-100">
      <Layout>
        <div className="container mx-auto px-5 pb-5">
          <Link href="/tasks" >
            <a>
            <button className="btn-outline-blue my-2">Back</button>
            </a>
          </Link>
          <hr className="my-2" />          
          <div className="show_title_wrap bg-white p-2 shadow-lg rounded-lg">
            <h1 className="text-gray-900 font-bold text-5xl mt-2 mx-2">
              {this.state.title}
            </h1>
            <p className="my-0 mx-2 p-2">ID : {this.id}
            </p>
          </div>  
          <div className="show_title_wrap bg-white shadow-lg rounded-lg">
            <p className="my-4 mx-2 p-2">Content: {this.state.content}
            </p>
          </div>              
        </div>
      </Layout>
    </div>
    )
  }
}
