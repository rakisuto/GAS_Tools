// 未使用
function insertTableIntoSlide() {
  var slideId = "1OSUo02akyxGuJk4IgTMAgd87VE22mVxgKVW9ZGBLw-Q"; // スライドのID

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var matchTotalSheet = ss.getSheetByName('match_total');

  var dataRange = matchTotalSheet.getRange('B6:G27'); // データの範囲を適切に調整
  var dataValues = dataRange.getValues();

  var slide = SlidesApp.openById(slideId);
  var slidePage = slide.getSlides()[0]; // スライドの最初のページを取得

  var tableWidth = 23 * 28.35; // 幅23cmをptに変換 (1 cm = 28.35 pt)
  var tableHeight = 13 * 28.35; // 高さ13cmをptに変換 (1 cm = 28.35 pt)
  var xPosition = (14 - 23) / 2 * 28.35; // スライド幅からテーブル幅を引いて中央寄せ (1 cm = 28.35 pt)
  var yPosition = (25 - 13) / 2 * 28.35; // スライド高さからテーブル高さを引いて中央寄せ (1 cm = 28.35 pt)

  // テーブルを挿入
  var table = slidePage.insertTable(dataValues.length, dataValues[0].length, xPosition, yPosition, tableWidth, tableHeight);
  
  // テーブル内の文字スタイルを設定
  var fontSize = 10; // フォントサイズを設定
  for (var i = 0; i < dataValues.length; i++) {
    for (var j = 0; j < dataValues[i].length; j++) {
      var cell = table.getCell(i, j);
      var text = cell.getText();
      var textRange = text.getParagraphs()[0];
      textRange.setFontSize(fontSize);
      textRange.setAlignment(SlidesApp.ParagraphAlignment.CENTER);
    }
  }
}
