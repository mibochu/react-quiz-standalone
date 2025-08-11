import { useState, useEffect } from 'react';

// 테스트 점수 계산 및 결과 표시 컴포넌트
const UseEffectTestRunner = () => {
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState('');

  // 10개 테스트 케이스 정의
  const testCases = [
    {
      id: 1,
      name: 'BasicEffect - 문서 제목 변경',
      description: 'useEffect가 의존성 배열에 따라 실행되는지 확인',
      points: 10,
      category: '기본 사용법'
    },
    {
      id: 2,
      name: 'MountOnlyEffect - 마운트 시 한 번만',
      description: '빈 의존성 배열로 마운트 시에만 실행되는지 확인',
      points: 10,
      category: '의존성 배열'
    },
    {
      id: 3,
      name: 'ConditionalEffect - 조건부 실행',
      description: '조건에 따른 useEffect 실행과 이벤트 리스너 관리',
      points: 10,
      category: '조건부 실행'
    },
    {
      id: 4,
      name: 'TimerEffect - 타이머 관리',
      description: 'setInterval과 clearInterval을 이용한 타이머 관리',
      points: 15,
      category: '클린업 함수'
    },
    {
      id: 5,
      name: 'EventListenerEffect - 이벤트 리스너',
      description: '이벤트 리스너 등록과 정리',
      points: 10,
      category: '클린업 함수'
    },
    {
      id: 6,
      name: 'LocalStorageEffect - 로컬스토리지',
      description: '로컬스토리지와 상태 동기화',
      points: 10,
      category: '외부 API 연동'
    },
    {
      id: 7,
      name: 'ApiCallEffect - API 호출',
      description: '비동기 API 호출과 에러 처리',
      points: 15,
      category: '비동기 처리'
    },
    {
      id: 8,
      name: 'WindowSizeEffect - 윈도우 크기',
      description: '윈도우 리사이즈 이벤트 처리',
      points: 10,
      category: '브라우저 API'
    },
    {
      id: 9,
      name: 'VisibilityEffect - 페이지 가시성',
      description: 'Page Visibility API와 useEffect 연동',
      points: 10,
      category: '브라우저 API'
    },
    {
      id: 10,
      name: 'ComplexSyncEffect - 복잡한 상태 동기화',
      description: '복잡한 객체 상태의 동기화 처리',
      points: 10,
      category: '고급 패턴'
    }
  ];

  // 모의 테스트 실행 함수
  const runTests = async () => {
    setIsRunning(true);
    setTestResults(null);
    
    const results = {
      passed: 0,
      failed: 0,
      total: testCases.length,
      score: 0,
      maxScore: testCases.reduce((sum, test) => sum + test.points, 0),
      details: []
    };

    // 각 테스트 케이스 시뮬레이션
    for (const testCase of testCases) {
      setCurrentTest(`실행 중: ${testCase.name}`);
      
      // 테스트 실행 지연 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

      // 랜덤하게 성공/실패 결정 (실제로는 vitest 결과를 사용)
      const passed = Math.random() > 0.2; // 80% 성공률
      const executionTime = Math.random() * 100 + 50;

      if (passed) {
        results.passed++;
        results.score += testCase.points;
      } else {
        results.failed++;
      }

      results.details.push({
        ...testCase,
        passed,
        executionTime: Math.round(executionTime),
        error: passed ? null : `테스트 실패: ${testCase.name}에서 예상한 동작이 실행되지 않았습니다.`
      });
    }

    setCurrentTest('테스트 완료');
    setTestResults(results);
    setIsRunning(false);
  };

  // 실제 vitest 테스트 결과 로드
  const runActualTests = async () => {
    setIsRunning(true);
    setCurrentTest('Vitest 테스트 실행 중...');

    try {
      // 테스트 실행 후 결과 파일 읽기
      const response = await fetch('/test-results.json');
      if (response.ok) {
        const testData = await response.json();
        
        const results = {
          passed: testData.numPassedTests,
          failed: testData.numFailedTests,
          total: testData.numTotalTests,
          score: 0,
          maxScore: testCases.reduce((sum, test) => sum + test.points, 0),
          details: []
        };

        // 각 테스트 케이스의 결과 매핑
        testCases.forEach((testCase, index) => {
          const testResult = testData.testResults[0]?.assertionResults[index];
          const passed = testResult?.status === 'passed';
          
          if (passed) {
            results.score += testCase.points;
          }

          results.details.push({
            ...testCase,
            passed,
            executionTime: Math.round(testResult?.duration || 0),
            error: passed ? null : testResult?.failureMessages?.[0]?.split('\n')[0] || '테스트 실패'
          });
        });

        setTestResults(results);
        setCurrentTest('테스트 완료');
      } else {
        setCurrentTest('test-results.json 파일을 찾을 수 없습니다. 터미널에서 npm run test를 실행해주세요.');
      }
    } catch (error) {
      console.error('테스트 결과 로드 오류:', error);
      setCurrentTest('테스트 결과를 불러올 수 없습니다. 터미널에서 npm run test를 실행해주세요.');
    } finally {
      setIsRunning(false);
    }
  };

  const getGrade = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { grade: 'A', color: '#28a745' };
    if (percentage >= 80) return { grade: 'B', color: '#17a2b8' };
    if (percentage >= 70) return { grade: 'C', color: '#ffc107' };
    if (percentage >= 60) return { grade: 'D', color: '#fd7e14' };
    return { grade: 'F', color: '#dc3545' };
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>useEffect 테스트 채점 시스템</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>테스트 개요</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div style={{ padding: '15px', border: '1px solid #dee2e6', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
            <h4>총 테스트 수</h4>
            <p style={{ fontSize: '24px', margin: '0', color: '#007bff' }}>{testCases.length}개</p>
          </div>
          <div style={{ padding: '15px', border: '1px solid #dee2e6', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
            <h4>총 배점</h4>
            <p style={{ fontSize: '24px', margin: '0', color: '#007bff' }}>
              {testCases.reduce((sum, test) => sum + test.points, 0)}점
            </p>
          </div>
          <div style={{ padding: '15px', border: '1px solid #dee2e6', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
            <h4>테스트 범위</h4>
            <p style={{ margin: '0' }}>useEffect 패턴 10가지</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={runTests}
            disabled={isRunning}
            style={{
              padding: '12px 24px',
              backgroundColor: isRunning ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            {isRunning ? '테스트 실행 중...' : '모의 테스트 실행'}
          </button>
          
          <button
            onClick={runActualTests}
            disabled={isRunning}
            style={{
              padding: '12px 24px',
              backgroundColor: isRunning ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              fontSize: '16px'
            }}
          >
            실제 채점 결과 보기
          </button>
        </div>

        {isRunning && (
          <div style={{ 
            padding: '15px', 
            backgroundColor: '#e3f2fd', 
            border: '1px solid #2196f3',
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '20px', 
                height: '20px', 
                border: '3px solid #f3f3f3',
                borderTop: '3px solid #2196f3',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ margin: '0' }}>{currentTest}</p>
            </div>
          </div>
        )}
      </div>

      {testResults && (
        <div style={{ marginBottom: '30px' }}>
          <h2>테스트 결과</h2>
          
          {/* 전체 점수 표시 */}
          <div style={{ 
            padding: '20px', 
            backgroundColor: getGrade(testResults.score, testResults.maxScore).color + '20',
            border: `2px solid ${getGrade(testResults.score, testResults.maxScore).color}`,
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 10px 0' }}>최종 점수</h3>
                <p style={{ fontSize: '32px', margin: '0', fontWeight: 'bold' }}>
                  {testResults.score} / {testResults.maxScore}
                </p>
                <p style={{ margin: '5px 0 0 0' }}>
                  ({Math.round((testResults.score / testResults.maxScore) * 100)}%)
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold',
                  color: getGrade(testResults.score, testResults.maxScore).color
                }}>
                  {getGrade(testResults.score, testResults.maxScore).grade}
                </div>
                <p style={{ margin: '0' }}>학점</p>
              </div>
            </div>
          </div>

          {/* 통계 */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ padding: '15px', backgroundColor: '#d4edda', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 5px 0', color: '#155724' }}>통과</h4>
              <p style={{ fontSize: '24px', margin: '0', color: '#155724' }}>{testResults.passed}</p>
            </div>
            <div style={{ padding: '15px', backgroundColor: '#f8d7da', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 5px 0', color: '#721c24' }}>실패</h4>
              <p style={{ fontSize: '24px', margin: '0', color: '#721c24' }}>{testResults.failed}</p>
            </div>
            <div style={{ padding: '15px', backgroundColor: '#e2e3e5', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>총 테스트</h4>
              <p style={{ fontSize: '24px', margin: '0' }}>{testResults.total}</p>
            </div>
            <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px', textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 5px 0' }}>성공률</h4>
              <p style={{ fontSize: '24px', margin: '0' }}>
                {Math.round((testResults.passed / testResults.total) * 100)}%
              </p>
            </div>
          </div>

          {/* 상세 결과 */}
          <div>
            <h3>상세 결과</h3>
            {testResults.details.map((test) => (
              <div
                key={test.id}
                style={{
                  margin: '10px 0',
                  padding: '15px',
                  border: `1px solid ${test.passed ? '#28a745' : '#dc3545'}`,
                  borderRadius: '8px',
                  backgroundColor: test.passed ? '#f8fff9' : '#fff5f5'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                      <span style={{ 
                        color: test.passed ? '#28a745' : '#dc3545',
                        fontSize: '18px'
                      }}>
                        {test.passed ? '✅' : '❌'}
                      </span>
                      <h4 style={{ margin: '0' }}>{test.name}</h4>
                      <span style={{ 
                        padding: '2px 8px',
                        backgroundColor: '#e9ecef',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {test.category}
                      </span>
                    </div>
                    <p style={{ margin: '5px 0', color: '#666' }}>{test.description}</p>
                    {test.error && (
                      <p style={{ margin: '5px 0', color: '#dc3545', fontSize: '14px' }}>
                        {test.error}
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: test.passed ? '#28a745' : '#dc3545' }}>
                      {test.passed ? test.points : 0} / {test.points}점
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {test.executionTime}ms
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 테스트 케이스 목록 */}
      <div>
        <h2>테스트 케이스 목록</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {testCases.map((test, index) => (
            <div
              key={test.id}
              style={{
                padding: '15px',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>
                    {index + 1}. {test.name}
                  </h4>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                    {test.description}
                  </p>
                  <span style={{ 
                    padding: '2px 8px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    {test.category}
                  </span>
                </div>
                <div style={{ fontWeight: 'bold', color: '#007bff' }}>
                  {test.points}점
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default UseEffectTestRunner;