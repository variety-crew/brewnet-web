export default class AppMenu {
  #orderOutMenus = [
    {
      label: '발주 내역 조회',
      routerName: 'hq:order-out:list',
    },
    {
      label: '발주 입력',
      routerName: 'hq:order-out:form',
    },
    {
      label: '입고 확인',
      routerName: 'hq:order-out:stock-arrival',
    },
  ];

  #allMenus = [...this.#orderOutMenus];

  // 화면 Title 가져오기
  getPageTitle(routerName) {
    const matchRouter = this.#allMenus.find(e => e.routerName === routerName);
    return matchRouter?.label || '';
  }

  // 발주: side menu 목록
  getOrderOutSideMenus() {
    return [
      {
        label: '발주',
        items: this.#orderOutMenus,
      },
    ];
  }
}
