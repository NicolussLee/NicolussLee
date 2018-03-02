var token = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token');
$(function() {
	addTopCart();
	//获取广告图片，将图片插入轮播图
	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_goods.php",
		"type": "GET",
		"data": {
			"position_id": 1
		},
		"success": function(response) {

			adInsert($("[role=listbox]"), response, $(".carousel-indicators"));
		}
	});
	//商品分类
	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_goods.php",
		"type": "GET",
		"success": function(response) {

			adInsertNav($(".special .sp_nav ul"), response)
		}
	});
	//获取商品列表
	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_goods.php",
		"type": "GET",
		"data": {
			"page": 3,
			"pagesize": 8
		},
		"success": function(response) {

			adInsertList($(".special .content .row"), response);
			$('[data-toggle="popover"]').popover();

			$(".addCart").click(function() {

				goodsId = $(this).attr("goodid");

				

				addCartFun($(this).parents(".sp_img").find("img"),goodsId);
			});
		}
	});

	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_goods.php",
		"type": "GET",
		"data": {
			"page": 6,
			"pagesize":8
		},
		"success": function(response) {
			$('[data-toggle="popover"]').popover();

			$(".addCart").click(function() {
				goodsId = $(this).attr("goodid");
				addCartFun($(this).parents(".sp_img").find("img"),goodsId);
			});
			adGoodsList($('.ad .row .adGoods'), response)
		}
	});

	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_goods.php",
		"type": "GET",
		"data": {
			"page": 4,
			"pagesize":3
		},
		"success": function(response) {
			$('[data-toggle="popover"]').popover();

			$(".addCart").click(function() {
				goodsId = $(this).attr("goodid");
				addCartFun($(this).parents(".sp_img").find("img"),goodsId);
			});
			supGoods($('.summer'), response,1);
			supGoods($('.newComer'), response,0);
			supGoods($('.winter'), response,2);
		}
	});

	$.ajax({
		"url": "http://h6.duchengjiu.top/shop/api_goods.php",
		"type": "GET",
		"data": {
			"page": 7,
			"pagesize":1
		},
		"success": function(response) {
			document.getElementsByClassName('item-thumb-product')[0].innerHTML=('<a href="'+response.data[0].thumb+'"><img src="'+response.data[0].goods_thumb+'" alt="" /></a>');
			console.log(response);
			document.getElementById('price').innerHTML=( '上市价格 :<span >$'+response.data[0].price+'</span>');
			document.getElementsByClassName('h2')[0].innerHTML=( '<a href="'+response.data[0].thumb+'">'+response.data[0].goods_name+'</a>');
		}
	});
});

// 轮播图添加图片
function adInsert(element, response, spot) {
	var obj = response.data;
	var html = '';
	console.log(obj)
	for (var i = 1; i < 6; i++) {
		html += `<div class="item">
			<a href="${obj[i].thumb}">
				<img src="${obj[i].goods_thumb}" alt="..." ">
				<div class="carousel-caption">
				<a href="details.html?goodId=${obj[i].goods_id}">
					<p>${obj[i].goods_name}</p>
				</a>
				<p class="prices">
					<span>$ ${obj[i].price}</span>
				</p>
			</div>
			</a>	
		</div>`;
		if (spot) {
			spot.append(' <li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>')
		}

	}

	element.append(html);
}

function adInsertNav(element, response) {
	var obj = response.data;
	var html = '';
	for (var i = 0; i < obj.length; i++) {
		html += `<li><a href="shoplist.html?cartId=${obj[i].cat_id}" cartId="${obj[i].cat_name}">${obj[i].cat_name}</a></li>`;

	}

	element.append(html);
}

//添加广告产品：
function adGoodsList(element, response) {
	var obj = response.data;
	var html = '';
	for (var i = 0; i < obj.length; i++) {
		html += `
		<div class="col-sm-3 col-xs-6 ad_inner inner ">
		<div class='adgood'>
			<a href="details.html?goodId=${obj[i].goods_id}">
				<img src="${obj[i].goods_thumb}"/>
			</a>
			<div class="ad_info">
				<a href="details.html?goodId=${obj[i].goods_id}">
					<p class="ad_desc">${obj[i].goods_name}</p>
					<span class="ad_title">$ ${obj[i].price}</span>
				</a>
				<span class="addCart btn" goodId=${obj[i].goods_id}>添加购物车</span>
			</div>
			</div>
		</div>`;
	}

	element.append(html);
}

