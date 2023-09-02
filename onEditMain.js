// 上位モジュール
function onEditMain() {

  if (showMessage()) {
    try {    
    // onEditSettingSheetMain関数を呼び出す
    onEditSettingSheetMain();
    } catch (error) {
      // エラーハンドリング
      Logger.log("main関数でエラーが発生しました: " + error);
    }
  } else {
    Logger.log("処理を実行しませんでした");
    ;
  }
}
