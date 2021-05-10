import Link from 'next/link';
import Head from 'next/head';
import React from 'react'
//
export default function Page(props){
  var messages_success = ""
  if( typeof props.messages_success != 'undefined'){
    messages_success = props.messages_success
  }
  var messages_error = ""
  if( typeof props.messages_error != 'undefined'){
    messages_error = props.messages_error
  }
  return (
  <div>
    { messages_success ? 
    <div className="bg-blue-100 border border-blue-500 text-blue-700 px-4 py-3 rounded"
     role="alert">{messages_success}</div> 
    : <div /> 
    }
    { messages_error ? 
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
     role="alert">
    {messages_error}</div> 
    : <div /> }      
  </div>
  );

}
