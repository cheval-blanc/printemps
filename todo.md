# Printemps

## Audio Streaming
1. Ajax 만으로 binary file을 전송하는게 불가능한가?
    - res.sendFile() function으로 server에서 전송했는데, client에서 못받음

1. **(O)** BinaryJS를 이용한 기본적인 오디오 파일 재생
    - 이벤트 기반으로 재생 및 일시정지
    - <https://www.olindata.com/blog/2014/01/file-uploading-and-streaming-binaryjs>

1. 테스트 용으로 음악 샘플 몇개 추가해서 서버에서 리스트 받기
    - **(O)** m4a file 전송 확인
    - Transport Apple lossless file
        - 직접 ripping한 음원은 재생이 안된다.
        - Chrome 에서 Apple Lossless 파일을 지원 안함
        - m4a container의 문제가 아니라 codec의 문제인듯
    - **(O)** header에 파일 정보 표시하기

1. 로딩하는 동안 재생 아이콘 변경: <http://fontawesome.io/examples/#animated>
    - 관찰해보니 page가 멈춘다.
        - 비동기로 데이터를 받아오는 방법이 없을까? ajax같은
    - **(O)** 전송이 완료되고 audio.play()할 때 아이콘을 변경해야 하는데, 변수를 넘겨줘야하나?
        - angularjs.$apply function 사용하여 binaryClient.js에서도 playController의 scope에 접근할 수 있었다.
        - emit function을 호출했을 때는 "fa-spinner fa-spin" 으로 아이콘 변경
        - playable한 파일의 경우에만 "pause"로 변경
    - **(O)** unplayable한 경우에는 "fa-frown-o"로 변경

1. 볼륨 변경하기
    - **(O)** 기본적인 volume bar 구현
        - <http://jsfiddle.net/onigetoc/r44bzmc1/>
    - volume circle의 위치를 negative margin에서 %로 바꾸는 것이 불가능

1. 재생 시간 변경하기
    - **(O)** 먼저, 총 재생 시간이 필요하다. (mediaElement의 currentTime, duration 이용)
    - audioCtx가 재생되면 값이 변경되었다는 것을 감지해야함
    - ~~angularjs $watch 사용~~
        - secondsToHms(audioCtx.currentTime) 값이 변경되면 업데이트 함
        - 불규칙적으로 callback function이 호출되는 문제가 있다.
        - angularjs.$watch의 성능 이슈인지는 확실하지 않다. (거의 맞는듯)
    - **(O)** angularjs directive 사용
        - <https://docs.angularjs.org/api/ng/service/$interval>
        - $interval을 사용하여 500 ms 마다 update
    - header-bar 색 변경
        - 재생 시간 변경 callback function 안에서 같이 수정하면 될듯

1. Cache를 이용하여 Buffering 기능 구현
    - 2016-12-06 까지 구현한 것으로 보아, 조각 파일들을 모두 전송 받아야 재생할 수 있는 것 같다.
    - <http://www.jingpingji.com/blog/2015/8/4/transferring-sound-data-with-binaryjs-and-buffering-for-smooth-playbac>


## File List
1. 오디오 파일 리스트 구성하기
    - 모든 오디오 파일을 서버 경로에 추가해아하나?
        - 기존의 경로와 연동할 수 있는 방법이 없을까?
        - 만약 연동이 된다면 보안의 문제가 없을까?
    - 만약 모든 파일들을 추가했다고 가정했을 때, 앨범 별로 어떻게 나눠서 보여주지
        - path를 내려갈 때마다 체크한다?
        - 매번 scan하는 것은 비효울 적이니, DB를 사용해야하나?

1. DB를 사용할 경우
    - mongoDB
    - title, artist, album-artist, composer, album, year, track, disc, album-art
        - group: album-artist, album
        - sort 1: artist, year (track 마다 year가 다른 경우도 있다.)
        - sort 2: track, disc
    - 주기적으로 자동으로 list update
        - Node.js에 관련 기능이 있는지 조사 필요


## Responsive Web
1. width, padding, margin을 모두 %로 사용하는 것은 목표와 다른 것 같다.
    - 특정 viewport 가로 길이 마다 변경하고 싶기 때문

1. flex로 구현이 가능한지는 의문이 든다.


## View
1. iTunes와 비슷한 UI로 구성하기
    - 기본적인 바탕 색은 흰색이고, Simpson 도넛의 색과 섞고 싶다.
    - Printemps의 이미지와 잘 어울리는 괜찮은 색 조합 찾기

1. Lisa를 header에 넣고 싶음
    - 생각 보다 크다.

1. 네모네모한 UI를 사용할 예정
    - grid하게 화면을 가득 채우는 라이브러리가 있었는데, 써볼까? \(Do it! 반응형 웹 디자인\)
        - 읽어보니 그런건 없었다.


## Code Versioning
1. Github?
    - **(O)** 왠만하면 git을 써보자
    - **(O)** SourceTree 사용


## Publishing
1. Node.js 프로젝트를 publishing하는 방법 찾기
    - Heroku와 같은 서비스 이용하기?

1. 직접 서버를 구축하는게 파일 관리하기가 쉬울 것 같다.
    - 서버 구축에 대한 장비 구입이나 관련 지식이 필요하다.


## AngularJS
1. AngularJS 1에서 2로 porting
    - Git의 branch 기능을 사용하면 좋을 듯


## Debugging
1. header에서 제목이나 앨범이 길면 slide animation 넣기
    - marquee tag가 있으나, 곧 deprecated. <https://developer.mozilla.org/ko/docs/Web/HTML/Element/marquee>
    - css animation으로 구현하는 방법이 없는지 확인 
        - <http://www.html.am/html-codes/marquees/css-slide-in-text.cfm>
        - <http://stackoverflow.com/questions/32520546/css-loop-an-animation>
    - text 모두 보여질 때 까지만 이동하고 싶은데 방법이 없을까?
    - margin-left? margin-right?

