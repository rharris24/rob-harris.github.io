// JavaScript Document
var CartArray = new Array();
var data = {"total":0,"rows":[]};
var totalCost = 0;
$(document).ready(function(){
	$('#Shopping_Cart_Content').datagrid({
		singleSelect:true
	});            
	if(localStorage &&  localStorage.getItem("StoredCart") ){
		var tempData = JSON.parse(localStorage.getItem("StoredCart"));
		for(var i = 0; i < tempData.length; i++){
			var exists = false;
			for(var j = 0; j < data["rows"].length; j++){
				if(data["rows"][j].name == tempData[i].name){
					data["rows"][j].quantity++;
					exists = true;
				}
			}
			if(!exists){
				data["rows"].push(tempData[i]);
			}
			data["total"] += parseFloat(tempData[i].price * tempData[i].quantity);
			$('div.Cart .Total_Cost').html('Total: £'+data["total"]);
		}
		console.log(data);
		$('#Shopping_Cart_Content').datagrid('loadData', data);
	}
	$('.Shop_Item').draggable({
		revert:true,
		proxy:'clone',
		onStartDrag:function(){
			$(this).draggable('proxy').css('z-index',10);
		}
	});
	$('.Cart').droppable({
		onDrop:function(e,source){
			var itemName = $(source).find('p.Item_Name').text();
			var itemPrice = $(source).find('p.Item_Name').attr("data");
			console.log(itemPrice)
			addProduct(itemName, parseFloat(itemPrice));
			localStorage.setItem("StoredCart", JSON.stringify(data["rows"]));
			console.log(data["rows"]);
		}
	});
});
function addProduct(name,price){
	function add(){
		for(var i=0; i < data.total; i++){
			var row = data.rows[i];
			if (row.name == name){
				row.quantity += 1;
				return;
			}
		}
		console.log(name)
		console.log(parseInt(price))
		data.total += 1;
		data.rows.push({
			name:name,
			quantity:1,
			price:price
		});
	}
	add();
	totalCost += price;
    localStorage.setItem("totalCost", parseInt(totalCost));
	$('#Shopping_Cart_Content').datagrid('loadData', data);
	$('div.Cart .Total_Cost').html('Total: £'+totalCost);
	console.log(data);
}
function ClearCart(){
	localStorage.removeItem("cart");
	localStorage.removeItem("StoredCart");
	localStorage.removeItem("totalCost");
	alert("Items purchased")
	window.location.reload(false); 
}