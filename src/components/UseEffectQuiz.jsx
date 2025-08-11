import { useState, useEffect } from 'react';

// useEffect 학습을 위한 10개 컴포넌트
// 각 컴포넌트는 학습자가 직접 useEffect를 구현해야 함

// 1. 기본 useEffect - 문서 제목 변경
const BasicEffect = () => {
  const [count, setCount] = useState(0);

  // TODO: count가 변할 때마다 document.title을 'Count: N'으로 변경
  // TODO: 컴포넌트 언마운트 시 'MoneyNote'로 복원

  return (
    <div>
      <h3>1. 기본 useEffect</h3>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <p><small>브라우저 탭 제목이 변경됩니다</small></p>
    </div>
  );
};

// 2. 마운트 시 한 번만 실행
const MountOnlyEffect = () => {
  const [data, setData] = useState('로딩중...');

  // TODO: 컴포넌트 마운트 시 1초 후 '데이터 로드 완료!'로 변경
  // TODO: 빈 의존성 배열 사용

  return (
    <div>
      <h3>2. 마운트 시 한 번만 실행</h3>
      <p>{data}</p>
    </div>
  );
};

// 3. 조건부 useEffect
const ConditionalEffect = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkStatus, setNetworkStatus] = useState('확인 중...');

  // TODO: isOnline 상태에 따라 이벤트 리스너 등록/해제
  // TODO: 상태에 따라 networkStatus 메시지 변경

  return (
    <div>
      <h3>3. 조건부 useEffect</h3>
      <p>네트워크: {networkStatus}</p>
      <button onClick={() => setIsOnline(!isOnline)}>
        상태 토글 (테스트용)
      </button>
    </div>
  );
};

// 4. 타이머 useEffect
const TimerEffect = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // TODO: isRunning이 true일 때 1초마다 seconds 증가
  // TODO: 클린업 함수로 interval 정리

  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h3>4. 타이머 useEffect</h3>
      <p>경과 시간: {seconds}초</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '정지' : '시작'}
      </button>
      <button onClick={reset}>리셋</button>
    </div>
  );
};

// 5. 이벤트 리스너 useEffect
const EventListenerEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(false);

  // TODO: isTracking이 true일 때 mousemove 이벤트 리스너 등록
  // TODO: 마우스 위치를 mousePosition에 저장
  // TODO: 컴포넌트 언마운트 시 이벤트 리스너 제거

  return (
    <div>
      <h3>5. 이벤트 리스너 useEffect</h3>
      <button onClick={() => setIsTracking(!isTracking)}>
        {isTracking ? '추적 중지' : '마우스 추적 시작'}
      </button>
      {isTracking && (
        <p>마우스 위치: ({mousePosition.x}, {mousePosition.y})</p>
      )}
    </div>
  );
};

// 6. 로컬스토리지 동기화 useEffect
const LocalStorageEffect = () => {
  const [name, setName] = useState('');

  // TODO: 컴포넌트 마운트 시 localStorage에서 'userName' 읽어오기
  // TODO: name이 변경될 때마다 localStorage에 저장

  return (
    <div>
      <h3>6. 로컬스토리지 동기화</h3>
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <p>저장된 이름: {name}</p>
      <p><small>브라우저를 새로고침해도 값이 유지됩니다</small></p>
    </div>
  );
};

// 7. API 호출 useEffect
const ApiCallEffect = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // TODO: 컴포넌트 마운트 시 API 호출
  // TODO: https://jsonplaceholder.typicode.com/users?_limit=3
  // TODO: 로딩, 에러 상태 관리

  const fetchUsers = () => {
    // TODO: 여기에 API 호출 로직 구현
  };

  return (
    <div>
      <h3>7. API 호출 useEffect</h3>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? '로딩중...' : '사용자 목록 새로고침'}
      </button>
      
      {error && <p style={{ color: 'red' }}>에러: {error}</p>}
      
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

