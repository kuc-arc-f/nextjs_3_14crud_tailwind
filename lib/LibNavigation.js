
//
export default {
  get_sub_items: function(parent_id){
    var ret = {}
    var arr = [
      {id: 1 , 
        subData: [
          {name: 'Category' , action: '/category'},
          {name: 'Tags' , action: '/tags'},
        ] 
      } ,
      {id: 2 , 
        subData: [
          {name: 'subAction-11' , action: '/action/11'},
          {name: 'subAction-12' , action: '/action/12'},
        ] 
      } ,
    ]
    arr.forEach(function(item){
//console.log(item.id );
      if(item.id === parent_id){
        ret = item.subData
      }
    });    
    return ret
  },  
}
