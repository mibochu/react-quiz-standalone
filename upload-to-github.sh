#!/bin/bash

echo "🚀 GitHub에 React 퀴즈 프로젝트 업로드 중..."

# 현재 상태 확인
echo "📊 현재 상태:"
git status

echo ""
echo "📤 GitHub에 업로드 시작..."

# GitHub에 푸시
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ GitHub 업로드 완료!"
    echo ""
    echo "🌐 저장소 주소: https://github.com/mibochu/react-quiz-standalone"
    echo ""
    echo "📱 GitHub Pages 설정 방법:"
    echo "1. GitHub 저장소 → Settings → Pages"
    echo "2. Source: 'GitHub Actions' 선택"  
    echo "3. 몇 분 후 자동 배포 완료!"
    echo ""
    echo "🎯 최종 퀴즈 사이트: https://mibochu.github.io/react-quiz-standalone/"
    echo ""
    echo "📱 이제 스마트폰에서도 접속하여 퀴즈를 풀 수 있습니다!"
else
    echo "❌ 업로드 실패. GitHub에서 저장소를 먼저 생성해주세요:"
    echo "   https://github.com/new"
    echo "   Repository name: react-quiz-standalone"
    echo "   Public 선택 후 생성"
fi