// 8. 윈도우 크기 추적 useEffect
const WindowSizeEffect = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // TODO: resize 이벤트 리스너 등록
  // TODO: 윈도우 크기 변경 시 windowSize 업데이트
  // TODO: 컴포넌트 언마운트 시 이벤트 리스너 제거

  return (
    <div>
      <h3>8. 윈도우 크기 추적</h3>
      <p>윈도우 크기: {windowSize.width} x {windowSize.height}</p>
      <p><small>윈도우 크기를 조절해보세요</small></p>
    </div>
  );
};

// 9. 페이지 가시성 추적 useEffect
const VisibilityEffect = () => {
  const [isVisible, setIsVisible] = useState(!document.hidden);
  const [visitCount, setVisitCount] = useState(0);

  // TODO: visibilitychange 이벤트 리스너 등록
  // TODO: 페이지가 보일 때마다 visitCount 증가
  // TODO: 컴포넌트 언마운트 시 이벤트 리스너 제거

  return (
    <div>
      <h3>9. 페이지 가시성 추적</h3>
      <p>페이지 상태: {isVisible ? '보임' : '숨김'}</p>
      <p>탭 방문 횟수: {visitCount}</p>
      <p><small>다른 탭으로 이동했다가 돌아와보세요</small></p>
    </div>
  );
};

// 10. 복잡한 상태 동기화 useEffect
const ComplexSyncEffect = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'ko',
    notifications: true
  });
  const [syncStatus, setSyncStatus] = useState('동기화됨');

  // TODO: settings가 변경될 때마다 로컬스토리지에 저장
  // TODO: 저장 중에는 syncStatus를 '동기화 중...'으로 표시
  // TODO: 500ms 후 '동기화됨'으로 변경

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <h3>10. 복잡한 상태 동기화</h3>
      <p>동기화 상태: {syncStatus}</p>
      
      <div>
        <label>
          테마: 
          <select 
            value={settings.theme} 
            onChange={(e) => updateSetting('theme', e.target.value)}
          >
            <option value="light">라이트</option>
            <option value="dark">다크</option>
          </select>
        </label>
      </div>
      
      <div>
        <label>
          언어: 
          <select 
            value={settings.language} 
            onChange={(e) => updateSetting('language', e.target.value)}
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>
      
      <div>
        <label>
          <input 
            type="checkbox" 
            checked={settings.notifications}
            onChange={(e) => updateSetting('notifications', e.target.checked)}
          />
          알림 허용
        </label>
      </div>
      
      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </div>
  );
};

