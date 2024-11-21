export default class LocalStorageUtil {
  #sendCompletePurchase = 'brewnet:purchase:send-completed'; // purchase code를 배열 형태로 저장

  #getSendCompletePurchase() {
    const foundItems = localStorage.getItem(this.#sendCompletePurchase);
    if (foundItems) return JSON.parse(foundItems);
    return [];
  }

  // 회계부서로 발주내역 전송 완료했을 때
  saveSendCompletePurchase(purchaseCode) {
    let saveValue = [purchaseCode];
    const foundItems = this.#getSendCompletePurchase();

    if (foundItems.length > 0) {
      // 기존에 이미 저장된게 있다면 가져오기
      saveValue = saveValue.concat(foundItems);
    }

    localStorage.setItem(this.#sendCompletePurchase, JSON.stringify(saveValue));
  }

  // 회계부서로 전송된 발주 건인지?
  isSendCompletePurchase(purchaseCode) {
    const foundItems = this.#getSendCompletePurchase();
    return foundItems.includes(purchaseCode);
  }

  clearAll() {
    localStorage.removeItem(this.#sendCompletePurchase);
  }
}
