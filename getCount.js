(function(){
		var count = 0;//获取你点击的元素是第几个被点击
		var tagName ='';//存放被点击元素的标签名，为后边比较作准备
		document.onclick = function(e){
			tagName = e.target.tagName.toLowerCase();
			siblings(e.target,true);//调用点击元素获取在点击元素前的同辈相同元素标签并且获取前同辈元素的子元素与你点击元素相同的标签
			getP(e.target.parentNode);//获取点击元素之前可能存在相同标签元素，包含点击元素的父类的同辈元素是和点击元素含有相同类型元素或者是其子类具有与点击相同标签类型
			console.log(count);//获取你是第几个元素
		}
		function getP(ele){
			var p_siblings = ele.previousElementSibling || ele;//可能为null
			if(p_siblings.parentNode.tagName.toLowerCase()==='body'||p_siblings.tagName.toLowerCase()==='head') return ;//当你点击的元素时body中第一个时，直接返回
			siblings(p_siblings,false);
			if(p_siblings.previousElementSibling == null){
				getP(p_siblings.parentNode);
			}else{
				getP(p_siblings.previousElementSibling);
			}
		}
		function siblings(ele,flag){
			var target;
			if(flag){
			 	target = ele.previousElementSibling;
			}else{
				target = ele;
			}
			if(target==null)return;
			if(target.tagName.toLowerCase()===tagName&&flag){
				++count;//2
				siblings(target);

			}else{
				var children = target.children;
				if(children.length !== 0){
					for(var i=0;i<children.length;i++){
						if(children[i].tagName.toLowerCase()===tagName){
							++count;
						}else{
							siblings(children[i],false);
						}
					}
				}
				siblings(target,true);
			}
		}
	})()