import Head from 'next/head'
import Link from 'next/link';
import flash from 'next-flash';
import Router from 'next/router'
import React from 'react'
import Dexie from 'dexie';

import LibTask from '../../../lib/LibTask';
import Layout from '../../../components/layout'
//
export default class extends React.Component {
  static async getInitialProps(ctx) {
console.log(ctx.query.id)
    var id = ctx.query.id
      return {
          id: id,
      };
  }  
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.state = { title: "", content: "", }
    this.id  = parseInt(this.props.id)
//console.log(this.id )    
  }
  componentDidMount(){
    var config = LibTask.get_const()
    this.db = new Dexie( config.DB_NAME );
    this.db.version(config.DB_VERSION).stores( config.DB_STORE )
    this.get_items(this.id)                 
  }   
  async get_items(id){
    try{
      const item = await this.db.tasks.get(id);
      this.setState({ 
          title: item.title, 
          content: item.content
      });        
      console.log(item);       
    } catch (err) {
        console.log(err);
    }
  }   
  handleChangeTitle(e){
    console.log("handleChangeTitle:")
    this.setState({title: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }  
  async handleClickDelete(){
    console.log("#deete-id:" , this.id)
    try {
      await this.db.tasks.delete(parseInt(this.id) );
      flash.set({ messages_success: 'Success , delete' })
      Router.push('/tasks');
//console.log(item)
    } catch (error) {
      console.error(error);
    }     
  } 
  async handleClick(){
  console.log("#-handleClick")
//console.log(this.state)
    await this.update_item()
  }     
  async update_item(){
    try {
      await this.db.tasks.update(parseInt( this.id ) , {
        title: this.state.title,
        content: this.state.content,
      });
      flash.set({ messages_success: 'Success , save' })
      Router.push('/tasks');      
//console.log(item)
    } catch (error) {
      console.error(error);
    }     
  }  
  render() {
    return (
    <div className="bg-gray-100">
    <Layout>
      <div className="container mx-auto px-5 py-2 my-2">
        <Link href="/tasks">
          <a className="btn-outline-blue my-2">Back</a>
        </Link>          
        <div className="w-full max-w-md bg-white p-4 my-4 rounded-lg shadow-lg">
          <h1 className="text-5xl font-bold my-4">Tasks - Edit
          </h1>
          <hr className="my-2" />
          <label>Title:</label>
          <input className="input_text_gray my-2" type="text" id="title"
          value={this.state.title} onChange={this.handleChangeTitle.bind(this)} />
          <hr className="my-2" />
          <label>Content:</label>
          <textarea className="input_textarea_gray my-2"
            rows="8"
            value={this.state.content}
            onChange={this.handleChangeContent.bind(this)}></textarea>           
          <button className="btn-blue" onClick={this.handleClick}>Save
          </button>
          <hr className="my-2" />                  
          <button className="btn-red" onClick={this.handleClickDelete}>Delete
          </button>
          <hr className="my-2" />
          ID : {this.props.id}
        </div>
      </div>
    </Layout>
    </div>
    );
  };
}

