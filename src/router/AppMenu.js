export default class AppMenu {
  #hqTopBarMenus = [
    this.#makeMenu('대시보드', 'hq:home'),
    this.#makeMenu('발주', 'hq:purchase'),
    this.#makeMenu('주문/교환/반품', 'hq:order'),
    this.#makeMenu('가맹점/거래처', 'hq:partner'),
    this.#makeMenu('창고/품목', 'hq:stock'),
    this.#makeMenu('전자결재', 'hq:approval'),
    this.#makeMenu('게시판', 'hq:board'),
    this.#makeMenu('시스템설정', 'hq:settings'),
  ];
  #fcTopBarMenus = [this.#makeMenu('주문/교환/반품', 'fc:home'), this.#makeMenu('기타사항', 'fc:other')];

  #makeMenu(label, routerName) {
    return { label, routerName };
  }

  // TopBar 메뉴 가져오기
  getHqTopBarMenus() {
    return this.#hqTopBarMenus;
  }
  getFcTopBarMenu() {
    return this.#fcTopBarMenus;
  }

  // Side 메뉴 가져오기
  getSideMenus(currentRouteName = '') {
    // 본사
    if (currentRouteName.includes('hq:purchase')) {
      return [
        {
          label: '발주',
          items: [
            this.#makeMenu('발주 내역 조회', 'hq:purchase:list'),
            this.#makeMenu('발주 입력', 'hq:purchase:form'),
            this.#makeMenu('입고 확인', 'hq:purchase:stock-arrival'),
          ],
        },
      ];
    }

    if (currentRouteName.includes('hq:settings')) {
      return [
        {
          label: '사원 관리',
          items: [
            this.#makeMenu('사원 조회', 'hq:settings:employee:list'),
            this.#makeMenu('사원 등록', 'hq:settings:employee:form'),
          ],
        },
      ];
    }

    // 가맹점
    if (currentRouteName.includes('fc:home')) {
      return [
        {
          label: '주문관리',
          items: [
            this.#makeMenu('주문 내역 조회', 'fc:home:order:list'),
            this.#makeMenu('주문하기', 'fc:home:order:form'),
          ],
        },
        {
          label: '교환관리',
          items: [
            this.#makeMenu('교환 내역 조회', 'fc:home:exchange:list'),
            this.#makeMenu('교환신청', 'fc:home:exchange:form'),
          ],
        },
        {
          label: '반품관리',
          items: [
            this.#makeMenu('반품 내역 조회', 'fc:home:return:list'),
            this.#makeMenu('반품신청', 'fc:home:return:form'),
          ],
        },
      ];
    }
  }
}
