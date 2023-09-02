// 上位モジュール
function inputMain() {

  if (showMessage()) {
    try {
    // onEditKillpoint関数を呼び出す
    onEditKillPointMain();
    
    // onEditRankpoint関数を呼び出す
    onEditRankPointMain();
    } catch (error) {
      // エラーハンドリング
      Logger.log("main関数でエラーが発生しました: " + error);
    }
  } else {
    Logger.log("処理を実行しませんでした");
    ;
  }
}
