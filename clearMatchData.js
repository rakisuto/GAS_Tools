function clearMatchDataMain() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // match_X_res シートをすべて削除
  for (var x = 1; x <= 5; x++) {
    var sheetName = 'match_' + x + '_res';
    var sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      ss.deleteSheet(sheet);
    }
  }
  
  // match_total シートの MATCH_TOTAL 名前範囲のデータをすべて削除
  var matchTotalSheet = ss.getSheetByName('match_total');
  var matchTotalRange = matchTotalSheet.getRange('MATCH_TOTAL');
  matchTotalRange.clearContent();
}