//添加购物车
function adInsertList(element, response) {
	var obj = response.data;
	var html = '';
	for (var i = 0; i < obj.length; i++) {
		html += `<div class="col col-lg-3 col-md-4 col-sm-6">
						<div class="sp_img">
							<a href="details.html?goodId=${obj[i].goods_id}">
								<img src="${obj[i].goods_thumb}"/>
							</a>
							
							<div class="sp_btn">
								<span class="collection btn" goodId=${obj[i].goods_id} data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="收藏">
									<i class="glyphicon glyphicon-heart"></i>
								</span>
								<span class="addCart btn" goodId=${obj[i].goods_id} data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="添加到购物车">
									<i class="glyphicon glyphicon-shopping-cart"></i>
								</span>
								<span class="qSearch btn" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="top" data-content="快速浏览">
									<i class="glyphicon glyphicon-search"></i>
								</span>
							</div>
						</div>
						<div class="sp_info">
							<a href="details.html?goodId=${obj[i].goods_id}">
								<p class="sp_title">${obj[i].goods_name}</p>
							</a>
							
							<p class="price">
								<span class="persale">10%</span>
								<span class="new_price">$ ${obj[i].price}</span>
								<span class="old_price">$345</span>
							</p>
						</div>
						
					</div>`;

	}

	element.append(html);
}

//添加广告产品：
function supGoods(element, response,i) {
	var obj = response.data;
	pp=obj[i].price*Math.floor(Math.random()*4+1);
	var html = '';
		html = `
		<div class="item">
		<a href="details.html?goodId=${obj[i].goods_id}">
			<img src="${obj[i].goods_thumb}"/>
		</a>
		<div class="lab">55%off</div>
		<div class="item_info">
			<div class="info">
				<p class="info_name">${obj[i].goods_name}</p>
				<p class="price">
					<span class="new_price">$${obj[i].price}</span>
					<span class="old_price">$${pp}</span>
				</p>
				<p class="info_btn">
					<span class="btn">
						<i class="glyphicon glyphicon-heart"></i>
					</span>
					<span class="btn addCart">
						<i class="glyphicon glyphicon-shopping-cart"></i>
					</span>
					<span class="btn">
						<i class="glyphicon glyphicon-search"></i>
					</span>
				</p>
			</div>
			<div class="count_down" id=''>
				<span class="days">0天</span>
				<span class="hour">0时</span>
				<span class="min">00分</span>
				<span class="sec">00秒</span>
			</div>
		</div>
	</div>`;

	element.append(html);
}

//倒计时
function daojishi() {
	var box = document.getElementsByClassName("timer")[0];
	var oCount_down1=document.getElementsByClassName('count_down')[0];
	var oCount_down2=document.getElementsByClassName('count_down')[1];
	var oCount_down3=document.getElementsByClassName('count_down')[2];
	var mytime = new Date();
	var tian = 18 - mytime.getDate();
	var shi = 23 - mytime.getHours();
	var fen = 59 - mytime.getMinutes();
	var miao = 59 - mytime.getSeconds();
	box.innerHTML = '<span class="days">'+tian+'天</span><span class="hour">'+shi+'时</span><span class="min">'+fen+'分</span><span class="sec">'+miao+'秒</span>';
	oCount_down1.innerHTML='<span class="days">'+tian+'天</span><span class="hour">'+shi+'时</span><span class="min">'+fen+'分</span><span class="sec">'+miao+'秒</span>';
	oCount_down2.innerHTML='<span class="days">'+tian+'天</span><span class="hour">'+shi+'时</span><span class="min">'+fen+'分</span><span class="sec">'+miao+'秒</span>';
	oCount_down3.innerHTML='<span class="days">'+tian+'天</span><span class="hour">'+shi+'时</span><span class="min">'+fen+'分</span><span class="sec">'+miao+'秒</span>';
}
setInterval(daojishi, 1000);

// 右侧固定导航栏事件
$(".explain ul li a").mouseenter(function(){

    $(this).animate({"margin-left":10},300);
});
$(".explain ul li a").mouseout(function(){
    $(this).animate({"margin-left":0},300);
});
$("nav ul li").mouseenter(function(){
    $(this).children(".explain01").show(200);
    $(this).children(".explain01").animate({"left":-80},200);
});
$("nav ul li").mouseout(function(){
    $(this).children(".explain01").animate({"left":-120},200);
    $(this).children(".explain01").hide(200);
});
$(".shop_cart").click(function  () {
    $("#shop_cart").css("display","block")
});
$("#shop_cart_close").click(function  () {
    $("#shop_cart").css("display","none")
});
$(window).scroll(function(){
    $(".back_top").css("display","block")
});
$(".back_top").click(function() {
	$("html,body").animate({scrollTop:0},500,function(){
		key = 0;
	})
})