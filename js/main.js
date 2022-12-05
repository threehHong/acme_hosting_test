let header = document.querySelector('header');
let goTop = document.querySelector('.go_top');
let qnaWrapper = document.querySelectorAll('.qna_list');


if(qnaWrapper.length > 0) {
    // about 아코디언
    // qnaWrapper[0].style.backgroundColor = 'red';
    qnaList = qnaWrapper[0].querySelectorAll('.qna_list li');

    qnaList.forEach((item, idx) => {
        item.addEventListener('click', (e) => {
            console.log(item);
            console.log(e.currentTarget);
            for(item of qnaList) {
                item.classList.remove('active')
            }
            e.currentTarget.classList.add('active');
        })
    }); 

    /* 
    qnaList를 클릭하면 할 일
    모든 qna_list에서 active를 제거하고
    클릭한 그 요소에만 active를 추가
    */
}

window.addEventListener('scroll',()=>{
    if(window.pageYOffset > 0){
        header.classList.add('active');
    }else{
        header.classList.remove('active');
    }

    if(window.pageYOffset > 300) {
        goTop.classList.add('active');
    } else {
        goTop.classList.remove('active');
    }
});

goTop.addEventListener('click', (e) => {
    e.preventDefault();

    window.scrollTo({left: 0, top:0, behavior:'smooth'})
})

//후기 슬라이드

let sliderWrapper = document.querySelector('.slide_wrapper'),
    sliderContainer = document.querySelector('.slide_container'),
    slide = sliderContainer.querySelectorAll('li'),
    slideCount = slide.length,
    prevBtn = sliderWrapper.querySelector('.fa-chevron-left'),
    nextBtn = sliderWrapper.querySelector('.fa-chevron-right'),
    currentIndex  = 0,
    timer;

//슬라이드 부모(sliderContainer) 너비 지정, 대상.offsetWidth
sliderContainer.style.width = `${sliderWrapper.offsetWidth*slideCount}px`;

for(item of slide){
    item.style.width = `${sliderWrapper.offsetWidth}px`;
}

//슬라이드 이동 함수

function gotoSlide(idx){
    if(idx > slideCount - 1){
        idx = 0;
    } else if (idx < 0) {
        idx = slideCount -1;
    }

    sliderContainer.style.left = `${-idx*100}%`;
    currentIndex = idx;
}

//다음 버튼을 클릭하면 할일
nextBtn.addEventListener('click',()=>{
    gotoSlide(++currentIndex);
});
prevBtn.addEventListener('click',()=>{
    gotoSlide(--currentIndex);
});

//자동 슬라이드
/* 
4초 마다 gotoSlide에 현재번호 +1
*/

function autoslide () {
    timer = setInterval(() => {
        gotoSlide(++currentIndex);
    }, 4000)
}

autoslide();

sliderWrapper.addEventListener('mouseenter', () => {
    clearInterval(timer);
})
sliderWrapper.addEventListener('mouseleave', () => {
    autoslide();
})


// go_top 스크롤이 300이상 이면 보이고, 클릭하면 링크의 기본 속성을 제거하고 상단으로 부드럽게 이동