// 메인 학습 컴포넌트
const UseEffectQuiz = () => {
  const [currentExample, setCurrentExample] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const examples = [
    { name: '기본 useEffect', component: BasicEffect },
    { name: '마운트 시 한 번만', component: MountOnlyEffect },
    { name: '조건부 Effect', component: ConditionalEffect },
    { name: '타이머 Effect', component: TimerEffect },
    { name: '이벤트 리스너', component: EventListenerEffect },
    { name: '로컬스토리지 동기화', component: LocalStorageEffect },
    { name: 'API 호출', component: ApiCallEffect },
    { name: '윈도우 크기 추적', component: WindowSizeEffect },
    { name: '페이지 가시성', component: VisibilityEffect },
    { name: '복잡한 상태 동기화', component: ComplexSyncEffect }
  ];

  const CurrentExample = examples[currentExample].component;

  const solutions = {
    0: `// 1. 기본 useEffect 해답
useEffect(() => {
  document.title = \`Count: \${count}\`;
  
  return () => {
    document.title = 'MoneyNote';
  };
}, [count]);`,

    1: `// 2. 마운트 시 한 번만 해답
useEffect(() => {
  const timer = setTimeout(() => {
    setData('데이터 로드 완료!');
  }, 1000);

  return () => clearTimeout(timer);
}, []);`,

    2: `// 3. 조건부 Effect 해답
useEffect(() => {
  const handleOnline = () => {
    setIsOnline(true);
    setNetworkStatus('온라인 상태입니다');
  };

  const handleOffline = () => {
    setIsOnline(false);
    setNetworkStatus('오프라인 상태입니다');
  };

  if (isOnline) {
    window.addEventListener('offline', handleOffline);
    setNetworkStatus('온라인 상태입니다');
  } else {
    window.addEventListener('online', handleOnline);
    setNetworkStatus('오프라인 상태입니다');
  }

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}, [isOnline]);`,

    3: `// 4. 타이머 Effect 해답
useEffect(() => {
  let intervalId = null;

  if (isRunning) {
    intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  }

  return () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
}, [isRunning]);`,

    4: `// 5. 이벤트 리스너 해답
useEffect(() => {
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  if (isTracking) {
    window.addEventListener('mousemove', handleMouseMove);
  }

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}, [isTracking]);`,

    5: `// 6. 로컬스토리지 동기화 해답
// 마운트 시 값 읽기
useEffect(() => {
  const savedName = localStorage.getItem('userName') || '';
  setName(savedName);
}, []);

// name 변경 시 저장
useEffect(() => {
  localStorage.setItem('userName', name);
}, [name]);`,

    6: `// 7. API 호출 해답
useEffect(() => {
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
      if (!response.ok) throw new Error('API 호출 실패');
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);`,

    7: `// 8. 윈도우 크기 추적 해답
useEffect(() => {
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);`,

    8: `// 9. 페이지 가시성 추적 해답
useEffect(() => {
  const handleVisibilityChange = () => {
    const visible = !document.hidden;
    setIsVisible(visible);
    
    if (visible) {
      setVisitCount(prev => prev + 1);
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, []);`,

    9: `// 10. 복잡한 상태 동기화 해답
useEffect(() => {
  setSyncStatus('동기화 중...');
  
  const timer = setTimeout(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setSyncStatus('동기화됨');
  }, 500);

  return () => clearTimeout(timer);
}, [settings]);`
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>useEffect 학습 퀴즈 🧪</h1>
      <p>각 컴포넌트의 TODO 부분을 완성하여 useEffect를 학습하세요!</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>예제 선택:</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentExample(index);
                setShowSolution(false);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: currentExample === index ? '#007bff' : '#f8f9fa',
                color: currentExample === index ? 'white' : 'black',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {index + 1}. {example.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={() => setShowSolution(!showSolution)}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: showSolution ? '#dc3545' : '#28a745',
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {showSolution ? '해답 숨기기' : '해답 보기'}
          </button>
          
          <button 
            onClick={() => window.open('/learning/test', '_blank')}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#17a2b8',
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            테스트 실행하기
          </button>
        </div>
      </div>

      <div style={{ 
        border: '1px solid #dee2e6', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: '#f8f9fa',
        marginBottom: '20px'
      }}>
        <CurrentExample />
      </div>

      {showSolution && (
        <div style={{ 
          border: '1px solid #28a745', 
          borderRadius: '8px', 
          padding: '20px',
          backgroundColor: '#f8fff9'
        }}>
          <h3>💡 해답:</h3>
          <pre style={{ 
            backgroundColor: '#e9ecef',
            padding: '15px',
            borderRadius: '5px',
            overflow: 'auto',
            fontSize: '14px'
          }}>
            {solutions[currentExample]}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <h3>학습 가이드:</h3>
        <ul>
          <li>🎯 <strong>목표</strong>: 각 컴포넌트의 TODO 주석을 useEffect로 구현</li>
          <li>📝 <strong>방법</strong>: 코드를 직접 수정하며 동작 확인</li>
          <li>🧪 <strong>테스트</strong>: '테스트 실행하기' 버튼으로 검증</li>
          <li>💡 <strong>힌트</strong>: 막힐 때만 '해답 보기' 사용</li>
        </ul>
        
        <h4>핵심 학습 포인트:</h4>
        <ul>
          <li>의존성 배열의 이해 ([deps])</li>
          <li>클린업 함수의 중요성 (return 함수)</li>
          <li>무한 루프 방지 방법</li>
          <li>이벤트 리스너 정리 패턴</li>
          <li>API 호출과 비동기 처리</li>
        </ul>
      </div>
    </div>
  );
};

// 테스트를 위해 개별 컴포넌트들도 export
export {
  BasicEffect,
  MountOnlyEffect,
  ConditionalEffect,
  TimerEffect,
  EventListenerEffect,
  LocalStorageEffect,
  ApiCallEffect,
  WindowSizeEffect,
  VisibilityEffect,
  ComplexSyncEffect
};

export default UseEffectQuiz;