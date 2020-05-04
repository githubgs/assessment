'use strict';
const userNameInput = document.getElementById('username');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
* 指定した要素の子要素をすべて削除する
* @param {HTMLElement} Element HTMLの要素
*/
function removeAllChildren(element){
    while(element.firstChild){//子供要素がある限り削除
        element.removeChild(element.firstChild);
    }
}
userNameInput.onkeydown = (event) = function(){
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};

assessmentButton.onclick = function(){
    //assessmentButton.onclick = () => {
    const userName = userNameInput.value; //名前が空のときは処理を終了する。
    if (userName.length ===0) {
        console.log('名前が入力されてない')
        return;
    }
    console.log(userName);
    console.log('ボタンが押されました');
    console.log(assessment(userName));
    // todo 診断結果表示エリアの作成
    removeAllChildren(resultDivided)
    const header = document.createElement('h3')
    header.innerText = '診断結果';
    resultDivided.appendChild(header);
    
    const paragraph = document.createElement('p')
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //　todo　ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor  = document.createElement('a');
    const hrefvalue = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';
     anchor.setAttribute('href',hrefvalue);
     anchor.className = 'twitter-hashtag-button'; 
     anchor.setAttribute('data-text',"診断結果の文章" );
     anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);




}

const answers = [
    '{userName}のいいところはAです。{userName}',
    '{userName}のいいところはBです。',
    '{userName}のいいところはCです。',
    '{userName}のいいところはDです。',
    '{userName}のいいところはEです。',
    '{userName}のいいところはFです。',
    '{userName}のいいところはGです。',
    '{userName}のいいところはHです。',
    '{userName}のいいところは優しさです。',
    
]



/**
*名前の文字列を渡すと診断結果を返す関数jsdoc
*@param{string} userName ユーザーの名前
*@return{string} 診断結果

function assessment(userName){
    // todo 診断結果を表示する
    return '';
}
*/

function assessment(userName){
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字コード番号の合計を回答の数で割って添え字の数字を決める。
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    // todo {userName} をユーザーの名前に置き換える。

    result = result.replace(/\{userName\}/g, userName);


    return　result
}


console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));
console.log(userNameInput);
console.log(tweetDivided);


console.assert(
    assessment('太郎')　===　'太郎のいいところはAです。太郎',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
    assessment('太郎')　===　assessment('太郎'),
    '診断結果が同一ではありません。'
);

const test_a = encodeURIComponent('あ');
console.log(test_a);
console.log(decodeURIComponent(test_a));
