function jsonLoad(jsonurl, handler){
 var params = { dataType: 'json', async: false, cache: true, ifModified: true, url: jsonurl, success: handler } ;
 $.ajax(params).error(function(jqxhr,s,m){ alert('Erreur json'); });
}

function json_success_produits(data, textStatus, jqxhr) {
  //alert(data);
  $('#listeProduits').html("");
  $.each(data,function(i,produit){
   //var strli = '<li><a href="#produit">'+produit["nom"]+'</a></li>'
   //var strli = '<li><a href="#produit"><img width="60" height="70" src="'+produit["image"]+'" />'+produit["nom"]+'</a></li>'
   var strli = '<li><span style="display: none;">'+produit["url"]+'</span><a href="#produit"><img width="60" height="70" src="'+produit["image"]+'" />'+produit["nom"]+'</a></li>'
   $('#listeProduits').append(strli);
  });
  $('#listeProduits').listview('refresh');
}

function json_success_produit(data, textStatus, jqxhr) {
  // alert(data);
  $('#produit div h1').html(data["nom"]);
  $.each(data,function(k,v){
   if ( k != "nom" ) { $('#produit_'+k).html(v); }
  });
  $('#produit_img').attr('src',data["image"]);
}
////////////////////////////////////
////////////////////////////////////
$(document).on('pageinit','#accueil',function(event){
 jsonLoad("/produits.json",json_success_produits);
}); // pageinit accueil
 $(document).on("click","#listeProduits > li", function(e) {
	 //alert($('span',this).html());
         jsonLoad($('span',this).html(),json_success_produit);
 });
