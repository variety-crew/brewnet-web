export default class AppMenu {
  #hqTopBarMenus = [
    { label: '대시보드', routerName: 'hq:home' },
    {
      label: '발주',
      routerName: 'hq:purchase',
    },
    {
      label: '주문/교환/반품',
      routerName: 'hq:order',
    },
    {
      label: '가맹점/거래처',
      routerName: 'hq:partner',
    },
    {
      label: '창고/품목',
      routerName: 'hq:stock',
    },
    { label: '전자결재', routerName: 'hq:approval' },
    { label: '게시판', routerName: 'hq:board' },
    { label: '시스템설정', routerName: 'hq:settings' },
  ];

  #purchaseMenus = [
    {
      label: '발주 내역 조회',
      routerName: 'hq:purchase:list',
    },
    {
      label: '발주 입력',
      routerName: 'hq:purchase:form',
    },
    {
      label: '입고 확인',
      routerName: 'hq:purchase:stock-arrival',
    },
  ];

  #allMenus = [...this.#purchaseMenus];

  // 화면 Title 가져오기
  getPageTitle(routerName) {
    const matchRouter = this.#allMenus.find(e => e.routerName === routerName);
    return matchRouter?.label || '';
  }

  getHqTopBarMenus() {
    return this.#hqTopBarMenus;
  }

  // 발주: side menu 목록
  getPurchaseSideMenus() {
    return [
      {
        label: '발주',
        items: this.#purchaseMenus,
      },
    ];
  }
}
