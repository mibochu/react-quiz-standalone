import { useState } from 'react';

// 연산자 연습 문제를 위한 인터랙티브 컴포넌트
const OperatorPractice = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // 연습 문제들
  const questions = [
    {
      id: 1,
      title: "삼항 연산자",
      question: "const result = 5 > 3 ? 'true' : 'false'; 의 결과는?",
      options: ["true", "false", "undefined", "error"],
      correct: "true",
      explanation: "5는 3보다 크므로 조건이 참이어서 'true'가 반환됩니다."
    },
    {
      id: 2,
      title: "논리 AND 연산자",
      question: "React에서 {user && <Welcome />}에서 user가 null이면?",
      options: ["Welcome 컴포넌트가 렌더링됨", "아무것도 렌더링 안됨", "에러 발생", "undefined 출력"],
      correct: "아무것도 렌더링 안됨",
      explanation: "user가 null(falsy)이므로 && 연산자는 false를 반환하고 아무것도 렌더링되지 않습니다."
    },
    {
      id: 3,
      title: "논리 OR 연산자",
      question: "const name = '' || 'Anonymous'; 의 결과는?",
      options: ["''", "'Anonymous'", "null", "undefined"],
      correct: "'Anonymous'",
      explanation: "빈 문자열 ''는 falsy 값이므로 || 연산자는 두 번째 값인 'Anonymous'를 반환합니다."
    },
    {
      id: 4,
      title: "Nullish Coalescing",
      question: "const value = 0 ?? 'default'; 의 결과는?",
      options: ["0", "'default'", "null", "undefined"],
      correct: "0",
      explanation: "0은 falsy이지만 null이나 undefined가 아니므로 ?? 연산자는 0을 반환합니다."
    },
    {
      id: 5,
      title: "Optional Chaining",
      question: "user.profile?.address?.street에서 profile이 null이면?",
      options: ["에러 발생", "undefined", "null", "''"],
      correct: "undefined",
      explanation: "Optional chaining은 중간에 null이나 undefined를 만나면 undefined를 반환합니다."
    },
    {
      id: 6,
      title: "스프레드 연산자",
      question: "const arr = [1, 2]; const newArr = [...arr, 3]; 의 newArr는?",
      options: ["[1, 2, 3]", "[1, 2]", "[[1, 2], 3]", "에러"],
      correct: "[1, 2, 3]",
      explanation: "스프레드 연산자로 기존 배열을 펼치고 새 요소를 추가합니다."
    },
    {
      id: 7,
      title: "구조 분해 할당",
      question: "const {name, age = 20} = {name: 'John'}; age의 값은?",
      options: ["undefined", "20", "'John'", "에러"],
      correct: "20",
      explanation: "객체에 age 프로퍼티가 없으므로 기본값 20이 사용됩니다."
    },
    {
      id: 8,
      title: "배열 map()",
      question: "[1, 2, 3].map(x => x * 2)의 결과는?",
      options: ["[1, 2, 3]", "[2, 4, 6]", "6", "[1, 4, 9]"],
      correct: "[2, 4, 6]",
      explanation: "map은 각 요소에 2를 곱한 새로운 배열을 반환합니다."
    },
    {
      id: 9,
      title: "배열 filter()",
      question: "[1, 2, 3, 4].filter(x => x > 2)의 결과는?",
      options: ["[3, 4]", "[1, 2]", "4", "[1, 2, 3, 4]"],
      correct: "[3, 4]",
      explanation: "filter는 조건(x > 2)을 만족하는 요소들로 새 배열을 만듭니다."
    },
    {
      id: 10,
      title: "템플릿 리터럴",
      question: "const name = 'World'; `Hello ${name}!`의 결과는?",
      options: ["'Hello World!'", "'Hello ${name}!'", "'Hello' + name + '!'", "에러"],
      correct: "'Hello World!'",
      explanation: "템플릿 리터럴에서 ${} 안의 변수가 문자열로 삽입됩니다."
    }
  ];

  const currentQ = questions[currentQuestion];

  const handleAnswer = (answer) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: answer
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px' }}>
        <h1>퀴즈 결과</h1>
        <h2>점수: {score}/{questions.length} ({Math.round(score/questions.length*100)}%)</h2>
        
        <div style={{ marginTop: '30px' }}>
          <h3>상세 결과:</h3>
          {questions.map((q, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === q.correct;
            
            return (
              <div key={q.id} style={{ 
                margin: '20px 0', 
                padding: '15px', 
                border: `2px solid ${isCorrect ? 'green' : 'red'}`,
                backgroundColor: isCorrect ? '#f0fff0' : '#fff0f0'
              }}>
                <h4>{q.title}</h4>
                <p><strong>문제:</strong> {q.question}</p>
                <p><strong>당신의 답:</strong> <span style={{color: isCorrect ? 'green' : 'red'}}>{userAnswer || '답안 없음'}</span></p>
                <p><strong>정답:</strong> <span style={{color: 'green'}}>{q.correct}</span></p>
                <p><strong>설명:</strong> {q.explanation}</p>
              </div>
            );
          })}
        </div>
        
        <button 
          onClick={resetQuiz}
          style={{ 
            padding: '10px 20px', 
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          다시 풀기
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px' }}>
      <h1>React 연산자 퀴즈</h1>
      <div style={{ marginBottom: '20px' }}>
        <span>문제 {currentQuestion + 1} / {questions.length}</span>
        <div style={{ 
          width: '100%', 
          height: '10px', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '5px',
          marginTop: '10px'
        }}>
          <div style={{ 
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            height: '100%',
            backgroundColor: '#007bff',
            borderRadius: '5px'
          }}></div>
        </div>
      </div>

      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '10px', 
        padding: '30px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>{currentQ.title}</h2>
        <h3 style={{ marginBottom: '30px' }}>{currentQ.question}</h3>
        
        <div style={{ marginBottom: '30px' }}>
          {currentQ.options.map((option, index) => (
            <label key={index} style={{ 
              display: 'block', 
              margin: '10px 0',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              backgroundColor: userAnswers[currentQuestion] === option ? '#e3f2fd' : 'white'
            }}>
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={userAnswers[currentQuestion] === option}
                onChange={(e) => handleAnswer(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              {option}
            </label>
          ))}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button 
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            style={{ 
              padding: '10px 20px',
              backgroundColor: currentQuestion === 0 ? '#ccc' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            이전
          </button>
          
          <button 
            onClick={nextQuestion}
            disabled={!userAnswers[currentQuestion]}
            style={{ 
              padding: '10px 20px',
              backgroundColor: !userAnswers[currentQuestion] ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: !userAnswers[currentQuestion] ? 'not-allowed' : 'pointer'
            }}
          >
            {currentQuestion === questions.length - 1 ? '결과 보기' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperatorPractice;