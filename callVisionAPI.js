// @ts-nocheck
function callVisionAPI(fileId) {
  const KEY = PropertiesService.getScriptProperties().getProperty('vision_apiKey');
  
  // fileIdからGoogle Drive上のファイルのURLを生成
  var file = DriveApp.getFileById(fileId);
  // ファイルのバイナリデータを取得
  var blob = file.getBlob();
  var base64Data = Utilities.base64Encode(blob.getBytes());

  // Vision APIのエンドポイントとパラメータを設定
  var apiUrl = "https://vision.googleapis.com/v1/images:annotate?key=" + KEY;
  
  Logger.log(apiUrl);

  // リクエストのペイロードを作成
  var payload = {
    "requests": [
      {
        "image": {
          "content": base64Data
        },
        "features": [
          {
            "type": "TEXT_DETECTION"
          }
        ]
      }
    ]
  };
  
  // APIリクエストのオプションを設定
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };
  
  // Vision APIを呼び出し
  var response = UrlFetchApp.fetch(apiUrl, options);
  var result = JSON.parse(response.getContentText());
  
  // フィルタリング部分
  var textAnnotations = result.responses[0].textAnnotations;
  var filteredTexts1 = [];
  var filteredTexts2 = [];
  var filteredTexts3 = [];
  var filteredTexts4 = [];
  
  for(var i = 0; i < textAnnotations.length; i++) {
    var annotation = textAnnotations[i];
    var vertices = annotation.boundingPoly.vertices;
    
    var x1 = vertices[0].x, y1 = vertices[0].y;
    var x2 = vertices[2].x, y2 = vertices[2].y;

    // このテキストが数字であるかをチェック
    var isNumber = /^\d+$/.test(annotation.description);
    
    // 第一領域(#1~#9キルポイント)
    if(x1 >= 1035 && y1 >= 265 && x2 <= 1080 && y2 <= 980) {
      filteredTexts1.push(annotation.description);
    }
    
    // 第二領域(#10以降のキルポイント)
    if(x1 >= 1810 && y1 >= 180 && x2 <= 1860 && y2 <= 980) {
      filteredTexts2.push(annotation.description);
    }

    // 第三領域(#1~#9チーム名)
    if(isNumber && x1 >= 400 && y1 >= 260 && x2 <= 560 && y2 <= 980) {
      filteredTexts3.push(annotation.description);
    }
    
    // 第四領域(#10以降のチーム名)
    if(isNumber && x1 >= 1180 && y1 >= 175 && x2 <= 1360 && y2 <= 980) {
      filteredTexts4.push(annotation.description);
    }
  }
  
  // フィルタリングされたテキストをログに出力
  Logger.log("#1 ~ #9キルポイント: " + filteredTexts1.join(", "));
  Logger.log("#10 ~ キルポイント:" + filteredTexts2.join(", "));
  Logger.log("#1 ~ #9チーム名: " + filteredTexts3.join(", "));
  Logger.log("#10 ~ チーム名:" + filteredTexts4.join(", "));
  
  // callVisionAPI内部からwriteToSpreadsheetを呼び出す
  writeToSpreadsheet(filteredTexts1, filteredTexts2, filteredTexts3, filteredTexts4);

}

// スプレッドシートに転記
function writeToSpreadsheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var outputSheet = ss.getSheetByName('入力'); // 入力シートの名前を適切な名前に変更してください
  
  // この関数に対するすべての引数を取得
  var filteredTextsArray = arguments;
  // 名前定義範囲を取得
  var rangeNames = ["INPUT_KP_1_9", "INPUT_KP_10_20", "INPUT_TEAMNO_1_9", "INPUT_TEAMNO_10_20"]
  
  for (var i = 0; i < filteredTextsArray.length; i++) {
    var filteredTexts = filteredTextsArray[i];
    var rangeName = rangeNames[i];

    // 名前定義範囲を取得
    var range = ss.getRangeByName(rangeName);
    var numRows = range.getNumRows(); // 範囲の行数を取得
  
    // データが範囲より少ない場合、空のセルで埋める
    while (filteredTexts.length < numRows) {
      filteredTexts.push("");
    }

    // 1次元配列を2次元配列に変換
    var outputArray = filteredTexts.slice(0, numRows).map(function(item) {
      return [item];
    });
  
  // 名前定義範囲に値を設定
  range.setValues(outputArray);
  
  }
}
