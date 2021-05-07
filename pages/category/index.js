import Link from 'next/link';
import React from 'react';

import Layout from '../../components/layout'
import LibBook from '../../lib/LibBook';
import IndexRow from './IndexRow';
//
export default class TaskIndex extends React.Component {
  constructor(props){
    super(props)
    this.state = {data: '', items_org: ''}
  }  
  async componentDidMount(){
    try{
      var category_items = LibBook.get_category_items()
      this.setState({ data: category_items })
//console.log( category_items )
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
                id={item.id} title={item.name} />       
        )
      })      
    }
  }
  render() {
    return (
    <div className="bg-white">
      <Layout>
        <div className="container mx-auto px-5 py-2 bg-gray-100">
          <h1 className="text-5xl font-bold my-2">Category</h1>
          <hr className="my-4" />
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
