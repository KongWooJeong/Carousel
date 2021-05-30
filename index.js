/* html 태그 정보를 변수에 할당 */
const prevBtn = document.querySelector("#prev"), // 이전 버튼
    nextBtn = document.querySelector("#next"), // 다음 버튼
    mainImg = document.querySelector(".main"), // 이미지 표시하는 부분
    dotNumber = document.querySelector(".number"); // 하단에 dot 

/* 각 이미지 파일 이름을 배열에 저장 */
const IMAGE = ["image-1", "image-2", "image-3", "image-4", "image-5"];

/* 현재 표시되어있는 이미지를 배열의 인덱스 번호로 변수에 할당 */
let currentImg = 0;

/* 하단에 dot부분 이미지가 변경될때마다 하이라이트 표시 */
function displayDot(dotNum) {
    const dots = dotNumber.children;

    /* 클릭한 dot만 하이라이트를 하기위해 해당 클래스를 모두 지운다. */
    for(var i = 0; i < dots.length; i++) {
        dots[i].classList.remove("selected");
    }
    
    dots[dotNum].classList.add("selected"); // 클릭한 dot만 클래스를 추가하여 하아라이트 표시
}

/* 이미지 화면 출력(매개변수로 이미지 배열의 인덱스를 넘겨 받는다.) */
function displayImg(mainImgNum) {
    const selectImg = IMAGE[mainImgNum]; // 해당 인덱스의 배열 값을 가져온다.
    mainImg.src = `images/${selectImg}.png`; // 가져온 이미지 파일 이름을 사용하여 해당 이미지 화면에 출력.
}

/* 하단 dot 클릭시 해당 이미지 출력 및 dot 하이라이트 */
function handleDotBtn(event) {
    const selectImgNum = event.target.getAttribute("data-value"); // 해당 date-value의 값은 각 이미지 배열의 인덱스 값이 할당되어 있음
    currentImg = parseInt(selectImgNum); // 해당 반환된 값이 String 타입이여서 배열의 인덱스로 지정해야 하기때문에 숫자형으로 변환한다.
    displayImg(currentImg); // 이미지 표시
    displayDot(currentImg); // dot 하이라이트
}

/* 이전 버튼 이벤트 함수 */
function handlePrevBtn() {

    /* 현재 이미지가 첫번째 순서 일때와 그렇지 않을때 나누어서 코드 실행 */
    if (currentImg === 0) {
        // 이미지가 첫번째 순서 일때

        currentImg = IMAGE.length-1; // 이미지 배열의 길이의 -1를 하여 마자막 인덱스를 지정
        displayImg(currentImg); // 이미지 표시
        displayDot(currentImg); // 하단 dot 부분 하이라이트
    } else {
        // 이미지가 첫번째 순서 이외일때

        currentImg -= 1; //-1를 하여 해당 이미지 이전 순서 인덱스 지정
        displayImg(currentImg); // 이미지 표시
        displayDot(currentImg); // 하단 dot 부분 하이라이트
    }
}

/* 다음 버튼 이벤트 함수 */
function handleNextBtn() {

    /* 현재 이미지가 가장 마지막 순서일때와 그렇지 않을때 나누어서 코드 실행*/
    if (currentImg === (IMAGE.length-1)) {
        // 이미지가 마지막 순서일때

        currentImg = 0; // 숫자 0을 지정하여 이미지의 첫번째 순서 인덱스 할당
        displayImg(currentImg); // 이미지 표시
        displayDot(currentImg); // 하단 dot 부분 하이라이트
    } else {
        // 이미지가 마지막 순서 이외일때

        currentImg += 1; // +1를 하여 해당 이미지 다음 순서 인덱스 지정
        displayImg(currentImg); // 이미지 표시
        displayDot(currentImg); // 하단 dot 부분 하아라이트
    }
}

function init () {
    prevBtn.addEventListener("click", handlePrevBtn); // 이전 버튼 클릭시 이벤트 함수
    nextBtn.addEventListener("click", handleNextBtn); // 다음 버튼 클릭시 이벤트 함수

    /* 하단에 dot클릭시 이벤트 함수 */
    for(var i=0; i<dotNumber.children.length; i++) {
        dotNumber.children[i].dataset.value = i; // 해당 dot를 클릭할때 data 속성을 사용하여 해당 이미지의 배열 인덱스 지정
        // 여기서 data 속성을 사용한 이유는 id 속성은 html 값중에서 유일한 값인데 뭔가... 굳이 이미지 배열의 인덱스를 id값으로 할당할 필요가 없다고 생각하였음. 
        // class 속성의 값은 해당 class는 다른 태그의 중복된 값이 지정될수도 있기 때문.

        dotNumber.children[i].addEventListener("click", handleDotBtn); // 각각 dot 버튼 클릭시 이벤트 함수
    }
}

init();