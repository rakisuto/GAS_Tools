function outputMatchResultMain() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var inputSheet = ss.getSheetByName('入力'); // 入力シートの名前を適切な名前に変更してください
  var targetValue = inputSheet.getRange('INPUT_TARGET_MATCH').getValue();
  var newSheetName = 'match_' + targetValue + '_res';

  Logger.log('targetValue:' + targetValue)

  // 既存の同名シートが存在する場合、それを削除
  var existingSheet = ss.getSheetByName(newSheetName);
  if (existingSheet) {
    ss.deleteSheet(existingSheet);
  }

  // シート名に応じて '_res' を付加して新しい名前を生成
  var copiedSheet = ss.getSheetByName('temp_matchX_res').copyTo(ss);
  copiedSheet.setName(newSheetName);

  // B2:B3セル　及びC7:F26セルの値をコピー
  var sourceRange_B = inputSheet.getRange('INPUT_TARGET_MATCH');
  var sourceRange_TEAM = inputSheet.getRange('INPUT_TEAM_NO');
  var sourceRange_CF = inputSheet.getRange('INPUT_CF');
  var targetRange_B = copiedSheet.getRange('B3');
  var targetRange_TEAM = copiedSheet.getRange('B7:B26');
  var targetRange_CF = copiedSheet.getRange('C7:F26');

  // コピー実行
  sourceRange_B.copyTo(targetRange_B);
  sourceRange_TEAM.copyTo(targetRange_TEAM);
  sourceRange_CF.copyTo(targetRange_CF);

  // コピー先シートのセルの色をクリア
  targetRange_B.setBackground(null);
  targetRange_TEAM.setBackground(null);
  targetRange_CF.setBackground(null);

}
