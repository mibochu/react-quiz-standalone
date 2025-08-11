import React, { useState, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { 
  Box, 
  Paper, 
  Button, 
  Typography, 
  Alert, 
  Divider,
  Stack,
  Chip
} from '@mui/material';
import { PlayArrow, Refresh, Code } from '@mui/icons-material';

const CodeEditor = ({ 
  title = "코드 편집기",
  initialCode = "// 여기에 코드를 작성하세요\nconsole.log('Hello World!');",
  language = "javascript",
  height = 400 
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // 에디터 테마 설정
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4'
      }
    });
    
    monaco.editor.setTheme('custom-dark');
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setError('');

    try {
      // 안전한 코드 실행을 위한 기본 환경 설정
      const logs = [];
      const originalLog = console.log;
      const originalError = console.error;
      
      // console.log 캡처
      console.log = (...args) => {
        logs.push(args.join(' '));
      };
      
      console.error = (...args) => {
        logs.push('ERROR: ' + args.join(' '));
      };

      // React Hook 시뮬레이션
      const mockReact = {
        useState: (initial) => {
          const value = initial;
          const setValue = (newValue) => {
            logs.push(`State updated: ${JSON.stringify(newValue)}`);
          };
          return [value, setValue];
        },
        useEffect: (callback, deps) => {
          logs.push(`useEffect called with deps: ${JSON.stringify(deps)}`);
          try {
            const cleanup = callback();
            if (typeof cleanup === 'function') {
              logs.push('Cleanup function returned');
            }
          } catch (err) {
            logs.push(`useEffect error: ${err.message}`);
          }
        },
        useRef: (initial) => ({ current: initial }),
        useCallback: (callback, deps) => {
          logs.push(`useCallback called with deps: ${JSON.stringify(deps)}`);
          return callback;
        },
        useMemo: (factory, deps) => {
          logs.push(`useMemo called with deps: ${JSON.stringify(deps)}`);
          return factory();
        }
      };

      // 코드 실행 환경
      const context = {
        console: { log: console.log, error: console.error },
        React: mockReact,
        useState: mockReact.useState,
        useEffect: mockReact.useEffect,
        useRef: mockReact.useRef,
        useCallback: mockReact.useCallback,
        useMemo: mockReact.useMemo,
        setTimeout,
        setInterval,
        clearTimeout,
        clearInterval,
        JSON,
        Math,
        Date,
        Array,
        Object,
        String,
        Number,
        Boolean
      };

      // 함수로 래핑하여 실행
      const wrappedCode = `
        return (function() {
          ${code}
        })();
      `;

      const func = new Function(...Object.keys(context), wrappedCode);
      const result = func(...Object.values(context));
      
      if (result !== undefined) {
        logs.push(`Return value: ${JSON.stringify(result)}`);
      }

      // console 복원
      console.log = originalLog;
      console.error = originalError;

      setOutput(logs.join('\n') || '코드가 성공적으로 실행되었습니다.');
      
    } catch (err) {
      console.log = console.log;
      console.error = console.error;
      setError(`실행 오류: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setError('');
    if (editorRef.current) {
      editorRef.current.setValue(initialCode);
    }
  };

  return (
    <Box sx={{ width: '100%', height: 'auto' }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Code color="primary" />
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
          <Chip label={language.toUpperCase()} size="small" color="primary" variant="outlined" />
        </Stack>
        
        <Box sx={{ mb: 2, border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
          <Editor
            height={height}
            defaultLanguage={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
              glyphMargin: false,
            }}
          />
        </Box>

        <Stack direction="row" spacing={2} mb={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayArrow />}
            onClick={runCode}
            disabled={isRunning}
            size="small"
          >
            {isRunning ? '실행 중...' : '코드 실행'}
          </Button>
          
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Refresh />}
            onClick={resetCode}
            size="small"
          >
            초기화
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          실행 결과:
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            minHeight: 100,
            backgroundColor: '#f5f5f5',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            whiteSpace: 'pre-wrap',
            overflow: 'auto'
          }}
        >
          {output || '아직 코드가 실행되지 않았습니다.'}
        </Paper>
      </Paper>
    </Box>
  );
};

export default CodeEditor;