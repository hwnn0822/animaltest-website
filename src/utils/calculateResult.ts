// src/utils/calculateResult.ts
import questions from '@/data/questions';

// 각 축의 타입을 명시
type IndexType = 'energy' | 'conflict' | 'attachment' | 'boundary';

// 각 동물의 고유 공식 (Vector)
const animalVectors: Record<string, Record<IndexType, number>> = {
  dog: { energy: -3, conflict: 4, attachment: 4, boundary: -4 },
  cat: { energy: 4, conflict: -4, attachment: -4, boundary: 4 },
  rabbit: { energy: 2, conflict: 4, attachment: 4, boundary: -4 },
  fox: { energy: -4, conflict: -4, attachment: -4, boundary: 4 },
  bear: { energy: 4, conflict: 4, attachment: 4, boundary: 2 },
  deer: { energy: 4, conflict: 4, attachment: 4, boundary: 2 }, // 곰과 유사하게 설정, 미세조정 가능
  wolf: { energy: -4, conflict: -4, attachment: -4, boundary: 4 }, // 여우와 유사
  parrot: { energy: -4, conflict: -2, attachment: -4, boundary: -4 },
};

// 5점 척도를 점수로 변환하는 맵
const scoreMap: Record<number, number> = {
  1: -2,
  2: -1,
  3: 0,
  4: 1,
  5: 2,
};

// 메인 계산 함수
export function calculateResult(answers: number[]): string {
  // 1. 최종 축 점수 계산
  const finalScores: Record<IndexType, number> = {
    energy: 0,
    conflict: 0,
    attachment: 0,
    boundary: 0,
  };

  answers.forEach((answer, i) => {
    const question = questions[i];
    const score = scoreMap[answer] || 0;
    const index = question.index;

    // 왼쪽 선택지(1, 2)는 점수를 빼고, 오른쪽 선택지(4, 5)는 더함
    // 질문의 방향성을 고려하여 점수를 반전시킬 필요가 없음 (이미 척도에 반영됨)
    finalScores[index] += score;
  });

  // 2. 가장 가까운 동물 찾기 (맨해튼 거리)
  let closestAnimal = '';
  let minDistance = Infinity;

  for (const animal in animalVectors) {
    const vector = animalVectors[animal];
    let distance = 0;
    distance += Math.abs(finalScores.energy - vector.energy);
    distance += Math.abs(finalScores.conflict - vector.conflict);
    distance += Math.abs(finalScores.attachment - vector.attachment);
    distance += Math.abs(finalScores.boundary - vector.boundary);

    if (distance < minDistance) {
      minDistance = distance;
      closestAnimal = animal;
    }
    // 동점자 처리: 이 부분에 우선순위나 2차 판별 로직을 추가할 수 있음.
    // 현재는 먼저 계산된 동물이 선택됨.
  }
  
  return closestAnimal;
}


// 결과 페이지에서 사용할 동물 정보
export const animalInfo: Record<
  string,
  {
    title: string;
    description: string;
    pros: string[];
    cons: string[];
    bestMatch: string;
    worstMatch: string;
    bestMatchReason: string;
    worstMatchReason: string;
  }
