import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { BookCard } from "../components/BookCard";
import type { BookDataInterface } from "../types/testType";
import * as S from "../styles/MainPageStyle";

// TODO: BookCard 컴포넌트 가져오기 -> src, title, size, onClick 함수 만들기
// TODO: 책 관련 백엔드 API 확인 및 검증 -> 현재 책 등록 API에 문제가 있어서 더미데이터로 사용해야 함...
// TODO: 백엔드 DB 사용전 더미 데이터 사용해서 map 실행
// TODO: 최신 등록 기준으로 (스터디는 불가능 할 듯 현재로서) 정렬하기

const DUMMY_BOOKS_ADD = [
  {
    id: 1,
    title: "모던 자바스크립트 Deep Dive (자바스크립트의 기본 개념과 동작 원리)",
    image:
      "https://shopping-phinf.pstatic.net/main_3247271/32472713016.20220527034215.jpg",
    author: "이웅모",
    publisher: "위키북스",
    pubDate: "2020/09/25",
    isbn: "9791158392239",
    description:
      "269개의 그림과 원리를 파헤치는 설명으로 ‘자바스크립트의 기본 개념과 동작 원리’를 이해하자!\n\n웹페이지의 단순한 보조 기능을 처리하기 위한 제한적인 용도로 태어난 자바스크립트는 과도하다고 느껴질 만큼 친절한 프로그래밍 언어입니다. 이러한 자바스크립트의 특징은 편리한 경우도 있지만 내부 동작을 이해하기 어렵게 만들기도 합니다.\n \n하지만 자바스크립트는 더 이상 제한적인 용도의 프로그래밍 언어가 아닙니다. 오랜 변화를 거쳐 이제 자바스크립트는 프런트엔드와 백엔드 영역의 프로그래밍 언어로 사용할 수 있는 명실상부한 범용 애플리케이션 개발 언어로 성장했습니다. 따라서 자바스크립트를 학습하는 방식도 이에 걸맞게 변화해야 하며, 이 책은 자바스크립트의 기본 개념과 동작 원리를 깊이 있게 학습하고자 하는 독자를 위해 기획되었습니다.\n \n《모던 자바스크립트 Deep Dive》에서는 자바스크립트를 둘러싼 기본 개념을 정확하고 구체적으로 설명하고, 자바스크립트 코드의 동작 원리를 집요하게 파헤칩니다. 따라서 여러분이 작성한 코드가 컴퓨터 내부에서 어떻게 동작할 것인지 예측하고, 명확히 설명할 수 있도록 돕습니다. 또한 최신 자바스크립트 명세를 반영해 안정적이고 효율적인 코드를 작성할 수 있는 기본기를 다지고, 실전에서 쓰이는 모던 자바스크립트 프레임워크나 도구를 완벽하게 이해하고 활용할 수 있게 도와줍니다.",
    createAt: "2022/08/01",
  },
  {
    id: 2,
    title: "이펙티브 타입스크립트 (동작 원리의 이해와 구체적인 조언 62가지)",
    image:
      "https://shopping-phinf.pstatic.net/main_3247334/32473346832.20220527050638.jpg",
    author: "댄 밴더캄",
    publisher: "인사이트",
    pubDate: "2021/06/22",
    isbn: "9788966263134",
    description:
      "타입스크립트는 타입 정보를 지닌 자바스크립트의 상위 집합으로, 자바스크립트의 골치 아픈 문제점들을 해결해 준다. 이 책은 《이펙티브 C++》와 《이펙티브 자바》의 형식을 차용해 타입스크립트의 동작 원리, 해야 할 것과 하지 말아야 할 것에 대한 구체적인 조언을 62가지 항목으로 나누어 담았다.\n각 항목의 조언을 실제로 적용한 예제를 통해 연습하다 보면 타입스크립트를 효율적으로 사용하는 방법을 익힐 수 있다. 타입스크립트를 기초적인 수준에서만 활용했다면 이 책을 통해 타입스크립트 전문가로 거듭나 보자.\n\n이 책에서 다루는 내용\nㆍ 타입스크립트의 타입 시스템에 대한 자세한 이해\nㆍ 안전하고 명료한 코드를 작성할 수 있는 타입 설계\nㆍ 최소한의 타입 구문으로 완전한 안전성을 얻을 수 있는 타입 추론\nㆍ any 타입의 전략적 사용\nㆍ 의존성과 타입 선언 파일이 동작하는 원리\nㆍ 자바스크립트를 타입스크립트로 마이그레이션하는 방법",
    createAt: "2022/08/01",
  },
  {
    id: 3,
    title: "PHP+MySQL 입문 (예제로 배우는 백엔드 프로그래밍)",
    image:
      "https://shopping-phinf.pstatic.net/main_3245555/32455552922.20220527090959.jpg",
    author: "황재호",
    publisher: "인포앤북",
    pubDate: "2022/01/25",
    isbn: "9791192038025",
    description:
      "?초보자를 위한 PHP & MySQL 완벽 학습서!?\nPHP와 MySQL 기초 확립!\n예제 따라하기 실습을 통한 백엔드 프로그래밍 정복!\n원격 서버에 웹 사이트 구축 기술 전수!\n\n이 책에는 다양한 난이도의 실습 예제가 다수 수록되어 있습니다. 이 예제들을 실습하면서 공부하다 보면 자연스럽게 PHP와 MySQL의 동작 원리를 파악하여 스스로 웹 사이트를 제작할 수 있는 능력을 갖추는 데 초점이 맞추어져 있습니다. 책은 Part 1, Part 2, Part 3 세 개의 파트로 구성되어 있습니다. Part 1에서는 실습을 위해 XAMPP 프로그램을 설치한 다음 쉬운 실습 예제를 통하여 PHP의 기본 문법, 쿠키와 세션, 객체지향 프로그래밍 등 PHP의 기초를 익힙니다. Part 2에서는 MySQL 데이터베이스 기초와 PHP에서 DB를 연동하는 API 함수의 사용법을 익히고 게시판 제작 실습을 통해 웹 페이지 제작의 기초를 배웁니다. 마지막으로 Part 3에서는 실제로 원격 서버에 커뮤니티형 웹 사이트 구축 실습을 통하여 자신만의 사이트를 구축할 수 있는 능력을 배양합니다.",
    createAt: "2022/08/01",
  },
  {
    id: 4,
    title: "백엔드를 위한 Django REST Framework with 파이썬",
    image:
      "https://shopping-phinf.pstatic.net/main_3247842/32478422656.20220527090925.jpg",
    author: "권태형",
    publisher: "영진닷컴",
    pubDate: "2022/12/20",
    isbn: "9788931466195",
    description:
      "파이썬으로 배우는 실전 REST 서버 개발!\n\n수많은 기업이나 팀에서 코딩을 필수 덕목으로 특히, 파이썬 언어를 사용할 수 있는 사람들을 우대할 정도로 파이썬의 인기는 나날이 높아지고 있다. 이는 파이썬이 난이도가 비교적 쉽고 활용 가능한 분야가 많기 때문이다. 많은 개발자들과 개발자를 꿈꾸는 사람들이 파이썬을 배우고 있지만 막상 활용 방법이나 자신에게 무엇이 부족한지 갈피를 잡지 못하고 있다.\n이 책은 파이썬과 Django 기반의 기술로 웹과 앱에 전부 대응하는 REST 서버를 만들어 볼 수 있다. 기반 기술을 모르더라도 비전공자도 다룰 수 있도록 웹 개발 개념부터 데이터베이스 쿼리, Django 프로젝트 구조 등을 쉽게 설명한다. 더 나아가 백엔드의 기초, 실제 개발, 배포까지 전 과정을 배울 수 있어 백엔드와 API 서버 개발의 기본기를 충실하게 쌓을 수 있다. 백엔드와 서버 지식이 없는 사람도 쉽게 이해할 수 있도록 새로운 용어나 기술을 상세히 소개하고 있다. 다양한 예시를 통해 개념을 잡고 난 뒤에는 실제로 코드를 작성하며 간단한 기능 구현부터 프로젝트까지 한 번에 배울 수 있을 것이다.",
    createAt: "2022/08/01",
  },
  {
    id: 5,
    title:
      "프론트엔드 개발을 시작하려고 해: 입문편 (HTML, CSS, JS 기본기부터 Git을 활용한 버전 관리와 클론 코딩까지)",
    image:
      "https://shopping-phinf.pstatic.net/main_3246336/32463362596.20220527024534.jpg",
    author: "박영웅",
    publisher: "패스트캠퍼스랭귀지",
    pubDate: "2022/02/17",
    isbn: "9791197641718",
    description:
      "패스트캠퍼스 프론트엔드 분야 1등 강의!\n〈초격차 패키지 Online: 한 번에 끝내는 프론트엔드 개발〉에서 \n입문자를 위한 내용만 골라 담았습니다\n\n많은 수강생이 선택한 온라인 강의 〈초격차 패키지 Online: 한 번에 끝내는 프론트엔드 개발〉이 책으로 만들어졌습니다. 온라인 강의의 장점은 그대로 살리고, 긴 수강시간과 수강료의 부담은 깔끔하게 덜어낸 결과물입니다. 태어나서 코딩을 한 번도 접해보지 못한 사람, 웹퍼블리셔에서 프론트엔드 개발자로 커리어 피벗을 원하는 사람, 자기만의 웹사이트를 만들어보고 싶은 사람에게 도움이 되는 내용이 여기에 모두 담겨 있습니다.",
    createAt: "2022/08/01",
  },
  {
    id: 6,
    title:
      "프론트엔드 웹 개발 (단계별 예제로 마스터하는 최신 웹사이트 & 웹 애플리케이션)",
    image:
      "https://shopping-phinf.pstatic.net/main_3246373/32463739637.20220527085138.jpg",
    author: "크리스 아키노",
    publisher: "비제이퍼블릭",
    pubDate: "2017/08/11",
    isbn: "9791186697405",
    description:
      "단계별 예제로 마스터하는 최신 웹사이트 & 웹 애플리케이션\n\n프론트엔드 개발자는 기기나 운영체제와 상관없이 최대한 다양한 사용자가 이용할 수 있도록 브라우저에서 작동하는 애플리케이션을 내놓는다. 이 가이드는 플랫폼에 호환되는 풍부한 웹 사용자 경험을 만들기 위해 프로그래밍 개발의 기초를 튼튼하게 다지는 데 도움을 준다. 이 책은 이전의 웹 사용자 경험을 접해본 다양한 플랫폼의 프로그래머와 개발자들이 최신 도구와 모범 사례를 빨리 익힐 수 있도록 해주며 자바스크립트, CSS3, HTML5에 중점을 두고 있다. \n\n각 장에서는 여러 애플리케이션을 만들기 위해 필요한 개념과 API에 대해 소개한다. 반응형 UI 구현, 원격 웹 서비스 접속 및 Ember.js를 사용한 애플리케이션 개발 등에 대해서도 다룬다. 또한 최신 개발 도구를 사용하여 코드의 버그를 처리하고 테스트하며, Node.js과 npm 레지스트리의 오픈소스 모듈을 활용할 것이다.",
    createAt: "2022/08/01",
  },
  {
    id: 7,
    title:
      "파이썬 자동화 교과서 (업무 생산성을 3배 높이는 엑셀, 워드, 크롤링, 메일 자동화 기술)",
    image:
      "https://shopping-phinf.pstatic.net/main_3327549/33275494626.20220716093824.jpg",
    author: "구지라 히코즈쿠에",
    publisher: "제이펍",
    pubDate: "2022/07/19",
    isbn: "9791192469195",
    description:
      "매일 지루하게 반복되는 작업, 이제 안녕 \n정시 퇴근과 연봉 인상을 보장하는 파이썬 업무 자동화 기술\n\n사람이 종일 작업할 반복 업무를 프로그래밍을 이용하면 2시간 만에 끝낼 수 있다. 파이썬은 누구나 입문할 수 있는 프로그래밍 언어로, 이 책은 엑셀 데이터 처리 등 일상적인 업무를 파이썬으로 자동화하는 방법을 설명한다. 엑셀 파일 읽고 쓰기, 워드/PDF 저장 등 오피스 문서 자동화로 시작해서, 나아가 웹 브라우저에서 데이터 가져오기, 메일 전송, SNS 게시, 마우스/키보드 조작까지, 일과 삶을 편리하게 해주는 자동화 지식을 담았다. \n\n1장은 파이썬을 설치하고 간단한 코드를 돌려본다. 2장에서는 openpyxl 등으로 엑셀 파일을 열고 데이터를 읽고 쓰는 법, 그리고 셀 서식에 대해서 배운다. 3장은 좀 더 비즈니스 친화적인 내용으로 템플릿 양식 활용, 복수 파일 취합, 그리고 워드(python-docx)나 CSV와 엑셀을 연계하는 방법 등을 살펴본다. \n\n모든 것이 웹으로 이루어지는 오늘날 추세에 맞게, 4장은 뷰티풀 수프(bs4)와 requests를 이용한 웹 크롤링/스크레이핑을 다룬다. HTML/CSS/DOM을 이해하는 것은 물론, 셀레늄과 크롬드라이버로 동적 사이트를 조작하는 방법까지 제대로 배울 수 있다. 5장은 비즈니스에서 빼놓을 수 없는 메일 자동화로 시작한다. 파이썬으로 지메일, 아웃룩, 네이버 메일로 메일을 보내는 방법을 다룬다. 이어서 라인(LINE) 및 트위터 같은 SNS의 API를 이용해 게시물을 올리는 법을 다룬다. \n\n마지막 6장은 업무에 도움이 되는 추가적인 자동화 기술을 다룬다. 간단한 웹 서버 구축(플라스크)과 대화상자를 사용하는 데스크톱 앱 생성(PySimpleGUI)을 다루고, 매크로처럼 마우스와 키보드를 자동화(PyAutoGUI)하는 방법도 살펴본다. 부록으로는 파이썬 문법 핵심을 수록했다. \n\n거의 모든 예제에 대해 윈도우, 리눅스, macOS에서 모두 작동하는 예제 코드를 제공하며, 초심자도 이해할 수 있도록 코드마다 친절한 설명을 달았다. 특히 한국어판에서는 한국 실정에 맞지 않는 원서 예제나 코드를 모두 새롭게 작성하고 테스트했다. 여기에 엑셀 파일 등 실습에 사용할 샘플 데이터를 충분히 제공하므로, 입문자도 실습을 통해 파이썬을 익히고 자신의 업무에 적용할 수 있다. \n\n대상 독자\n■ 프로그래밍으로 즐겁게 업무를 처리하고 싶은 분\n■ 엑셀, 워드, 웹 브라우저 등을 이용하는 사무 관련 업무를 자동화하고 싶은 분\n■ 업무 자동화의 핵심을 알고 싶은 분",
    createAt: "2022/08/01",
  },
  {
    id: 8,
    title: "혼자 공부하는 파이썬 (1:1 과외하듯 배우는 프로그래밍 자습서)",
    image:
      "https://shopping-phinf.pstatic.net/main_3250760/32507605957.20220603093703.jpg",
    author: "윤인성",
    publisher: "한빛미디어",
    pubDate: "2022/06/01",
    isbn: "9791162245651",
    description:
      "『혼자 공부하는 파이썬』이 더욱 흥미있고 알찬 내용으로 개정되었습니다. 프로그래밍이 정말 처음인 입문자도 따라갈 수 있는 친절한 설명과 단계별 학습은 그대로! 혼자 공부하더라도 체계적으로 계획을 세워 학습할 수 있도록 ‘혼공 계획표’를 새롭게 추가했습니다. 또한 입문자가 자주 물어보는 질문과 오류 해결 방법을 적재적소에 배치하여 예상치 못한 문제에 부딪혀도 좌절하지 않고 끝까지 완독할 수 있도록 도와줍니다. 단순한 문법 암기와 코딩 따라하기에 지쳤다면, 새로운 혼공파와 함께 ‘누적 예제’와 ‘도전 문제’로 프로그래밍의 신세계를 경험해 보세요! 배운 내용을 씹고 뜯고 맛보고 즐기다 보면 응용력은 물론 알고리즘 사고력까지 키워 코딩 실력이 쑥쑥 성장할 것입니다.\n\n혼자 해도 충분하다! 1:1 과외하듯 배우는 파이썬 프로그래밍 자습서\n이 책은 독학으로 파이썬을 배우는 입문자가 ‘꼭 필요한 내용을 제대로 학습’할 수 있도록 구성했습니다. 뭘 모르는지조차 모르는 입문자의 막연한 마음에 십분 공감하여 과외 선생님이 알려주듯 친절하게, 핵심적인 내용만 콕콕 집어줍니다. 책의 첫 페이지를 펼쳐서 마지막 페이지를 덮을 때까지, 혼자서도 충분히 파이썬을 배울 수 있다는 자신감과 확신이 계속될 것입니다!\n\n베타리더 검증으로, ‘함께 만든’ 입문자 맞춤형 도서\n베타리더와 함께 입문자에게 맞는 난이도, 분량, 학습 요소 등을 적극 반영했습니다. 어려운 용어와 개념은 한 번 더 풀어쓰고, 복잡한 설명은 눈에 잘 들어오는 그림으로 풀어냈습니다. ‘혼자 공부해 본’ 여러 입문자의 초심과 눈높이가 책 곳곳에 반영된 것이 이 책의 가장 큰 장점입니다.",
    createAt: "2022/08/01",
  },
];

