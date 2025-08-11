import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  Container,
  Box,
  Tab,
  Tabs,
  Paper,
  Chip
} from '@mui/material';
import ReactOperatorsExample from './components/ReactOperatorsExample';
import OperatorPractice from './components/OperatorPractice';
import UseEffectQuiz from './components/UseEffectQuiz';
import UseEffectTestRunner from './components/UseEffectTestRunner';
import UseEffectCodeEditor from './components/UseEffectCodeEditor';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' }
  },
  typography: {
    h4: { fontWeight: 600 },
    h6: { fontWeight: 600 }
  }
});

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`quiz-tabpanel-${index}`}
      aria-labelledby={`quiz-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  
  const quizzes = [
    { 
      title: '연산자 예제', 
      description: 'JavaScript/React 연산자 기본 개념',
      component: ReactOperatorsExample,
      icon: '⚡'
    },
    { 
      title: '연산자 퀴즈', 
      description: '10문제 인터랙티브 퀴즈',
      component: OperatorPractice,
      icon: '🎯'
    },
    { 
      title: 'useEffect 퀴즈', 
      description: 'useEffect Hook 학습',
      component: UseEffectQuiz,
      icon: '🔄'
    },
    { 
      title: 'useEffect 테스트', 
      description: '다양한 useEffect 패턴 실습',
      component: UseEffectTestRunner,
      icon: '🧪'
    },
    { 
      title: 'useEffect 편집기', 
      description: '코드를 직접 수정하고 실행해보세요!',
      component: UseEffectCodeEditor,
      icon: '💻'
    }
  ];
  
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* 헤더 */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            🎯 React 학습 퀴즈
          </Typography>
          <Chip 
            label="무료 학습" 
            color="secondary" 
            size="small" 
            sx={{ color: 'white' }}
          />
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        {/* 소개 */}
        <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Typography variant="h4" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
            📚 React 연산자 & Hook 마스터하기
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', textAlign: 'center', opacity: 0.9 }}>
            인터랙티브 퀴즈로 React 핵심 개념을 학습하세요. 언제 어디서나 접속 가능합니다! 📱💻
          </Typography>
        </Paper>
        
        {/* 탭 메뉴 */}
        <Paper sx={{ mb: 3 }}>
          <Tabs 
            value={currentTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {quizzes.map((quiz, index) => (
              <Tab
                key={index}
                label={
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {quiz.icon} {quiz.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {quiz.description}
                    </Typography>
                  </Box>
                }
                sx={{ 
                  minHeight: 80,
                  alignItems: 'flex-start',
                  textTransform: 'none',
                  px: 3
                }}
              />
            ))}
          </Tabs>
        </Paper>
        
        {/* 퀴즈 콘텐츠 */}
        {quizzes.map((quiz, index) => (
          <TabPanel key={index} value={currentTab} index={index}>
            <quiz.component />
          </TabPanel>
        ))}
        
        {/* 푸터 */}
        <Paper sx={{ p: 2, mt: 4, textAlign: 'center', backgroundColor: '#f8f9fa' }}>
          <Typography variant="body2" color="text.secondary">
            💡 React 학습 퀴즈 · 언제든 다시 방문하여 복습하세요!
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;