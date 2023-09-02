// カスタムダイアログを表示する関数
function showDialog() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var folderId = sheet.getRangeByName('FolderID').getValue();
  var html = HtmlService.createHtmlOutputFromFile('selectFilePage')
      .setWidth(400)
      .setHeight(300);
  html.append('<script>var folderIdFromServer = "' + folderId + '";</script>');
  SpreadsheetApp.getUi().showModalDialog(html, 'File Selector');
}

// Googleドライブのファイル一覧を取得する関数
function getFiles() {
  // 名前定義された範囲からフォルダIDを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var folderId = sheet.getRangeByName('folderID').getValue();
  
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var fileList = [];
  while (files.hasNext()) {
    var file = files.next();
    fileList.push({id: file.getId(), name: file.getName()});
  }
  return fileList;
}

// 選択されたファイルIDを処理する関数
function processFile(fileId) {
  // ここでGoogle Vision APIにファイルIDを渡して画像解析を行うコードを書く
Logger.log('processFile called with fileId: ' + fileId);
try {
  var results = callVisionAPI(fileId);
  // 解析結果をログに出力
  Logger.log(results);
    } catch (e) {
      Logger.log("エラー" + e.toString());
    }
  Logger.log('processFile finished');
}