const DUMMY_BOOKS_STUDY_ADD = [
  {
    id: 9,
    title: "초보자를 위한 리액트(React) 200제",
    image:
      "https://shopping-phinf.pstatic.net/main_3246564/32465643915.20220527043132.jpg",
    author: "이정열",
    publisher: "정보문화사",
    pubDate: "2021/02/05",
    isbn: "9788956749013",
    description:
      "따라하면서 이해하는 React A to Z\n\n리액트를 시작하기 전에 개발 환경을 준비하는 과정부터 시작하여 예제 파일을 실행하는 방법을 안내한다. 입문부터 초급, 중급, 활용, 실무까지 5개의 파트로 나누어 단계별로 실력을 향상시킬 수 있게 구성하였다. 리액트에서 사용하는 함수와 문법, 웹 브라우저에 화면을 띄워보기로 시작되는 이 책은 변수를 관리하고 컴포넌트 유형별로 장단점을 비교하고, 태그 사용 및 이벤트 처리 구현도 할 수 있다. 또한 외부 api를 활용하는 부분도 집중적으로 다루고, node.js를 사용하여 DB 서버에서 작업을 수행할 수 있는 실무 능력까지 실습할 수 있다. 예제를 200개로 나누어 간단하게 학습할 수 있기 때문에 짧은 주기로 성취감을 얻을 수 있으며, 기능 위주의 설명으로 필요한 개발 스킬에 집중할 수 있는 장점이 있다. 이 책을 따라 하기 위한 예제 파일은 정보문화사 홈페이지(infopub.co.kr) 자료실에서 다운로드 가능하고, 학습 중 궁금한 사항의 저자 홈페이지(leejungyeoul.tistory.com)에서 피드백 가능하다.",
    createAt: "2022/08/01",
  },
  {
    id: 10,
    title: "한 권으로 배우는 Vue.js 3 (웹 애플리케이션 개발 기초부터 실전까지)",
    image:
      "https://shopping-phinf.pstatic.net/main_3244582/32445823246.20220530092716.jpg",
    author: "김동혁",
    publisher: "영진닷컴",
    pubDate: "2021/09/10",
    isbn: "9788931465792",
    description:
      "Vue.js 3를 활용한 웹 개발 기초부터 실전까지\n\n나만의 멋진 웹사이트를 직접 만들고 싶은 초보 웹 개발자와 기초적인 자바스크립트 지식은 있으나 프론트엔드 개발에서 이를 어떻게 활용해야 할지 막막한 실무 개발자들을 대상으로 하고 있습니다. \n프론트엔드 개발에 필요한 다양한 프레임워크 혹은 라이브러리 중에서, 가장 최근에 공개되어 강력한 기능을 갖췄지만 아직은 대중적이지 않은 Vue.js 3의 최신 기능과 특징들을 자세히 소개합니다. \n기존 Vue.js 사용자가 아니더라도 HTML과 CSS만 어느 정도 알고 있으면 충분히 읽고 이해할 수 있도록 Vue.js 3의 기초적인 문법을 배우고 그 문법을 활용할 수 있는 방법을 차근차근 설명하고 있습니다. \n실제 운용이 가능한 간단한 애플리케이션을 만들어보며 각 구성 요소들을 어떻게 조합하여 재사용성이 높은 코드를 만들 수 있는지 보여주고, 애플리케이션 강화 요소 등 다양한 프론트엔드 개발 노하우를 통해 실무에서도 활용할 수 있도록 구성되어 있습니다. \n후반부에는 이렇게 개발한 애플리케이션을 세상 모든 사람들이 같이 사용할 수 있도록 AWS를 이용하여 배포하는 방법도 담고 있습니다.",
    createAt: "2022/08/01",
  },
  {
    id: 11,
    title:
      "컨테이너 인프라 환경 구축을 위한 쿠버네티스/도커 (컨테이너 인프라 환경을 이해하고 직접 구축해 보자!)",
    image:
      "https://shopping-phinf.pstatic.net/main_3248493/32484930072.20220527050615.jpg",
    author: "조훈,심근우,문성주",
    publisher: "길벗",
    pubDate: "2021/06/07",
    isbn: "9791165215743",
    description:
      "실무에 바로 적용할 수 있는 컨테이너 인프라 환경 기술!\n\nIT 자원을 효율적으로 빠르게 사용할 수 있는 방법으로 컨테이너 환경이 거론되었으나 그동안 관리가 어렵고 복잡해서 상용되기 어려웠다. 하지만 쿠버네티스가 등장하면서 복잡도가 줄어들고 비용 대비 생산성을 높일 수 있게 되었다. 이 책은 현재 컨테이너 오케스트레이션 분야에서 표준으로 자리 잡고 있는 쿠버네티스를 활용해 시스템을 구축하고 운영하는 방법에 초점을 맞춰 구성했다. 컨테이너 인프라 환경 구축부터 통합 및 배포, 인프라 환경 운영을 위한 모니터링까지 쿠버네티스를 기반으로 시스템을 구축하고 운영하는 데 필요한 기초를 탄탄하게 다질 수 있을 것이다.",
    createAt: "2022/08/01",
  },
  {
    id: 12,
    title:
      "그림과 실습으로 배우는 도커 & 쿠버네티스 (개념과 작동 원리가 쏙쏙 이해되는 완벽 입문서)",
    image:
      "https://shopping-phinf.pstatic.net/main_3246352/32463526779.20220527042908.jpg",
    author: "오가사와라 시게타카",
    publisher: "위키북스",
    pubDate: "2022/04/05",
    isbn: "9791158393038",
    description:
      "컨테이너나 도커를 도통 이해하기 어려운 분들을 위한 본격 도커 입문서!\n\n이 책은 컨테이너 기술이 어렵게 느껴지는 엔지니어나 백엔드 기술에 자신이 없는 분들을 위한 도커 입문서입니다. 자세한 그림과 친절한 실습을 통해 리눅스 지식이나 서버 구축 경험이 없어도 컨테이너와 도커, 쿠버네티스에 대한 지식을 쉽게 이해할 수 있습니다.\n\n도커의 개념부터 동작 방식, 명령어 사용법, 컨테이너 운용, 나아가 도커 컴포즈와 쿠버네티스까지, 컨테이너 기술에 대한 배경지식이 전혀 없는 분들도 도커와 쿠버네티스의 개념과 기초 사용법을 익힐 수 있도록 안내합니다. 도커나 쿠버네티스를 배우고 싶은 초보자라면 철저하게 입문자의 눈높이에 맞춘 이 책으로 도커의 세계에 첫발을 내디뎌 보세요.",
    createAt: "2022/08/01",
  },
];

