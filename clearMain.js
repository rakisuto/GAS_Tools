// 上位モジュール
function clearMain() {

  if (showMessage()) {
    try {
    // outputMatchResult関数を呼び出す
    clearMatchDataMain();
    } catch (error) {
      // エラーハンドリング
      Logger.log("main関数でエラーが発生しました: " + error);
    }
  } else {
    Logger.log("処理を実行しませんでした");
    ;
  }
}