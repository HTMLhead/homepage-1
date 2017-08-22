(function() {
	/* banner cover image transition  */

})

window.addEventListener("load", function() {
	var cover = document.querySelector("header");
	cover.style.opacity = 1.0;
});

// Scroll Member viewer
(function(){
	const memberWrap = document.querySelector("#team .member-wrap");
	const memberWrapOffsetTop = memberWrap.offsetTop;
	const members = memberWrap.querySelectorAll(".member-content");
	const memberHeight = members[0].offsetHeight;
	const memberCount = members.length;;
	const step = memberHeight * 1.2;
	const initDiffValue = -250;
	const lastDiffValue = (memberCount * step) + memberHeight;
	const activeClassName = "onMemberDesc";

	function _toggleViewByScroll() {
		setTimeout(() => {
			const currentScrolly = window.scrollY;
			const diff = (currentScrolly - memberWrapOffsetTop); 

			const activeElement = document.querySelector("#team .onMemberDesc");
			if(activeElement) activeElement.classList.remove(activeClassName);

			const baseValue = (diff - initDiffValue);

			if(baseValue > 0 && baseValue < lastDiffValue) { 
				const nth = Math.ceil( baseValue / step);
				if(nth <= memberCount) {
					const target =  document.querySelector("#team .team-member:nth-child("+ nth +") > .member-content");
					target.classList.add(activeClassName);
				}
			}
     //recursive
     _toggleViewByScroll();
   },16);
	}

	if(window.innerWidth > 768) return;
	_toggleViewByScroll();

})();


//Set random based recommendation word list.
(function() {
	const recommData = [
		 {
		  content : "최고의 마스터들의 수준 높은 교육과 케어를 통해 실무 지식을 익힐 수 있었고,웹 개발자로서 단단하게 성장할수 있는 발판을 마련 했습니다. 개발자로서 확신이 없으신 분, 막연히 개발을 하고 싶은 모든 분들 모두 코드 스쿼드와 함께 실력있는 개발자로 성장 할 수 있습니다. 코드 스쿼드 강력 추천 합니다.",
		  nickName : "호갱노노 개발자 Alex"
		 },
		 {
		  content : "단지 학생을 위한 교육이 아닌, 개발자가 되기 위한 교육입니다 코드 스쿼드 강력 추천 합니다.",
		  nickName : "수강생 김휘겸"
		 },
		 {
		  content : "코드스쿼드는 주니어 개발자가 되기까지 최고의 동반자다",
		  nickName : "수강생 개구리"
		 },
		 {
		  content : "내가생각했던 것들을 직접 코딩할 수 있도록 만들어 줍니다. 코드스쿼드의 교육방식은 기존의 교육방식과는 다릅니다. 필요한 만큼의 이론을 빠르게 배우고 실무에서 사용할 만한 내용들을 주제로 간단한 과제에서 부터 복잡한 프로제트까지 물흐르듯 자연스럽게 이어집니다. 이러한 수업방식은 개발을 지속해 나갈 수 있는 힘을 키워줍니다.",
		  nickName : "NHN엔터테인먼트 개발자 브라운"
		 }
	]

	const selectedList = [];
	while(true) {
		const num = Math.floor(Math.random()*4);
		if(selectedList.indexOf(num) < 0 ) selectedList.push(num);
		if(selectedList.length === 3) break;
	}


	const recommHTML = selectedList.reduce((sumHTML,curr) => {
		const word = recommData[curr];
		const sHTML = `<div>
			<div> ${word.content} </div>
			<div> ${word.nickName} </div>
		</div>`;
		return sumHTML + sHTML;
	}, "");

	document.querySelector("#recommendations .recomm-word-row:nth-child(3)").innerHTML = recommHTML;

})();