const Home: NextPage = () => {
  // ANCHOR 코드가 길어지니 프리티어가 못생겨짐
  const [latestAddedBook, setLatestAddedBook] = useState<BookDataInterface[]>(
    []
  );

  useEffect(() => {
    // TODO 정렬을 해야 하는데, DB에서 책 정보를 가져올 때, id 순서가 추가된 순서이기 때문에 가장 마지막 값 4개만 가져오면 된다?(순서대로 보내준다면)
    const latest = DUMMY_BOOKS_ADD.slice(-4);
    setLatestAddedBook(latest.reverse());
  }, []);

  const handleBookCardClick = () => {
    // TODO: 책 상세 페이지로 이동
    console.log("BookCard Click!");
  };

  return (
    <S.MainPageWrapper>
      <S.StyledSpan>가장 최근 추가된 책</S.StyledSpan>
      <S.StyledUl>
        {latestAddedBook.map((book) => (
          <S.StyledList key={book.id}>
            <BookCard
              src={book.image}
              title=""
              size={10}
              onClick={handleBookCardClick}
            />
          </S.StyledList>
        ))}
      </S.StyledUl>

      <S.StyledSpan>가장 최근 스터디가 만들어진 책</S.StyledSpan>
      <S.StyledUl>
        {DUMMY_BOOKS_STUDY_ADD.map((book) => (
          <S.StyledList key={book.id}>
            <BookCard
              src={book.image}
              title=""
              size={10}
              onClick={handleBookCardClick}
            />
          </S.StyledList>
        ))}
      </S.StyledUl>
    </S.MainPageWrapper>
  );
};

export default Home;
