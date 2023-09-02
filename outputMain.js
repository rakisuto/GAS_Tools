// 上位モジュール
function outputMain() {

  if (showMessage()) {
    try {
    // outputMatchResult関数を呼び出す
    outputMatchResultMain();
    
    // onCalcMatchtotal関数を呼び出す
    onCalcMatchTotalMain();
    } catch (error) {
      // エラーハンドリング
      Logger.log("main関数でエラーが発生しました: " + error);
    }
  } else {
    Logger.log("処理を実行しませんでした");
    ;
  }
}
