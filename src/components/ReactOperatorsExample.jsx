import { useState } from 'react';

// React에서 자주 사용하는 연산자 예제 컴포넌트
const ReactOperatorsExample = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', price: 1000, inStock: true },
    { id: 2, name: 'Banana', price: 500, inStock: false },
    { id: 3, name: 'Cherry', price: 2000, inStock: true }
  ]);
  const [showDetails, setShowDetails] = useState(false);

  // 가상의 사용자 로그인
  const handleLogin = () => {
    setUser({ 
      name: '김철수', 
      age: 25, 
      isPremium: true,
      profile: { avatar: 'avatar.jpg' }
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React 연산자 예제</h1>

      {/* 1. 삼항 연산자 */}
      <section>
        <h2>1. 삼항 연산자 (?:)</h2>
        <p>상태: {user ? '로그인됨' : '로그아웃됨'}</p>
        <button onClick={user ? handleLogout : handleLogin}>
          {user ? '로그아웃' : '로그인'}
        </button>
      </section>

      {/* 2. 논리 AND 연산자 */}
      <section>
        <h2>2. 논리 AND 연산자 (&&)</h2>
        {user && (
          <div style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
            <p>환영합니다, {user.name}님!</p>
            <p>나이: {user.age}세</p>
          </div>
        )}
      </section>

      {/* 3. 논리 OR 연산자 */}
      <section>
        <h2>3. 논리 OR 연산자 (||)</h2>
        <p>사용자명: {user?.name || '게스트'}</p>
      </section>

      {/* 4. Nullish Coalescing */}
      <section>
        <h2>4. Nullish Coalescing (??)</h2>
        <p>프리미엄 상태: {(user?.isPremium ?? false) ? 'YES' : 'NO'}</p>
      </section>

      {/* 5. Optional Chaining */}
      <section>
        <h2>5. Optional Chaining (?.)</h2>
        <p>아바타: {user?.profile?.avatar ?? '기본 아바타'}</p>
      </section>

      {/* 6. 스프레드 연산자 */}
      <section>
        <h2>6. 스프레드 연산자 (...)</h2>
        <button onClick={() => setItems([...items, { 
          id: items.length + 1, 
          name: 'New Item', 
          price: 1500, 
          inStock: true 
        }])}>
          아이템 추가
        </button>
      </section>

      {/* 7. 구조 분해 할당 */}
      <section>
        <h2>7. 구조 분해 할당</h2>
        {items.map(({ id, name, price, inStock }) => (
          <div key={id} style={{ 
            margin: '5px 0', 
            padding: '10px',
            backgroundColor: inStock ? '#e8f5e8' : '#f5e8e8'
          }}>
            {name} - {price}원 ({inStock ? '재고있음' : '품절'})
          </div>
        ))}
      </section>

      {/* 8. 템플릿 리터럴 */}
      <section>
        <h2>8. 템플릿 리터럴</h2>
        {user && (
          <p>{`안녕하세요, ${user.name}님! 당신은 ${user.age}세이고 ${user.isPremium ? '프리미엄' : '일반'} 회원입니다.`}</p>
        )}
      </section>

      {/* 9. 배열 메서드 체이닝 */}
      <section>
        <h2>9. 배열 메서드 체이닝</h2>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? '숨기기' : '재고 있는 상품만 보기'}
        </button>
        {showDetails && (
          <div>
            <h3>재고 있는 상품들:</h3>
            {items
              .filter(item => item.inStock)  // filter
              .map(item => ({ ...item, discountPrice: item.price * 0.9 }))  // map
              .map(item => (  // 또 다른 map으로 렌더링
                <div key={item.id} style={{ margin: '5px 0' }}>
                  {item.name} - 원가: {item.price}원, 할인가: {Math.round(item.discountPrice)}원
                </div>
              ))
            }
            <p>
              총 재고 상품 가격: {
                items
                  .filter(item => item.inStock)
                  .reduce((sum, item) => sum + item.price, 0)  // reduce
              }원
            </p>
          </div>
        )}
      </section>

      {/* 10. 조건부 스타일링 */}
      <section>
        <h2>10. 조건부 스타일링</h2>
        <div style={{
          padding: '10px',
          backgroundColor: user?.isPremium ? 'gold' : 'lightgray',
          color: user?.isPremium ? 'black' : 'gray',
          border: `2px solid ${user?.isPremium ? 'orange' : 'gray'}`
        }}>
          {user?.isPremium ? '⭐ 프리미엄 회원 전용 혜택' : '일반 회원'}
        </div>
      </section>

      {/* 11. 동적 클래스명 */}
      <section>
        <h2>11. 동적 클래스명</h2>
        <style>{`
          .status-active { color: green; font-weight: bold; }
          .status-inactive { color: red; }
          .premium { background-color: #fff3cd; }
        `}</style>
        <div className={`
          ${user ? 'status-active' : 'status-inactive'} 
          ${user?.isPremium ? 'premium' : ''}
        `.trim()}>
          현재 상태 표시
        </div>
      </section>

      {/* 12. 복합 조건문 */}
      <section>
        <h2>12. 복합 조건문</h2>
        <div>
          {user?.age >= 18 && user?.isPremium ? (
            <p>🎉 성인 프리미엄 회원 특별 혜택!</p>
          ) : user?.age >= 18 ? (
            <p>👤 성인 회원</p>
          ) : user ? (
            <p>👶 미성년 회원</p>
          ) : (
            <p>❓ 비회원</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReactOperatorsExample;

/* 
사용법:
1. 이 컴포넌트를 App.js나 다른 컴포넌트에서 import
2. <ReactOperatorsExample />로 렌더링
3. 각 연산자들이 실제로 어떻게 작동하는지 확인

주요 학습 포인트:
- 삼항 연산자: 조건부 렌더링의 기본
- &&: 조건부 렌더링 (falsy 값 주의)
- ||: 기본값 설정
- ??: null/undefined만 체크하는 기본값
- ?.: 안전한 객체 접근
- ...: 배열/객체 복사 및 병합
- 구조분해: 편리한 변수 추출
- 배열 메서드: 데이터 변환 및 필터링
- 템플릿 리터럴: 문자열 보간
- 조건부 스타일링: 동적 UI
*/