function showMessage() {
  var ui = SpreadsheetApp.getUi();
  
  var response = ui.alert('確認', 'この処理を実行しますか？', ui.ButtonSet.YES_NO);
  return response == ui.Button.YES;
}