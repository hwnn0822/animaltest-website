// src/data/questions.ts

export interface Question {
  id: number;
  text: string;
  index: 'energy' | 'conflict' | 'attachment' | 'boundary';
  scale: {
    left: string;
    right: string;
  };
}

const questions: Question[] = [
  // Q1
  {
    id: 1,
    text: "연인과 처음 만나는 자리를 상상한다면?",
    index: "energy",
    scale: { left: "활기차고\n사람 많은\n핫플레이스", right: "조용하고\n아늑한\n우리만의 공간" }
  },
  // Q2
  {
    id: 2,
    text: "연인과 데이트, 더 선호하는 스타일은?",
    index: "attachment",
    scale: { left: "늘 새로운 곳을\n탐험하는 모험", right: "익숙한\n곳에서\n느끼는\n편안함" }
  },
  // Q3
  {
    id: 3,
    text: "연인이 약속 시간을 어겼을 때, 나의 마음은?",
    index: "conflict",
    scale: { left: '"이유가 뭘까?"\n원인 파악이 우선', right: '"걱정했잖아!"\n내 감정이 우선' }
  },
  // Q4
  {
    id: 4,
    text: "연인에게 '나'는 어떤 존재여야 할까?",
    index: "attachment",
    scale: { left: "세상을\n함께\n헤쳐나갈 '전우'", right: "언제나\n돌아와\n쉴 수 있는 '안식처'" }
  },
  // Q5
  {
    id: 5,
    text: "내 SNS(인스타 등)에 연인 사진을 올리는 것에 대해?",
    index: "boundary",
    scale: { left: "온 세상에\n자랑하고 싶다!", right: "우리 둘만의\n추억으로\n간직하고 싶다." }
  },
  // Q6
  {
    id: 6,
    text: "연인과 있을 때, 나는 주로?",
    index: "energy",
    scale: { left: "나의\n이야기와\n감정을\n쏟아낸다", right: "주로 듣고,\n상대의\n말을 관찰한다" }
  },
  // Q7
  {
    id: 7,
    text: '"나 너한테 서운해"라는 말을 들어야 한다면, 더 나은 상황은?',
    index: "conflict",
    scale: { left: "사소한\n거라도\n쌓아두지 않고\n바로 말해주는 것", right: "웬만하면\n이해하고\n넘어가\n주는 것" }
  },
  // Q8
  {
    id: 8,
    text: "연인이 나와의 약속이 없는 주말에 장시간 연락이 안 된다면?",
    index: "boundary",
    scale: { left: '"무슨 일 있나?"\n불안하고 서운하다', right: '"잘 놀고 있구나"\n나도\n내 시간을 즐긴다' }
  },
  // Q9
  {
    id: 9,
    text: "내 연애는 OOO에 가깝다.",
    index: "attachment",
    scale: { left: "한 편의\n예측불허 드라마", right: "잔잔하고 따뜻한\n일상 기록" }
  },
  // Q10
  {
    id: 10,
    text: "사랑을 확인할 때 더 중요한 것은?",
    index: "energy",
    scale: { left: "가슴 뛰는\n'설렘'의\n순간들", right: "흔들림 없는\n'믿음'의\n시간들" }
  },
  // Q11
  {
    id: 11,
    text: "연인과 나의 관계는?",
    index: "boundary",
    scale: { left: "퍼즐처럼\n딱 맞는\n'하나'", right: "서로를\n존중하는\n'두 사람'" }
  },
  // Q12
  {
    id: 12,
    text: "내 연애의 가장 큰 적(위기)은 OOO이다.",
    index: "conflict",
    scale: { left: "권태기,\n익숙함에서 오는\n지루함", right: "불신,\n사소한\n오해에서 오는 다툼" }
  }
];

export default questions;