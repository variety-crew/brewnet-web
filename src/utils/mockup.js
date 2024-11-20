// 임직원
function makeMockEmployee(code, name, id, email, contact, position, role) {
  return { code, name, id, email, contact, position, role };
}
export const mockupEmployees = [
  makeMockEmployee(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
  makeMockEmployee(101, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
  makeMockEmployee(102, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
  makeMockEmployee(103, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
  makeMockEmployee(104, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
  makeMockEmployee(105, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
  makeMockEmployee(106, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
  makeMockEmployee(107, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
  makeMockEmployee(108, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
  makeMockEmployee(109, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
  makeMockEmployee(110, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_GENERAL_ADMIN'),
  makeMockEmployee(111, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_GENERAL_ADMIN'),
  makeMockEmployee(112, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_GENERAL_ADMIN'),
  makeMockEmployee(113, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
  makeMockEmployee(114, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
  makeMockEmployee(115, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
  makeMockEmployee(116, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
  makeMockEmployee(117, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
  makeMockEmployee(118, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
  makeMockEmployee(119, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
  makeMockEmployee(120, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
  makeMockEmployee(121, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
  makeMockEmployee(122, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_RESPONSIBLE_ADMIN'),
];

// 가맹점 계정
function makeMockFranchiseAccount(code, id, email, contact, franchiseName) {
  return { code, id, email, contact, franchiseName };
}
export const mockupFranchiseAccounts = [
  makeMockFranchiseAccount(100, 'BN001', 'gdhong@bn.com', '010-1111-1111', '안양점'),
  makeMockFranchiseAccount(101, 'BN001', 'gdhong@bn.com', '010-1111-1111', '안산점'),
  makeMockFranchiseAccount(102, 'BN001', 'gdhong@bn.com', '010-1111-1111', '안산점'),
  makeMockFranchiseAccount(103, 'BN001', 'gdhong@bn.com', '010-1111-1111', '강북점'),
  makeMockFranchiseAccount(104, 'BN001', 'gdhong@bn.com', '010-1111-1111', '안산점'),
  makeMockFranchiseAccount(105, 'BN001', 'gdhong@bn.com', '010-1111-1111', '안산점'),
  makeMockFranchiseAccount(106, 'BN001', 'gdhong@bn.com', '010-1111-1111', '안산점'),
  makeMockFranchiseAccount(107, 'BN001', 'gdhong@bn.com', '010-1111-1111', '미아점'),
  makeMockFranchiseAccount(108, 'BN001', 'gdhong@bn.com', '010-1111-1111', '안산점'),
  makeMockFranchiseAccount(109, 'BN001', 'gdhong@bn.com', '010-1111-1111', '안산점'),
  makeMockFranchiseAccount(122, 'BN001', 'gdhong@bn.com', '010-1111-1111', '종암점'),
];

// 가맹점
function makeMockFranchise(code, franchiseName, city, address, detailAddress, businessNumber, ceo, contact, createdAt) {
  return { code, franchiseName, city, address, detailAddress, businessNumber, ceo, contact, createdAt };
}

export const mockupFranchises = [
  makeMockFranchise(
    1,
    'CoffeeHouse A',
    '서울',
    '123 Main St',
    '111번지',
    '111-11-11111',
    '노다민',
    '010-1234-5678',
    '2024-01-01 08:00:00',
  ),
  makeMockFranchise(
    2,
    'CoffeeHouse B',
    '부산',
    '456 Maple St',
    '222번지',
    '111-11-22222',
    '양현진',
    '010-2345-6789',
    '2024-01-02 09:00:00',
  ),
  makeMockFranchise(
    3,
    'CoffeeHouse C',
    '인천',
    '789 Oak St',
    '333번지',
    '111-11-33333',
    '용길한',
    '010-3456-7890',
    '2024-01-03 10:00:00',
  ),
  makeMockFranchise(
    4,
    'CoffeeHouse D',
    '대구',
    '101 Pine St',
    '444번지',
    '111-11-44444',
    '장호정',
    '010-4567-8901',
    '2024-01-04 11:00:00',
  ),
  makeMockFranchise(
    5,
    'CoffeeHouse E',
    '전라남도',
    '202 Cedar St',
    '555번지',
    '111-11-55555',
    '정준서',
    '010-5678-9012',
    '2024-01-05 12:00:00',
  ),
];

// 법인인감 사용내역
function makeMockCompanySealHistory(code, name, reason, useDate) {
  return { code, name, reason, useDate };
}
export const mockupCompanySealHistory = [
  makeMockCompanySealHistory(100, '홍길동', '발주서 출력을 위해 사용됨', '2024/10/21'),
  makeMockCompanySealHistory(101, '홍길동', '발주서 출력을 위해 사용됨', '2024/10/21'),
  makeMockCompanySealHistory(102, '홍길동', '발주서 출력을 위해 사용됨', '2024/10/21'),
  makeMockCompanySealHistory(103, '홍길동', '발주서 출력을 위해 사용됨', '2024/10/21'),
  makeMockCompanySealHistory(104, '홍길동', '발주서 출력을 위해 사용됨', '2024/10/21'),
  makeMockCompanySealHistory(105, '홍길동', '발주서 출력을 위해 사용됨', '2024/10/21'),
  makeMockCompanySealHistory(106, '홍길동', '발주서 출력을 위해 사용됨', '2024/10/21'),
  makeMockCompanySealHistory(107, '홍길동', '발주서 출력을 위해 사용됨', '2024/10/21'),
  makeMockCompanySealHistory(108, '홍길동', '발주서 출력을 위해 사용됨', '2024/10/21'),
  makeMockCompanySealHistory(109, '홍길동', '발주서 출력을 위해 사용됨', '2024/10/21'),
  makeMockCompanySealHistory(110, '홍길동', '발주서 출력을 위해 사용됨', '2024/09/11'),
  makeMockCompanySealHistory(111, '홍길동', '발주서 출력을 위해 사용됨', '2024/09/11'),
  makeMockCompanySealHistory(112, '홍길동', '발주서 출력을 위해 사용됨', '2024/09/11'),
  makeMockCompanySealHistory(113, '홍길동', '발주서 출력을 위해 사용됨', '2024/09/09'),
  makeMockCompanySealHistory(114, '홍길동', '발주서 출력을 위해 사용됨', '2024/09/09'),
  makeMockCompanySealHistory(115, '홍길동', '발주서 출력을 위해 사용됨', '2024/09/09'),
  makeMockCompanySealHistory(116, '홍길동', '발주서 출력을 위해 사용됨', '2024/09/09'),
  makeMockCompanySealHistory(117, '홍길동', '발주서 출력을 위해 사용됨', '2024/09/09'),
  makeMockCompanySealHistory(118, '홍길동', '발주서 출력을 위해 사용됨', '2024/09/09'),
  makeMockCompanySealHistory(119, '홍길동', '발주서 출력을 위해 사용됨', '2024/09/09'),
  makeMockCompanySealHistory(120, '홍길동', '발주서 출력을 위해 사용됨', '2024/09/09'),
  makeMockCompanySealHistory(121, '홍길동', '발주서 출력을 위해 사용됨', '2024/09/09'),
  makeMockCompanySealHistory(122, '홍길동', '발주서 출력을 위해 사용됨', '2024/01/11'),
];

// 결재라인
export const mockupApprovalLines = [
  { code: 'purchase', title: '발주 결재라인', positions: ['MANAGER'] },
  { code: 'order', title: '주문 결재라인', positions: ['MANAGER'] },
  { code: 'exchange', title: '교환 결재라인', positions: ['MANAGER'] },
  { code: 'return', title: '반품 결재라인', positions: [] },
];

// 공지사항
function makeMockNotice(code, title, content, createdAt, author, images) {
  return { code, title, content, createdAt, author, images };
}

export const mockupNotices = [
  makeMockNotice(1, '주문 시 공지사항 업데이트', '내용', '2024-11-11 11:11:11', '홍길동', [
    'https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg',
    'https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg',
  ]),
  makeMockNotice(2, '주문 시 공지사항 업데이트', '내용', '2024-11-10 11:11:11', '홍길동', []),
  makeMockNotice(3, '주문 시 공지사항 업데이트', '내용', '2024-11-09 11:11:11', '홍길동', []),
  makeMockNotice(4, '주문 시 공지사항 업데이트', '내용', '2024-11-11 11:11:11', '홍길동', []),
  makeMockNotice(5, '주문 시 공지사항 업데이트', '내용', '2024-11-11 11:11:11', '홍길동', []),
  makeMockNotice(6, '주문 시 공지사항 업데이트', '내용', '2024-11-11 11:11:11', '홍길동', []),
  makeMockNotice(7, '주문 시 공지사항 업데이트', '내용', '2024-11-11 11:11:11', '홍길동', []),
  makeMockNotice(8, '주문 시 공지사항 업데이트', '내용', '2024-11-11 11:11:11', '홍길동', []),
  makeMockNotice(9, '주문 시 공지사항 업데이트', '내용', '2024-11-11 11:11:11', '홍길동', []),
  makeMockNotice(10, '주문 시 공지사항 업데이트', '내용', '2024-11-11 11:11:11', '홍길동', []),
  makeMockNotice(11, '주문 시 공지사항 업데이트', '내용', '2024-11-11 11:11:11', '홍길동', []),
  makeMockNotice(12, '주문 시 공지사항 업데이트', '내용', '2024-11-11 11:11:11', '홍길동', []),
  makeMockNotice(13, '주문 시 공지사항 업데이트', '내용', '2024-11-11 11:11:11', '홍길동', []),
];

// 거래처
function makeMockCorrespondent(code, name, managerName, address, detailAddress, contact, email) {
  return { code, name, managerName, address, detailAddress, contact, email };
}

export const mockupCorrespondent = [
  makeMockCorrespondent(
    99,
    '원두A공장',
    '홍길동',
    '서울 관악구 난곡로 367',
    '상세주소',
    '010-1111-1111',
    'gdhong@company.com',
  ),
  makeMockCorrespondent(
    98,
    '원두B공장',
    '용길한',
    '서울 관악구 난곡로 367',
    '상세주소',
    '010-1111-1111',
    'gdhong@company.com',
  ),
  makeMockCorrespondent(
    97,
    '원두C공장',
    '정준서',
    '서울 관악구 난곡로 367',
    '상세주소',
    '010-1111-1111',
    'gdhong@company.com',
  ),
];
