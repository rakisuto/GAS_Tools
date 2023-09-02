function onEditRankPointMain() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet(); // 現在のシートを取得

  var inputSheetName = '入力';
  var settingSheetName = '設定値';

  // 入力シートのRPオプションを取得
  var rpOptionCell = sheet.getRange('INPUT_RP_OPTION');
  var rpOptionValue = rpOptionCell.getValue();

  // カスタムの場合の処理
  if (rpOptionValue === 'カスタム') {
    // 設定値シートを取得
    var settingSheet = ss.getSheetByName(settingSheetName);

    // matchNとRP設定の値を取得
    var targetMatchCell = sheet.getRange('INPUT_TARGET_MATCH');
    var targetMatchValue = targetMatchCell.getValue();

    var rpSettingRange = settingSheet.getRange('SETTING_CUSTOM_RP_M' + targetMatchValue);
    var rpSettingValues = rpSettingRange.getValues();

    // 【メイン処理】
    var inputSheet = ss.getSheetByName(inputSheetName);
    var rankRange = inputSheet.getRange('INPUT_RANK');
    var rpOutputRange = inputSheet.getRange('INPUT_RP');
    var rankValues = rankRange.getValues();

    var rpOutputValues = [];
    for (var i = 0; i < rankValues.length; i++) {
      var rank = rankValues[i][0];
      var index = rank - 1; // 順位から1を減算してインデックスを取得

      if (index >= 0 && index < rpSettingValues.length) {
      var rpValue = rpSettingValues[index][0];
      rpOutputValues.push([rpValue]);
    } else {
      rpOutputValues.push([""]); // インデックスが範囲外の場合は空白セルを追加
    }
  }

rpOutputRange.setValues(rpOutputValues);

  // 共通の場合の処理
  } else if(rpOptionValue === '共通') {
    // 設定値シートを取得
    var settingSheet = ss.getSheetByName(settingSheetName);

    var rpSettingRange = settingSheet.getRange('SETTING_COMMON_RP');
    var rpSettingValues = rpSettingRange.getValues();

    // 【メイン処理】
    var inputSheet = ss.getSheetByName(inputSheetName);
    var rankRange = inputSheet.getRange('INPUT_RANK');
    var rpOutputRange = inputSheet.getRange('INPUT_RP');
    var rankValues = rankRange.getValues();

    var rpOutputValues = [];
    for (var i = 0; i < rankValues.length; i++) {
      var rank = rankValues[i][0];
      var index = rank - 1; // 順位から1を減算してインデックスを取得

      if (index >= 0 && index < rpSettingValues.length) {
      var rpValue = rpSettingValues[index][0];
      rpOutputValues.push([rpValue]);
    } else {
      rpOutputValues.push([""]); // インデックスが範囲外の場合は空白セルを追加
    }
  }

    rpOutputRange.setValues(rpOutputValues);
  
  } else {
    return;
  }
}