/*
// Blog Post Slider
(function() {
	var elBlog = document.querySelector(".blog-post-links");
	var url = 'https://tlhm20eugk.execute-api.ap-northeast-2.amazonaws.com/prod/lambda_get_blog_info';
	if(elBlog) runXHR(url);

	function runXHR(url) {
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", blogPostSlider);
		oReq.open("GET", url);
		oReq.send();
	}

	function blogPostSlider() {
		var data = JSON.parse(this.responseText);
		var list = JSON.parse(data.body);
		var slides = list.length;
  
		for (var i = 0; i < slides + 1; i++) {
			e = i % slides;
			var title = list[e].title;
			var link = list[e].link;
			var post = '<li><a href="' + link + '" target="_blank">' + title + "</a></li>";
			elBlog.insertAdjacentHTML('beforeend', post);
		}

		lastSlide = elBlog.childNodes[slides - 1];
		cln = lastSlide.cloneNode(true);
		elBlog.insertBefore(cln, elBlog.childNodes[0]);

  
		// Slider
		// init value
		var elBlogBanner = document.querySelector(".blog-banner");
		var slidesNum = elBlog.childElementCount;

		// init slide 
		var getwidth = changeSlideWidth();
		moveSlides(getwidth);
		setTimeout(function() {
			elBlog.style.transition = "";
		}, (600));

    	//reset slide width as reszing window
		window.addEventListener('resize', function(evt) {
			getwidth = changeSlideWidth();
			moveSlides(getwidth);
		});

		function changeSlideWidth() {
			var width;
			var container = document.getElementsByClassName("blog-content")[0];
			var containerwidth = getComputedStyle(container, null).getPropertyValue("width").replace(/\D/g, '').toString();

			if (containerwidth.length >= 5) {
				width = Number(/[0-9]{4}/.exec(containerwidth));
				if (width > screen.width) {
					width = Number(/[0-9]{3}/.exec(containerwidth));
				}
			} else {
				width = containerwidth;
			}

			elBlog.style.width = (slidesNum * width) + 'px';
			elBlog.style.transform = "translate(-" + width * 1 + "px, 0px)";
			elBlog.style.transition = "none";
			return width;
		}

		function moveSlides(width) {
			var i = 1;
			elBlog.style.width = (slidesNum * width) + 'px';
			elBlog.style.transform = "translate(-" + width * 1 + "px, 0px)";
			var slideButton = Array.prototype.slice.call(elBlogBanner.getElementsByTagName("button"));
  

			for (var e = 0; e < slideButton.length; e++) {
				slideButton[e].addEventListener("click", function(evt) {
					var target = evt.target;
					if (target.tagName === "SPAN") { target = target.parentNode;}

					if (target.className === "next") {
						i++;
						if (i > slidesNum) {i = 3;}
						moveNext(i);
					}
					if (target.className === "previous") {
						if (i === 0) {i = slidesNum;}
						if (i === slidesNum-1){ i = i-2;}
						movePrevious(i);
						i--;
					}
				});
			}

			function moveNext(i) {
				if (i === slidesNum) {
          			elBlog.style.transition = "none";
					elBlog.style.transform = "translate(-" + width * 1 + "px, 0px)";
					setTimeout(function() {
						elBlog.style.transition = "";
						elBlog.style.transform = "translate(-" + width * 2 + "px, 0px)";
					}, (100));
				}
        
       			else {
					elBlog.style.transition = "";
					elBlog.style.transform = "translate(-" + width * i + "px, 0px)";
				}
			}

			function movePrevious(i) {
        		if (i === slidesNum){
          			elBlog.style.transition = "none";
          			elBlog.style.transform = "translate(" + (width - (width * (i-1))) + "px, 0px)";
          			setTimeout(function() {
						elBlog.style.transition = "";
            			elBlog.style.transform = "translate(" + (width - (width * (i-2))) + "px, 0px)";
					}, (100));
        		}
        		else {
					elBlog.style.transition = "";
					elBlog.style.transform = "translate(" + (width - (width * i)) + "px, 0px)";
				} 
			}
		}
	}
})()
*/