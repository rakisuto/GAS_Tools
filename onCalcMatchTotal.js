function onCalcMatchTotalMain() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var matchTotalSheet = ss.getSheetByName('match_total');
  
  // 事前準備①：D7:F26セルを削除
  matchTotalSheet.getRange('MATCH_TOTAL_DF').clearContent();

  // 事前準備②：TEAM_NOを取得してB7:B26に出力
  var settingSheet = ss.getSheetByName('設定値');
  var teamNoValues = settingSheet.getRange('SETTING_TEAM_NO').getValues();
  var matchTotalCTargetRange = matchTotalSheet.getRange('MATCH_TOTAL_TEAMNO');
  matchTotalCTargetRange.setValues(teamNoValues);

  // 事前準備③：TEAM_NAMEを取得してC7:C26に出力
  var teamNameValues = settingSheet.getRange('SETTING_TEAM_NAME').getValues();
  var matchTotalCTargetRange = matchTotalSheet.getRange('MATCH_TOTAL_TEAMNAME');
  matchTotalCTargetRange.setValues(teamNameValues);

  // match_1_res ~ match_n_resシートの結果を積み上げ
  for (var x = 1; x <= 5; x++) {
    var matchSheetName = 'match_' + x + '_res';
    var matchSheet = ss.getSheetByName(matchSheetName);
    
    if (matchSheet) {
      var matchBValues = matchSheet.getRange('B7:B26').getValues(); // チームNoを取得
      var matchTotalBValues = matchTotalSheet.getRange('B7:B26').getValues(); // match_total シートのチームNoを取得

      for (var i = 0; i < matchBValues.length; i++) {
        if (matchBValues[i][0] === "") {
          break; // 空白の場合はループを抜ける
      }

        // チームNoに対応するE, F列の値を取得
        var matchEValue = matchSheet.getRange(i + 7, 5).getValue(); // E列
        var matchFValue = matchSheet.getRange(i + 7, 6).getValue(); // F列
        
        // チームNoがmatch_total シートに存在する行を探す
        for (var j = 0; j < matchTotalBValues.length; j++) {
          if (matchTotalBValues[j][0] === matchBValues[i][0]) {
            // 見つかった場合、E, F列に値を転記（積み上げ）

            // 既存の値を取得
            var existingEValue = matchTotalSheet.getRange(j + 7, 5).getValue();
            var existingFValue = matchTotalSheet.getRange(j + 7, 6).getValue();

            // 値を積み上げ
            matchTotalSheet.getRange(j + 7, 5).setValue(existingEValue + matchEValue);
            matchTotalSheet.getRange(j + 7, 6).setValue(existingFValue + matchFValue);
            break; // チームNoが見つかったらこのループを抜ける
          }
        }
      }
    } 

    // C7:C26セルの参照値を取得し、空白でない行の範囲を特定
    var matchTotalCValues = matchTotalSheet.getRange('MATCH_TOTAL_TEAMNAME').getValues();
    var startRow = -1;
    var endRow = -1;
    
    for (var i = 0; i < matchTotalCValues.length; i++) {
      if (matchTotalCValues[i][0] !== "") {
        if (startRow === -1) {
          startRow = i + 7;
        }
        endRow = i + 7;
      }
    }
    
    if (startRow !== -1 && endRow !== -1) {
      var sortRange = 'B' + startRow + ':G' + endRow;
      matchTotalSheet.getRange(sortRange).sort([{ column: 7, ascending: false }]);
    }

    // 総合順位を計算してD列に出力
    var matchTotalGValues = matchTotalSheet.getRange('MATCH_TOTAL_TOTALP').getValues();
    var rankCounter = 1;
    for (var i = 0; i < matchTotalGValues.length; i++) {
      if (matchTotalGValues[i][0] !== "") {
        matchTotalSheet.getRange('D' + (i + 7)).setValue(rankCounter);
        rankCounter++;
      }
    }
  }
}