import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Tabs, 
  Tab, 
  Typography,
  Container
} from '@mui/material';
import CodeEditor from './CodeEditor';

const UseEffectCodeEditor = () => {
  const [activeTab, setActiveTab] = useState(0);

  const codeExamples = [
    {
      title: "기본 useEffect",
      description: "컴포넌트가 마운트될 때 실행되는 기본 useEffect입니다.",
      code: `// 기본 useEffect - 컴포넌트 마운트 시 실행
function MyComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('컴포넌트가 마운트되었습니다!');
    console.log('현재 count:', count);
  }, []); // 빈 배열 = 마운트 시에만 실행
  
  return null; // 실제 컴포넌트에서는 JSX 반환
}

// 컴포넌트 시뮬레이션
MyComponent();`
    },
    {
      title: "의존성 배열이 있는 useEffect",
      description: "특정 값이 변경될 때만 실행되는 useEffect입니다.",
      code: `// 의존성 배열이 있는 useEffect
function CounterComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  
  useEffect(() => {
    console.log('count가 변경되었습니다:', count);
    
    // count가 5 이상이면 알림
    if (count >= 5) {
      console.log('카운트가 5 이상입니다!');
    }
  }, [count]); // count가 변경될 때만 실행
  
  // count 변경 시뮬레이션
  setCount(1);
  setCount(3);
  setCount(5);
  setName('Vue'); // 이것은 useEffect를 실행시키지 않음
}

CounterComponent();`
    },
    {
      title: "정리(cleanup) 함수가 있는 useEffect",
      description: "정리 함수를 반환하는 useEffect입니다.",
      code: `// 정리 함수가 있는 useEffect
function TimerComponent() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    console.log('타이머를 시작합니다');
    
    const interval = setInterval(() => {
      console.log('1초가 지났습니다');
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // 정리 함수 반환
    return () => {
      console.log('타이머를 정리합니다');
      clearInterval(interval);
    };
  }, []); // 빈 배열 = 마운트/언마운트 시에만
  
  console.log('현재 seconds:', seconds);
}

// 컴포넌트 시뮬레이션
TimerComponent();`
    },
    {
      title: "여러 useEffect 사용",
      description: "하나의 컴포넌트에서 여러 useEffect를 사용하는 예제입니다.",
      code: `// 여러 useEffect 사용
function MultiEffectComponent() {
  const [user, setUser] = useState({ id: 1, name: 'Alice' });
  const [theme, setTheme] = useState('light');
  const [data, setData] = useState(null);
  
  // 첫 번째 useEffect: 사용자 정보 변경 감지
  useEffect(() => {
    console.log('사용자 정보가 변경되었습니다:', user.name);
    console.log('사용자 ID:', user.id);
  }, [user]);
  
  // 두 번째 useEffect: 테마 변경 감지  
  useEffect(() => {
    console.log('테마가 변경되었습니다:', theme);
    document.body.style.backgroundColor = theme === 'dark' ? '#333' : '#fff';
  }, [theme]);
  
  // 세 번째 useEffect: 초기 데이터 로딩
  useEffect(() => {
    console.log('초기 데이터를 로딩합니다...');
    // API 호출 시뮬레이션
    setTimeout(() => {
      setData('로딩 완료된 데이터');
      console.log('데이터 로딩 완료!');
    }, 1000);
  }, []); // 마운트 시에만 실행
  
  // 상태 변경 시뮬레이션
  setUser({ id: 2, name: 'Bob' });
  setTheme('dark');
}

MultiEffectComponent();`
    },
    {
      title: "useEffect 잘못된 사용법",
      description: "흔히 발생하는 useEffect 사용 실수들을 보여주는 예제입니다.",
      code: `// ❌ 잘못된 useEffect 사용법들

function BadEffectComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  
  // ❌ 실수 1: 의존성 배열 누락으로 무한 루프
  // useEffect(() => {
  //   console.log('이것은 무한 루프를 만듭니다!');
  //   setCount(count + 1); // 매번 재렌더링 발생
  // }); // 의존성 배열이 없음!
  
  // ✅ 올바른 방법 1: 의존성 배열 추가
  useEffect(() => {
    console.log('count 변경:', count);
  }, [count]);
  
  // ❌ 실수 2: 의존성 누락
  // useEffect(() => {
  //   console.log('count:', count); // count 사용하지만 의존성에 없음
  // }, []); // count가 의존성에 없음!
  
  // ✅ 올바른 방법 2: 모든 의존성 포함
  useEffect(() => {
    console.log('현재 count:', count);
    console.log('items 길이:', items.length);
  }, [count, items]); // 사용하는 모든 값을 의존성에 포함
  
  // ❌ 실수 3: 조건부로 useEffect 호출
  // if (count > 5) {
  //   useEffect(() => {  // Hook은 항상 같은 순서로 호출되어야 함!
  //     console.log('이것은 React 규칙 위반입니다!');
  //   }, []);
  // }
  
  console.log('컴포넌트 렌더링 완료');
}

BadEffectComponent();`
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        🔄 useEffect 코드 편집기
      </Typography>
      
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        실제 코드를 수정하고 실행하면서 useEffect를 학습하세요!
      </Typography>

      <Paper elevation={2} sx={{ width: '100%' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {codeExamples.map((example, index) => (
            <Tab 
              key={index}
              label={example.title} 
              sx={{ minWidth: 120 }}
            />
          ))}
        </Tabs>

        <Box sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {codeExamples[activeTab].description}
          </Typography>
          
          <CodeEditor
            title={codeExamples[activeTab].title}
            initialCode={codeExamples[activeTab].code}
            language="javascript"
            height={500}
          />
        </Box>
      </Paper>

      <Paper elevation={1} sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          💡 useEffect 사용 팁
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <li>의존성 배열을 정확히 명시하세요</li>
          <li>정리 함수가 필요한 경우 반드시 반환하세요</li>
          <li>무한 루프를 방지하기 위해 의존성을 신중히 선택하세요</li>
          <li>Hook은 항상 컴포넌트 최상위에서 호출하세요</li>
          <li>하나의 관심사마다 별도의 useEffect를 사용하세요</li>
        </Box>
      </Paper>
    </Container>
  );
};

export default UseEffectCodeEditor;