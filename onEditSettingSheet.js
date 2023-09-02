function onEditSettingSheetMain() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var settingSheet = ss.getSheetByName('設定値');
  var c2Value = settingSheet.getRange('SETTING_MATCH').getValue();
  
  if (c2Value === 1) {
    settingSheet.getRange('D4').setValue('match1');
    settingSheet.getRange('D5:D26').setBorder(null, null, null, null, null, null, "black", SpreadsheetApp.BorderStyle.SOLID);
    settingSheet.getRange('E4:H26').clear({contentsOnly: true});
    settingSheet.getRange('E5:H26').setBorder(null, null, null, null, null, null, null, SpreadsheetApp.BorderStyle.NONE);
  } else if (c2Value === 2) {
    settingSheet.getRange('D4:E4').setValues([['match1', 'match2']]);
    settingSheet.getRange('D5:E26').setBorder(null, null, null, null, null, null, "black", SpreadsheetApp.BorderStyle.SOLID);
    settingSheet.getRange('F4:H26').clear({contentsOnly: true});
    settingSheet.getRange('F5:H26').setBorder(null, null, null, null, null, null, null, SpreadsheetApp.BorderStyle.NONE);
  } else if (c2Value === 3) {
    settingSheet.getRange('D4:F4').setValues([['match1', 'match2', 'match3']]);
    settingSheet.getRange('D5:F26').setBorder(null, null, null, null, null, null, "black", SpreadsheetApp.BorderStyle.SOLID);
    settingSheet.getRange('G4:H26').clear({contentsOnly: true});
    settingSheet.getRange('G5:H26').setBorder(null, null, null, null, null, null, null, SpreadsheetApp.BorderStyle.NONE);
  } else if (c2Value === 4) {
    settingSheet.getRange('D4:G4').setValues([['match1', 'match2', 'match3', 'match4']]);
    settingSheet.getRange('D5:G26').setBorder(null, null, null, null, null, null, "black", SpreadsheetApp.BorderStyle.SOLID);
    settingSheet.getRange('H4:H26').clear({contentsOnly: true});
    settingSheet.getRange('H5:H26').setBorder(null, null, null, null, null, null, null, SpreadsheetApp.BorderStyle.NONE);
  } else if (c2Value === 5) {
    settingSheet.getRange('D4:H4').setValues([['match1', 'match2', 'match3', 'match4', 'match5']]);
    settingSheet.getRange('D5:H26').setBorder(null, null, null, null, null, null, "black", SpreadsheetApp.BorderStyle.SOLID);
  }
}