> = {
  dog: {
    title: '사랑 넘치는 댕댕이',
    description:
      '언제나 연인 곁을 지키는 당신은 다정한 댕댕이! 애정 표현도 풍부하고, 연인과 함께하는 모든 순간을 소중히 여겨요. 가끔은 혼자만의 시간도 필요하다는 걸 잊지 마세요!',
    pros: ['헌신적이고 다정함', '애정 표현이 풍부함', '연인에게 안정감을 줌'],
    cons: ['가끔 과도한 의존성', '혼자만의 시간을 갖기 어려워함', '질투심이 생길 수 있음'],
    bestMatch: '고독한 늑대 (Wolf)',
    worstMatch: '밀당 고수 냥냥이 (Cat)',
    bestMatchReason:
      '댕댕이의 무한한 애정과 헌신은 고독한 늑대의 내면의 외로움을 따뜻하게 채워줄 수 있습니다. 늑대는 댕댕이의 사랑을 통해 안정감을 느끼고, 세상에 대한 긍정적인 시각을 갖게 될 것입니다. 서로의 부족한 부분을 채워주는 완벽한 파트너입니다.',
    worstMatchReason:
      '댕댕이의 직진적인 애정 표현은 냥냥이에게 부담으로 다가올 수 있습니다. 냥냥이는 자신만의 공간과 시간을 중요하게 생각하기에, 댕댕이의 끊임없는 관심이 때로는 구속으로 느껴질 수 있습니다. 서로의 애정 표현 방식을 이해하는 데 많은 노력이 필요합니다.',
  },
  cat: {
    title: '밀당 고수 냥냥이',
    description:
      '알 수 없는 매력으로 연인을 사로잡는 당신은 고양이! 독립적이면서도 은근한 애정 표현으로 연애의 고수가 될 수 있어요. 가끔은 솔직한 마음을 보여주는 것도 좋답니다.',
    pros: ['독립적이고 자유로움', '신비로운 매력으로 연인을 사로잡음', '개인의 공간을 존중함'],
    cons: ['가끔 차갑게 느껴질 수 있음', '속마음을 잘 드러내지 않음', '연인에게 소홀해질 수 있음'],
    bestMatch: '사랑 넘치는 댕댕이 (Dog)',
    worstMatch: '애교 만점 토깽이 (Rabbit)',
    bestMatchReason:
      '냥냥이의 독립적인 성향은 댕댕이에게 새로운 세상을 열어줄 수 있습니다. 댕댕이는 냥냥이를 통해 혼자만의 시간을 즐기는 법을 배우고, 냥냥이는 댕댕이의 꾸준한 사랑을 통해 관계의 안정감을 느낄 수 있습니다. 서로에게 좋은 자극이 되는 관계입니다.',
    worstMatchReason:
      '토깽이의 넘치는 애교와 감정 표현은 냥냥이에게 피곤함을 안겨줄 수 있습니다. 냥냥이는 조용하고 안정적인 관계를 선호하기에, 토깽이의 활발함이 때로는 부담스럽게 느껴질 수 있습니다. 감정의 온도 차이를 극복하기 어려운 관계입니다.',
  },
  rabbit: {
    title: '애교 만점 토깽이',
    description:
      '귀여운 애교로 연인의 마음을 녹이는 당신은 토끼! 사랑스러운 매력으로 연애에 활기를 불어넣지만, 가끔은 진지한 대화로 관계의 깊이를 더해보세요.',
    pros: ['사랑스럽고 애교가 많음', '긍정적인 에너지로 관계를 밝게 함', '연인에게 즐거움을 줌'],
    cons: ['갈등 회피 경향', '감정 기복이 있을 수 있음', '가끔은 진지함이 부족할 수 있음'],
    bestMatch: '듬직한 큰 곰 (Bear)',
    worstMatch: '센스쟁이 여우 (Fox)',
    bestMatchReason:
      '토깽이의 발랄함과 사랑스러움은 듬직한 곰에게 큰 활력소가 됩니다. 곰은 토깽이의 애교를 통해 웃음을 되찾고, 토깽이는 곰의 든든함 속에서 안정감을 느낍니다. 서로의 장점을 극대화하는 이상적인 조합입니다.',
    worstMatchReason:
      '여우의 계산적이고 냉정한 면모는 순수한 토깽이에게 상처를 줄 수 있습니다. 토깽이는 여우의 날카로운 분석과 비판에 위축될 수 있으며, 여우는 토깽이의 감정적인 반응을 이해하기 어려워합니다. 서로 다른 가치관으로 인해 갈등이 잦을 수 있습니다.',
  },
  fox: {
    title: '센스쟁이 여우',
    description:
      '뛰어난 센스와 지혜로 연애를 리드하는 당신은 여우! 연인에게 늘 새로운 영감을 주지만, 가끔은 모든 것을 통제하려는 마음을 내려놓고 순간을 즐겨보세요.',
    pros: ['지혜롭고 센스 있음', '연애를 주도적으로 이끌어감', '상대방에게 새로운 경험을 제공함'],
    cons: ['계산적인 면모가 있을 수 있음', '가끔은 냉정하게 느껴질 수 있음', '상대방의 감정을 간과할 수 있음'],
    bestMatch: '온화한 사슴 (Deer)',
    worstMatch: '애교 만점 토깽이 (Rabbit)',
    bestMatchReason:
      '여우의 지혜와 사슴의 온화함은 서로에게 완벽한 균형을 제공합니다. 여우는 사슴의 따뜻한 마음을 통해 정서적 안정을 얻고, 사슴은 여우의 지적인 매력에 끌립니다. 서로를 존중하며 함께 성장하는 아름다운 관계입니다.',
    worstMatchReason:
      '여우의 이성적인 접근 방식은 감성적인 토깽이와 충돌할 수 있습니다. 여우는 토깽이의 풍부한 감정 표현을 논리적으로 이해하기 어려워하며, 토깽이는 여우의 냉정함에 상처받을 수 있습니다. 관계의 주도권을 두고 다툼이 발생할 수 있습니다.',
  },
  bear: {
    title: '듬직한 큰 곰',
    description:
      '넓은 마음으로 연인을 포용하는 당신은 곰! 든든한 매력으로 안정적인 연애를 이끌지만, 가끔은 자신의 감정도 솔직하게 표현하는 용기가 필요해요.',
    pros: ['든든하고 안정적임', '상대방을 잘 포용함', '신뢰를 주는 관계를 만듦'],
    cons: ['감정 표현에 서툴 수 있음', '가끔은 답답하게 느껴질 수 있음', '변화에 대한 거부감이 있을 수 있음'],
    bestMatch: '애교 만점 토깽이 (Rabbit)',
    worstMatch: '고독한 늑대 (Wolf)',
    bestMatchReason:
      '곰의 든든함과 포용력은 토깽이에게 최고의 안정감을 선사합니다. 토깽이는 곰의 품 안에서 마음껏 뛰어놀 수 있으며, 곰은 토깽이의 밝은 에너지로부터 삶의 활력을 얻습니다. 서로에게 편안한 안식처가 되어주는 관계입니다.',
    worstMatchReason:
      '곰의 안정 지향적인 성향은 자유로운 영혼인 늑대에게 답답함을 줄 수 있습니다. 늑대는 새로운 자극과 도전을 추구하기에, 곰의 예측 가능한 패턴에 싫증을 느낄 수 있습니다. 서로의 라이프스타일을 존중하기 어려운 관계입니다.',
  },
  deer: {
    title: '온화한 사슴',
    description:
      '따뜻하고 온화한 마음으로 연인을 대하는 당신은 사슴! 평화로운 연애를 지향하지만, 갈등을 피하기만 하는 것은 정답이 아닐 수 있어요. 용기를 내어 마음을 열어보세요.',
    pros: ['온화하고 배려심 깊음', '평화로운 관계를 지향함', '상대방의 감정을 잘 헤아림'],
    cons: ['갈등 회피 경향', '자신의 의견을 잘 표현하지 못함', '우유부단하게 보일 수 있음'],
    bestMatch: '센스쟁이 여우 (Fox)',
    worstMatch: '수다쟁이 앵무새 (Parrot)',
    bestMatchReason:
      '사슴의 따뜻한 공감 능력은 여우의 날카로운 지성과 완벽한 조화를 이룹니다. 여우는 사슴의 이해심 깊은 태도에 마음을 열고, 사슴은 여우의 명쾌한 조언을 통해 자신감을 얻습니다. 서로의 잠재력을 끌어내는 시너지 효과를 기대할 수 있습니다.',
    worstMatchReason:
      '사슴의 조용하고 평화로운 성향은 앵무새의 끊임없는 수다와 활발함에 지칠 수 있습니다. 앵무새는 사슴의 침묵을 이해하기 어려워하며, 사슴은 앵무새의 소란스러움에 스트레스를 받을 수 있습니다. 에너지 레벨의 차이가 큰 관계입니다.',
  },
  wolf: {
    title: '고독한 늑대',
    description:
      '강인한 독립심과 자신만의 세계를 가진 당신은 늑대! 혼자만의 시간을 중요하게 생각하지만, 연인과의 유대감을 통해 더 큰 세상을 경험할 수 있다는 걸 기억하세요.',
    pros: ['독립적이고 강인함', '자신만의 확고한 가치관', '연인에게 새로운 시각을 제공함'],
    cons: ['외로움을 느낄 수 있음', '가끔은 고집스러움', '연인에게 마음을 열기 어려워함'],
    bestMatch: '사랑 넘치는 댕댕이 (Dog)',
    worstMatch: '듬직한 큰 곰 (Bear)',
    bestMatchReason:
      '늑대의 고독한 내면은 댕댕이의 무조건적인 사랑으로 치유받을 수 있습니다. 댕댕이는 늑대의 독립성을 존중하면서도 따뜻한 애정을 표현하며, 늑대는 댕댕이를 통해 세상과 소통하는 법을 배웁니다. 서로의 세계를 넓혀주는 이상적인 파트너입니다.',
    worstMatchReason:
      '늑대의 자유로운 영혼은 안정적인 관계를 추구하는 곰과 충돌할 수 있습니다. 곰은 늑대의 예측 불가능한 행동에 불안을 느끼고, 늑대는 곰의 틀에 박힌 생활에 답답함을 느낍니다. 서로의 가치관 차이가 큰 관계입니다.',
  },
  parrot: {
    title: '수다쟁이 앵무새',
    description:
      '즐거운 대화로 연애에 활기를 불어넣는 당신은 앵무새! 재치 있는 입담으로 항상 즐거운 분위기를 만들지만, 가끔은 말보다 행동으로 사랑을 보여주는 것도 중요해요.',
    pros: ['활발하고 사교적임', '대화로 관계를 풍부하게 함', '긍정적인 분위기를 만듦'],
    cons: ['가끔은 말이 너무 많음', '진지한 대화를 어려워할 수 있음', '충동적인 행동을 할 수 있음'],
    bestMatch: '온화한 사슴 (Deer)',
    worstMatch: '고독한 늑대 (Wolf)',
    bestMatchReason:
      '앵무새의 재치와 활기는 온화한 사슴에게 즐거운 자극을 줍니다. 사슴은 앵무새와의 대화를 통해 새로운 세상을 경험하고, 앵무새는 사슴의 차분함 속에서 안정감을 찾습니다. 서로에게 긍정적인 영향을 주는 유쾌한 관계입니다.',
    worstMatchReason:
      '앵무새의 가벼운 접근 방식은 진지하고 깊이 있는 관계를 원하는 늑대와 맞지 않을 수 있습니다. 늑대는 앵무새의 끊임없는 수다에 피로를 느끼고, 앵무새는 늑대의 과묵함에 상처받을 수 있습니다. 소통 방식의 차이로 인해 오해가 쌓일 수 있습니다.',
  },
};

