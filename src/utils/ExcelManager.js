import XLSX from 'xlsx';

export default class ExcelManager {
  #rows = [];
  #orderedFields = [];
  #sheetName = null;
  #headerNames = null;
  #cellWidths = null;

  constructor(rows, orderedFields) {
    if (!rows) throw new Error('rows is not provided');
    if (!orderedFields) throw new Error('orderedFields is not provided');

    this.#rows = rows;
    this.#orderedFields = orderedFields;
  }

  setSheetName(sheetName) {
    this.#sheetName = sheetName;
  }

  setHeaderNames(headerNames) {
    this.#headerNames = headerNames;
  }

  /**
   *
   * @param {*} widths // { field: (fieldName), width: number }
   */
  setCellWidths(widths) {
    this.#cellWidths = widths;
  }

  export(fileName = '') {
    const worksheet = XLSX.utils.json_to_sheet(this.#rows, { header: this.#orderedFields }); // 컬럼 순서 설정
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, this.#sheetName || undefined);

    // 헤더명 변경
    if (this.#headerNames) {
      XLSX.utils.sheet_add_aoa(worksheet, [this.#headerNames], { origin: 'A1' });
    }

    // cell width 설정
    if (this.#cellWidths) {
      worksheet['!cols'] = this.#orderedFields.map(e => {
        const foundCellWidthInfo = this.#cellWidths.find(e => e.field === e);
        if (foundCellWidthInfo) {
          return { wch: foundCellWidthInfo.width };
        }

        return { wch: 10 }; // 설정안된 나머지 cell width는 10
      });
    }

    XLSX.writeFile(workbook, `${fileName || 'download'}.xlsx`, { compression: true }); // export
  }
}
