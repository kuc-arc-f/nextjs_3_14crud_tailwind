import Link from 'next/link';
import React from 'react';
import flash from 'next-flash';
import Dexie from 'dexie';

import Layout from '../../components/layout'
import FlashBox from '../../components/FlashBox'
import LibTask from '../../lib/LibTask';
import LibDexie from '../../lib/LibDexie';
import IndexRow from './IndexRow';
//
export default class TaskIndex extends React.Component {
  static async getInitialProps(ctx) {
//console.log(items)
    return { 
      flash: flash.get(ctx) || {},
    }
  }  
  constructor(props){
    super(props)
    this.state = {data: '', items_org: ''}
    this.handleClickExport = this.handleClickExport.bind(this);
  }  
  async componentDidMount(){
    try{
// console.log(this.props.flash)
      var config = LibTask.get_const()
      this.db = new Dexie( config.DB_NAME );
      this.db.version(config.DB_VERSION).stores( config.DB_STORE );  
      var items = await this.db.tasks.toArray()
      this.items_org = items
      items = LibDexie.get_reverse_items(items)
      this.setState({ data: items })
// console.log( items )
    } catch (err) {
      alert(err)
      console.log(err);
    }     
  }
  tabRow(){
    if(this.state.data instanceof Array){
// console.log(this.state.data )
      return this.state.data.map((item, index) => {
        return (<IndexRow key={index}
                id={item.id} title={item.title} />       
        )
      })      
    }
  }
  handleClickExport(){
    console.log("handleClickExport:")
    var content = JSON.stringify(this.items_org);
//console.log(this.items_org)
    var blob = new Blob([ content ], { "type" : "application/json" });
    var fname = "tasks.json"
    if (window.navigator.msSaveBlob){
      console.log("#-msSaveBlob")
    }else{
      console.log("#-msSaveBlob-false")
      document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
  }
  render() {
    return (
    <div className="bg-white">
      <Layout>
        <FlashBox messages_success={this.props.flash.messages_success} 
          messages_error={this.props.flash.messages_error} />
        <div className="container mx-auto px-5 py-2 bg-gray-100">
          <h1 className="text-5xl font-bold my-2">Tasks</h1>
          <hr className="my-4" />
          <Link href="/tasks/create">
            <a className="btn-blue">Create</a>
          </Link> 
          {this.tabRow()}
        </div>
      </Layout>
      <style>{`
      .h3_title{
        font-size: 1.875rem;
        line-height: 2.25rem;      
      }
      `}</style>    
    </div>
    )
  }
}
