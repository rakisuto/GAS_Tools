function onEditKillPointMain() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet(); // 現在のシートを取得

  // 入力シートの名前を適切な名前に変更してください
  var inputSheetName = '入力';
  // 設定値シートの名前を適切な名前に変更してください
  var settingSheetName = '設定値';

  // 入力シートのKPオプションと対象マッチ数値を取得
  var kpOptionCell = sheet.getRange('INPUT_KP_OPTION');
  var targetMatchCell = sheet.getRange('INPUT_TARGET_MATCH');
  var kpOptionValue = kpOptionCell.getValue();
  var targetMatchValue = targetMatchCell.getValue();

  // カスタムの場合の処理
  if (kpOptionValue === 'カスタム') {
    // 設定値シートを取得
    var settingSheet = ss.getSheetByName(settingSheetName);

    // matchNとKP設定の値を取得
    var kpSettingCell = settingSheet.getRange('SETTING_CUSTOM_KP_SETTING_M' + targetMatchValue);
    var kpLimitCell = settingSheet.getRange('SETTING_CUSTOM_KP_LIMIT_M' + targetMatchValue);

    var kpSettingValue = kpSettingCell.getValue();
    var kpLimitValue = kpLimitCell.getValue();

    // KP設定の値、KP上限の値を使って必要な処理を行う
    // 【メイン処理】
    var inputSheet = ss.getSheetByName(inputSheetName);
    var kpRange = inputSheet.getRange('INPUT_KP');
    var kpValues = kpRange.getValues();

    for (var i = 0; i < kpValues.length; i++) {
      // KP記載なし　或いは0の場合はスキップする
      if (kpValues[i][0] != "" || kpValues[i][0] != 0) {
        var newValue = kpValues[i][0] * kpSettingValue;

        // KP上限記載ない場合はスキップする
        if (kpLimitValue != "") {
          if (newValue > kpLimitValue) {
            kpValues[i][0] = kpLimitValue;
          } else {
           kpValues[i][0] = newValue;
          }
        }
      }
    }
    // 入力シートへKP反映
    kpRange.setValues(kpValues);

  } else if (kpOptionValue === '共通') {
    // 設定値シートを取得
    var settingSheet = ss.getSheetByName(settingSheetName);

    // matchNとKP設定の値を取得
    var kpSettingCell = settingSheet.getRange('SETTING_COMMON_KP_SETTING');
    var kpLimitCell = settingSheet.getRange('SETTING_COMMON_KP_LIMIT');

    var kpSettingValue = kpSettingCell.getValue();
    var kpLimitValue = kpLimitCell.getValue();

    // KP設定の値、KP上限の値を使って必要な処理を行う
    // 【メイン処理】
    var inputSheet = ss.getSheetByName(inputSheetName);
    var kpRange = inputSheet.getRange('INPUT_KP');
    var kpValues = kpRange.getValues();

    for (var i = 0; i < kpValues.length; i++) {
      // KP記載なし　或いは0の場合はスキップする
      if (kpValues[i][0] != "" || kpValues[i][0] != 0) {
        var newValue = kpValues[i][0] * kpSettingValue;

        // KP上限記載ない場合はスキップする
        if (kpLimitValue != "") {
          if (newValue > kpLimitValue) {
            kpValues[i][0] = kpLimitValue;
          } else {
            kpValues[i][0] = newValue;
          }
        }
      }
    }
    // 入力シートへKP反映
    kpRange.setValues(kpValues);
  }
}