import Link from 'next/link';
import Head from 'next/head';
import React from 'react';
//
export default function Page(props){
//console.log(props.subData)
  return (
    <ul className="flex flex-wrap px-2 pt-2 ">
    {props.subData.map((item, index) => {
      return (
      <li key={index} 
        className="w-full py-1 px-1 mr-2 sm:w-auto  mb-2 border-solid border-2 sub_navi_border_color">
        <Link href={item.action}>
          <a className="sub_navi_text_color">{item.name}
          </a>
        </Link>        
      </li>      
      )
    })}
    </ul>
    )
}
