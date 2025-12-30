# 🗨️ Chatting Client

> **실시간 1:1 및 그룹 채팅을 지원하는 모던 채팅 서비스 프론트엔드**
>
> 사용자의 감정을 연결하고, 실시간으로 소통할 수 있는 공간을 제공합니다. 프로필 커스터마이징과 친구 관리 기능을 통해 나만의 소셜 환경을 구축할 수 있습니다.

---

## 🚀 프로젝트 개요

- **프로젝트 명**: Chatting Client
- **개발 기간**: 2023. 06 ~ 2024. 01
- **주요 기능**: 실시간 채팅 (1:1, 그룹), 친구 관리, 프로필 커스터마이징 (상태메시지, 배경, 프로필 이미지)
- **담당자**: 김광현 ([@rhkdguskim](https://github.com/rhkdguskim))

---

## ✨ 핵심 기능 (Key Features)

### 💬 실시간 채팅
- **WebSocket (Socket.io)** 기반의 끊김 없는 실시간 메시징
- **1:1 채팅** 및 대규모 **그룹 채팅** 지원
- 채팅 중 **방 정보 확인** 및 사용자 초대 기능

### 👤 사용자 소셜 시스템
- **친구 추가 및 관리**: 실시간 친구 상태 확인
- **프로필 커스터마이징**: 배경화면, 프로필 이미지, 상태메시지 설정
- **OAuth 로그인**: 편리하고 안전한 소셜 로그인 연동

### 📱 최적화된 UI/UX
- **React 기반 CSR**: 빠르고 부드러운 페이지 전환
- **Redux-Saga**: 복잡한 비동기 로직 및 상태 관리 최적화
- **Styled Components & Emotion**: 현대적이고 감각적인 디자인 시스템

---

## 🛠 기술 스택 (Tech Stack)

### Frontend
- **Framework**: `React 18` (TypeScript)
- **State Management**: `Redux Toolkit`, `Redux-Saga`
- **Styling**: `Styled-components`, `Emotion`, `Material UI`
- **Real-time**: `Socket.io-client`
- **Network**: `Axios`

### DevOps & Tools
- **IDE**: `WebStorm`, `VSCode`
- **Package Manager**: `npm`
- **CI/CD**: `CloudType`

---

## 📸 서비스 시연

| 채팅 목록 및 대화 | 프로필 및 친구 관리 |
| :---: | :---: |
| <img src="https://github.com/rhkdguskim/chattingServer/assets/111857144/50e7023d-f671-463b-a172-058eaca0fc52" width="400"> | <img src="https://github.com/rhkdguskim/chattingServer/assets/111857144/52d520df-44df-4d1d-bd9d-ffc2b63fd424" width="400"> |

---

## ⚙️ 시작하기 (Getting Started)

### Prerequisites

- [Node.js](https://nodejs.org/) (Recommended version 16+)
- [npm](https://www.npmjs.com/)

### Installation

```bash
$ npm install
```

### Environment Setup

`.env` 파일을 생성하고 필요한 환경 변수를 설정하세요.
```env
REACT_APP_SERVER_URL=your_server_url
```

### Running the App

```bash
# 개발 모드 실행
$ npm run start

# 프로덕션 빌드
$ npm run build
```

---

## 🧪 테스트 (Testing)

```bash
# Unit tests
$ npm run test
```
