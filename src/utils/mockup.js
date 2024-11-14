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
